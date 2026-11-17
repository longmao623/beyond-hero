import re
import base64
from pathlib import Path

DIST = Path('dist')
OUT = DIST / 'single-file.html'

html = (DIST / 'index.html').read_text(encoding='utf-8')

def to_base64(path):
    full = DIST / path
    if not full.exists():
        return None
    mime = {
        '.png': 'image/png',
        '.jpg': 'image/jpeg',
        '.jpeg': 'image/jpeg',
        '.svg': 'image/svg+xml',
        '.woff': 'font/woff',
        '.woff2': 'font/woff2',
        '.ttf': 'font/ttf',
    }.get(full.suffix.lower(), 'application/octet-stream')
    data = full.read_bytes()
    return f"data:{mime};base64,{base64.b64encode(data).decode()}"

# Inline CSS
for link in re.findall(r'<link[^>]+href="([^"]+\.css)"[^>]*>', html):
    css = (DIST / link.lstrip('./')).read_text(encoding='utf-8')
    # Inline any url(...) references in CSS
    for url_path in re.findall(r'url\((?!data:)([^)]+)\)', css):
        clean = url_path.strip('"\'').lstrip('./')
        b64 = to_base64(clean)
        if b64:
            css = css.replace(url_path, b64, 1)
    html = html.replace(re.search(rf'<link[^>]+href="{re.escape(link)}"[^>]*>', html).group(0), f'<style>{css}</style>', 1)

# Inline JS
for script in re.findall(r'<script[^>]+src="([^"]+\.js)"[^>]*>', html):
    js = (DIST / script.lstrip('./')).read_text(encoding='utf-8')
    # Inline image references in JS
    for img_path in re.findall(r'\./images/[^\'"`]+', js):
        clean = img_path.lstrip('./')
        b64 = to_base64(clean)
        if b64:
            js = js.replace(img_path, b64)
    html = html.replace(re.search(rf'<script[^>]+src="{re.escape(script)}"[^>]*>', html).group(0), f'<script type="module">{js}</script>', 1)

OUT.write_text(html, encoding='utf-8')
print(f"Single-file build: {OUT} ({OUT.stat().st_size / 1024:.1f} KB)")
