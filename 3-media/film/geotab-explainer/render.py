"""Render film.html with Playwright Chromium. `py render.py sheet` -> two 16-frame contact sheets; `py render.py full` -> film-silent.mp4 + events.json."""
import sys, json, base64, io, subprocess, os
from playwright.sync_api import sync_playwright
from PIL import Image
HERE = os.path.dirname(os.path.abspath(__file__)); FPS, SUB = 60, 6
mode = sys.argv[1] if len(sys.argv) > 1 else 'sheet'

with sync_playwright() as p:
    b = p.chromium.launch(args=['--allow-file-access-from-files'])
    pg = b.new_page(viewport={'width': 1920, 'height': 1080})
    pg.goto('file:///' + os.path.join(HERE, 'film.html').replace('\\', '/'))
    pg.wait_for_function('window.READY || window.ERROR', timeout=120000)
    if pg.evaluate('window.ERROR'): sys.exit('page error: ' + pg.evaluate('window.ERROR'))
    END = pg.evaluate('window.END'); print('END', END, 'font ok', pg.evaluate('window.FONT_OK'))
    json.dump(pg.evaluate('window.EV'), open(os.path.join(HERE, 'events.json'), 'w'))
    grab = lambda t, sub: Image.open(io.BytesIO(base64.b64decode(pg.evaluate(f'window.frameData({t},{sub})').split(',')[1]))).convert('RGB')
    if mode == 'sheet':
        for n in range(2):
            S = Image.new('RGB', (4 * 480, 4 * 270))
            for i in range(16):
                t = (n * 16 + i + .5) * END / 32
                im = grab(t, 1).resize((480, 270)); S.paste(im, ((i % 4) * 480, (i // 4) * 270))
            S.save(os.path.join(HERE, f'contact-{n + 1}.png'))
        print('sheets written')
    else:
        out = os.path.join(HERE, 'film-silent.mp4'); N = int(END * FPS)
        ff = subprocess.Popen(['ffmpeg', '-y', '-v', 'error', '-f', 'image2pipe', '-framerate', str(FPS), '-c:v', 'png', '-i', '-',
                               '-c:v', 'libx264', '-crf', '16', '-preset', 'medium', '-pix_fmt', 'yuv420p', out], stdin=subprocess.PIPE)
        for f in range(N):
            d = pg.evaluate(f'window.frameData({f / FPS},{SUB})').split(',')[1]
            ff.stdin.write(base64.b64decode(d))
            if f % 600 == 0: print('frame', f, '/', N, flush=True)
        ff.stdin.close(); ff.wait(); print('wrote', out)
    b.close()
