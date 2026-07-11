"""Compose bonuskarte /karten/ mockup: paste a new pass artwork into the front
iPhone screen of the AppScreens template render, then trim/tint/export webp.

Usage: python3 compose_karte.py <pass.png> <out.webp>
"""
import sys, os
from PIL import Image, ImageChops, ImageDraw

TEMPLATE = "/Users/danielgruederich/Downloads/AppScreens-bonuskarte-digital-1783343269061.render/apple/German (de-DE)/iPhones  6.9/01.png"
# measured in template (original 1320x2868 coords)
OLD_PASS = (439, 1352, 1182, 2381)   # x0, y0, x1, y1 incl. 8px margin for antialiased edges
PASS_X, PASS_Y, PASS_W = 447, 1360, 727
CORNER_RADIUS = 32                    # wallet pass corner radius at this scale

src, dst = sys.argv[1], sys.argv[2]

tpl = Image.open(TEMPLATE).convert("RGB")
# 1) black out the old pass
draw = ImageDraw.Draw(tpl)
draw.rectangle([OLD_PASS[0], OLD_PASS[1], OLD_PASS[2], OLD_PASS[3]], fill=(0, 0, 0))

# 2) crop artwork to card content (BoomerangMe exports have grey margin + shadow),
#    scale to template width, rounded-corner mask, paste
card = Image.open(src).convert("RGBA")
import numpy as np
arr = np.array(card.convert("RGB"))
dark = arr.max(axis=2) < 200
ys, xs = np.where(dark)
card = card.crop((xs.min(), ys.min(), xs.max() + 1, ys.max() + 1))
h = round(card.height * PASS_W / card.width)
card = card.resize((PASS_W, h), Image.LANCZOS)
mask = Image.new("L", card.size, 0)
ImageDraw.Draw(mask).rounded_rectangle([0, 0, card.width - 1, card.height - 1], radius=CORNER_RADIUS, fill=255)
if card.getchannel("A").getextrema()[0] < 255:
    alpha = ImageChops.multiply(card.getchannel("A"), mask)
else:
    alpha = mask
tpl.paste(card.convert("RGB"), (PASS_X, PASS_Y), alpha)

# 3) trim white margins, tint white -> paper (#F6F1E8), export webp @2x
bg = Image.new("RGB", tpl.size, (255, 255, 255))
bbox = ImageChops.difference(tpl, bg).getbbox()
pad = 8
box = (max(bbox[0]-pad, 0), max(bbox[1]-pad, 0), min(bbox[2]+pad, tpl.width), min(bbox[3]+pad, tpl.height))
out = tpl.crop(box)
paper = Image.new("RGB", out.size, (246, 241, 232))
out = ImageChops.multiply(out, paper)
target_w = 900
out = out.resize((target_w, round(out.height * target_w / out.width)), Image.LANCZOS)
out.save(dst, "WEBP", quality=88)
print("saved:", dst, out.size, os.path.getsize(dst), "bytes")
