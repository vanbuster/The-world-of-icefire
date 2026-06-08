#!/usr/bin/env python3
"""API Mart image generation helper.

Usage:
  python image_gen.py --prompt "A futuristic AI concept" [--model MODEL] [--size SIZE] --output ./output/img.png
"""

import os, sys, json, time
import requests
from pathlib import Path
from dotenv import load_dotenv

load_dotenv(Path(__file__).parent.parent / ".env")

APIMART_KEY = os.getenv("APIMART_KEY")
APIMART_BASE = "https://api.apimart.ai/v1"
DEFAULT_MODEL = os.getenv("IMAGE_MODEL", "gemini-2.5-flash-image-preview")


def generate(prompt, model=None, size="16:9", output_path=None, timeout=180):
    model = model or DEFAULT_MODEL
    headers = {
        "Authorization": f"Bearer {APIMART_KEY}",
        "Content-Type": "application/json",
    }
    payload = {"model": model, "prompt": prompt, "size": size, "n": 1}

    # Submit
    resp = requests.post(f"{APIMART_BASE}/images/generations", headers=headers, json=payload, timeout=30).json()
    if resp.get("code") != 200 or not resp.get("data"):
        _fail(str(resp))

    task_id = resp["data"][0]["task_id"]

    # Poll
    start = time.time()
    while time.time() - start < timeout:
        time.sleep(5)
        poll = requests.get(f"{APIMART_BASE}/tasks/{task_id}", headers=headers, timeout=10).json()
        status = poll.get("data", {}).get("status", "unknown")

        if status == "completed":
            images = poll["data"]["result"]["images"]
            url = images[0]["url"]
            if isinstance(url, list):
                url = url[0]

            if output_path:
                Path(output_path).parent.mkdir(parents=True, exist_ok=True)
                img_data = requests.get(url, timeout=60).content
                with open(output_path, "wb") as f:
                    f.write(img_data)
                return output_path
            return url

        if status == "failed":
            _fail(f"Image generation failed (task {task_id})")

    _fail(f"Timed out after {timeout}s (task {task_id})")


def _fail(msg):
    print(json.dumps({"error": msg}, ensure_ascii=False))
    sys.exit(1)


if __name__ == "__main__":
    import argparse
    p = argparse.ArgumentParser()
    p.add_argument("--prompt", required=True)
    p.add_argument("--model", default=None)
    p.add_argument("--size", default="16:9")
    p.add_argument("--output", required=True)
    p.add_argument("--timeout", type=int, default=180)
    a = p.parse_args()

    result = generate(a.prompt, a.model, a.size, a.output, a.timeout)
    print(json.dumps({"status": "success", "filepath": result}))
