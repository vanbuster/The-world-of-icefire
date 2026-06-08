#!/usr/bin/env python3
"""WeChat Official Account API helper.

Commands:
  get-token                  — Get cached access_token
  upload-image --filepath F  — Upload image (permanent material)
  upload-content-img --filepath F  — Upload content image (returns WeChat URL)
  create-draft --title T --content-file F --thumb-media-id ID [--author A] [--digest D]
"""

import os, sys, json, time
import requests
from pathlib import Path
from dotenv import load_dotenv

load_dotenv(Path(__file__).parent.parent / ".env")

APPID = os.getenv("WECHAT_APPID")
SECRET = os.getenv("WECHAT_APPSECRET")
TOKEN_CACHE = Path(__file__).parent.parent / "output" / ".wechat_token.json"


def get_access_token():
    if TOKEN_CACHE.exists():
        with open(TOKEN_CACHE) as f:
            cached = json.load(f)
        if cached.get("expires_at", 0) > time.time() + 300:
            return cached["access_token"]

    url = (
        "https://api.weixin.qq.com/cgi-bin/token"
        f"?grant_type=client_credential&appid={APPID}&secret={SECRET}"
    )
    resp = requests.get(url, timeout=10).json()
    if "access_token" not in resp:
        _fail(resp.get("errmsg", "get_token failed"), resp.get("errcode"))

    token = resp["access_token"]
    expires_at = time.time() + resp.get("expires_in", 7200)

    TOKEN_CACHE.parent.mkdir(parents=True, exist_ok=True)
    with open(TOKEN_CACHE, "w") as f:
        json.dump({"access_token": token, "expires_at": expires_at}, f)
    return token


def upload_permanent_image(filepath):
    """Upload as permanent material → returns media_id (for thumb_media_id)."""
    token = get_access_token()
    url = (
        "https://api.weixin.qq.com/cgi-bin/material/add_material"
        f"?access_token={token}&type=image"
    )
    with open(filepath, "rb") as f:
        resp = requests.post(url, files={"media": (Path(filepath).name, f, "image/png")}, timeout=30).json()
    if "media_id" not in resp:
        _fail(resp.get("errmsg", "upload failed"))
    return {"media_id": resp["media_id"], "url": resp.get("url", "")}


def upload_content_image(filepath):
    """Upload content image → returns WeChat internal URL for <img src>."""
    token = get_access_token()
    url = f"https://api.weixin.qq.com/cgi-bin/media/uploadimg?access_token={token}"
    with open(filepath, "rb") as f:
        resp = requests.post(url, files={"media": (Path(filepath).name, f, "image/png")}, timeout=30).json()
    if "url" not in resp:
        _fail(resp.get("errmsg", "upload failed"))
    return {"url": resp["url"]}


def create_draft(title, content_html, thumb_media_id, author="", digest=""):
    token = get_access_token()
    url = f"https://api.weixin.qq.com/cgi-bin/draft/add?access_token={token}"
    payload = {
        "articles": [{
            "title": title,
            "author": author,
            "digest": digest,
            "content": content_html,
            "thumb_media_id": thumb_media_id,
            "need_open_comment": 0,
            "only_fans_can_comment": 0,
        }]
    }
    resp = requests.post(url, json=payload, timeout=30).json()
    if "media_id" not in resp:
        _fail(resp.get("errmsg", "create_draft failed"))
    return resp["media_id"]


def _fail(msg, code=None):
    result = {"error": msg}
    if code:
        result["errcode"] = code
    print(json.dumps(result, ensure_ascii=False))
    sys.exit(1)


if __name__ == "__main__":
    if len(sys.argv) < 2:
        print("Usage: python wechat.py <command> [options]")
        sys.exit(1)

    cmd = sys.argv[1]
    args = _parse_args(sys.argv[2:])

    if cmd == "get-token":
        print(json.dumps({"access_token": get_access_token()}))

    elif cmd == "upload-image":
        fp = args.get("--filepath")
        if not fp:
            _fail("--filepath required")
        print(json.dumps(upload_permanent_image(fp), ensure_ascii=False))

    elif cmd == "upload-content-img":
        fp = args.get("--filepath")
        if not fp:
            _fail("--filepath required")
        print(json.dumps(upload_content_image(fp), ensure_ascii=False))

    elif cmd == "create-draft":
        title = args.get("--title")
        content_file = args.get("--content-file")
        thumb_id = args.get("--thumb-media-id")
        if not all([title, content_file, thumb_id]):
            _fail("--title, --content-file, --thumb-media-id required")
        with open(content_file, "r") as f:
            html = f.read()
        draft_id = create_draft(
            title, html, thumb_id,
            author=args.get("--author", ""),
            digest=args.get("--digest", ""),
        )
        print(json.dumps({"media_id": draft_id}))

    else:
        _fail(f"Unknown command: {cmd}")


def _parse_args(argv):
    args = {}
    i = 0
    while i < len(argv):
        if argv[i].startswith("--"):
            key = argv[i]
            val = argv[i + 1] if i + 1 < len(argv) else ""
            args[key] = val
            i += 2
        else:
            i += 1
    return args
