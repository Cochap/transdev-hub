"""Chroma cutouts: border-connected green key, 2 px soft band with despill, per-piece crops, head split + inpaint."""
import cv2, numpy as np, json, os
ART = os.path.join(os.path.dirname(os.path.abspath(__file__)), 'art'); OUT = os.path.join(os.path.dirname(os.path.abspath(__file__)), 'cut')
os.makedirs(OUT, exist_ok=True)

def key(path):
    im = cv2.imread(path)  # BGR
    b, g, r = [im[..., i].astype(int) for i in range(3)]
    greenish = (g - np.maximum(r, b)) > 40
    med = np.median(im[greenish], axis=0)
    near = np.linalg.norm(im.astype(int) - med, axis=2) < 110
    cand = (greenish & near).astype(np.uint8)
    n, lab = cv2.connectedComponents(cand, connectivity=4)
    border = set(np.unique(np.concatenate([lab[0], lab[-1], lab[:, 0], lab[:, -1]]))) - {0}
    bg = np.isin(lab, list(border))
    # enclosed pockets (e.g. under a chair) that are clearly the backdrop green
    tight = np.linalg.norm(im.astype(int) - med, axis=2) < 45
    st = cv2.connectedComponentsWithStats(cand, connectivity=4)[2]
    for i in range(1, n):
        if i not in border and st[i, 4] > 800 and tight[lab == i].mean() > .9: bg |= lab == i
    fg = (~bg).astype(np.uint8) * 255
    a = cv2.GaussianBlur(fg, (5, 5), 1.0)  # ~2 px soft band
    band = (a > 0) & (a < 255)
    g2 = np.minimum(g, np.maximum(r, b) + 6)  # despill: clamp G to max(R,B)+6 inside the band
    im[..., 1] = np.where(band, g2, im[..., 1]).astype(np.uint8)
    return np.dstack([im, a])

def pieces(rgba, min_area=40000):
    n, lab, st, _ = cv2.connectedComponentsWithStats((rgba[..., 3] > 20).astype(np.uint8), connectivity=8)
    out = []
    for i in range(1, n):
        x, y, w, h, area = st[i]
        if area < min_area: continue
        crop = rgba[y:y+h, x:x+w].copy(); crop[lab[y:y+h, x:x+w] != i, 3] = 0
        out.append(((int(x), int(y), int(w), int(h)), crop))
    return sorted(out, key=lambda p: (p[0][1] // 600, p[0][0]))

def split_head(rgba):
    """Neck = narrowest opaque row in 18-40 % of height. Head keeps a collar; body collar is inpainted from its own colours."""
    al = rgba[..., 3] > 128; h = al.shape[0]
    widths = al.sum(1).astype(float); lo, hi = int(h * .18), int(h * .40)
    w = widths[lo:hi]; w[w == 0] = 1e9
    neck = lo + int(np.argmin(w))
    head = rgba.copy(); head[neck + 6:, :, 3] = 0
    body = rgba.copy()
    m = np.zeros(al.shape, np.uint8); m[:neck - 6] = 255
    m[(rgba[..., 3] == 0)] = 255  # transparent pixels masked too
    bgr = cv2.inpaint(np.ascontiguousarray(body[..., :3]), m, 8, cv2.INPAINT_TELEA)
    body[..., :3] = bgr
    body[:neck - 30, :, 3] = 0  # keep a 24 px inpainted collar under the head
    return head, body, neck

meta = {}
def save(name, img): cv2.imwrite(os.path.join(OUT, name + '.png'), img); meta[name] = {'w': int(img.shape[1]), 'h': int(img.shape[0])}

v = pieces(key(os.path.join(ART, 'c11-viewer.png')))
md = pieces(key(os.path.join(ART, 'c12-mech-disp.png')))
bd = pieces(key(os.path.join(ART, 'c13-bus-driver-box.png')))
print('viewer', [p[0] for p in v]); print('mech/disp', [p[0] for p in md]); print('bus/driver/box', [p[0] for p in bd])

for nm, (_, img) in [('viewer', v[0]), ('mechanic', md[0])]:
    hd, bo, neck = split_head(img); save(nm + '_head', hd); save(nm + '_body', bo)
    al = img[..., 3] > 128; y = neck + int(img.shape[0] * .06); xs = np.where(al[y])[0]
    meta[nm + '_body'].update(neck=int(neck), shoulders=[int(xs.min()), int(xs.max()), int(y)])
save('dispatcher', md[1][1])
save('bus', bd[0][1]); save('driver_back', bd[1][1]); save('gobox', bd[2][1])
json.dump(meta, open(os.path.join(OUT, 'meta.json'), 'w'), indent=1); print(meta)
