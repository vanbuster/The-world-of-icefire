#!/usr/bin/env python3
"""Convert Markdown to WeChat-compatible HTML with inline styles.

Usage:
  python md2wechat.py --input article.md --output article.html --images '{"cover":"https://...","1":"https://..."}'
"""

import sys, json, re
from pathlib import Path
from markdown_it import MarkdownIt

STYLES = {
    "h1": "font-size:22px;font-weight:bold;text-align:center;margin:30px 0 20px;color:#1a1a1a;",
    "h2": "font-size:18px;font-weight:bold;margin:25px 0 15px;padding-bottom:8px;border-bottom:2px solid #e8e8e8;color:#1a1a1a;",
    "h3": "font-size:16px;font-weight:bold;margin:20px 0 10px;color:#333;",
    "p": "font-size:15px;line-height:1.75;margin:10px 0;color:#333;letter-spacing:0.5px;",
    "img": "max-width:100%;display:block;margin:15px auto;border-radius:4px;",
    "blockquote": "margin:15px 0;padding:10px 15px;border-left:4px solid #ddd;background:#f8f8f8;color:#666;font-size:14px;",
    "pre": "background:#f5f5f5;padding:15px;border-radius:5px;overflow-x:auto;font-size:13px;line-height:1.5;",
    "code": "font-family:Menlo,Monaco,Consolas,monospace;background:#f5f5f5;padding:2px 6px;border-radius:3px;font-size:13px;",
    "strong": "font-weight:bold;color:#1a1a1a;",
    "em": "font-style:italic;color:#555;",
    "a": "color:#576b95;text-decoration:none;",
    "ul": "margin:10px 0;padding-left:20px;list-style:disc;",
    "ol": "margin:10px 0;padding-left:20px;",
    "li": "font-size:15px;line-height:1.75;margin:5px 0;color:#333;",
    "hr": "border:none;border-top:1px solid #e8e8e8;margin:25px 0;",
    "table": "width:100%;border-collapse:collapse;margin:15px 0;font-size:14px;",
    "th": "background:#f5f5f5;padding:8px 12px;border:1px solid #ddd;font-weight:bold;",
    "td": "padding:8px 12px;border:1px solid #ddd;",
}


def _add_styles(html):
    """Inject inline styles into HTML tags for WeChat."""
    for tag, style in STYLES.items():
        html = re.sub(
            rf"<{tag}(\s[^>]*)?>",
            f"<{tag} style=\"{style}\">",
            html,
        )
    # Handle <pre><code> nesting
    html = html.replace(
        '<pre style="..."><code>',
        f'<pre style="{STYLES["pre"]}"><code style="{STYLES["code"]}">',
    )
    # Fix double style attrs from nested replacement
    html = re.sub(r'(style="[^"]*")\s+style="[^"]*"', r'\1', html)
    return html


def _replace_images(html, image_map):
    """Replace image:ID placeholders with actual WeChat URLs."""
    for img_id, url in image_map.items():
        html = html.replace(f'src="image:{img_id}"', f'src="{url}"')
    return html


def convert(md_text, image_map=None):
    """Convert Markdown to WeChat HTML."""
    md = MarkdownIt("commonmark", {"html": True}).enable("table")
    html = md.render(md_text)

    # Remove the first h1 (title is handled separately by WeChat draft API)
    html = re.sub(r"<h1[^>]*>.*?</h1>", "", html, count=1)

    html = _add_styles(html)
    if image_map:
        html = _replace_images(html, image_map)

    return f'<section style="max-width:677px;margin:0 auto;padding:10px 15px;">{html}</section>'


if __name__ == "__main__":
    import argparse
    p = argparse.ArgumentParser()
    p.add_argument("--input", required=True)
    p.add_argument("--output", required=True)
    p.add_argument("--images", default="{}")
    a = p.parse_args()

    with open(a.input, "r") as f:
        md_text = f.read()

    image_map = json.loads(a.images)
    html = convert(md_text, image_map)

    Path(a.output).parent.mkdir(parents=True, exist_ok=True)
    with open(a.output, "w") as f:
        f.write(html)

    print(json.dumps({"status": "success", "output": a.output}))
