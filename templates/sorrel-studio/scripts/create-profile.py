"""Regenerate the downloadable four-page template brochure (requires reportlab)."""
from pathlib import Path
from reportlab.pdfgen import canvas
from reportlab.lib.colors import HexColor, white
from reportlab.lib.utils import ImageReader
from reportlab.platypus import Paragraph
from reportlab.lib.styles import ParagraphStyle

root = Path(__file__).resolve().parents[1]
out = root / "public/sorrel-company-profile.pdf"
W, H = 595.28, 841.89
ink, muted, pale, blue = map(HexColor, ["#0f1b2d", "#556070", "#dce4ff", "#2747d6"])
c = canvas.Canvas(str(out), pagesize=(W, H))
c.setTitle("Sorrel Studio - Company Profile")
c.setAuthor("Sorrel Studio Template")

def para(text, x, y, width, size=12, color=ink, bold=False):
    p = Paragraph(text, ParagraphStyle("copy", fontName="Helvetica-Bold" if bold else "Helvetica", fontSize=size, leading=size * 1.35, textColor=color))
    _, height = p.wrap(width, H)
    p.drawOn(c, x, y - height)
    return height

def photo(file, x, y, width, height):
    image = ImageReader(str(root / "public/images" / file))
    iw, ih = image.getSize()
    scale = max(width / iw, height / ih)
    c.saveState()
    clip = c.beginPath(); clip.rect(x, y, width, height)
    c.clipPath(clip, stroke=0)
    c.drawImage(image, x + (width - iw * scale) / 2, y + (height - ih * scale) / 2, width=iw * scale, height=ih * scale, mask="auto")
    c.restoreState()

def page(number, label):
    c.setFillColor(HexColor("#f4f5f7")); c.rect(0, 0, W, H, fill=1, stroke=0)
    para("SORREL STUDIO", 40, H - 32, 200, 10, ink, True)
    para(label.upper(), 365, H - 32, 190, 9, muted)
    c.setStrokeColor(HexColor("#d9dce2")); c.line(40, 52, W - 40, 52)
    para("Company profile | 2026", 40, 40, 250, 9, muted)
    para(f"0{number}", W - 60, 40, 20, 9, muted)

page(1, "Interior & hospitality design")
para("Interior design<br/>partner for<br/>hospitality brands.", 40, 744, 515, 38, ink, True)
para("We design places guests remember, teams enjoy working in and owners see a return on.", 40, 576, 460, 14, muted)
photo("d6cfb.webp", 40, 160, 515, 365)
para("Kaia House Hotel - Seminyak, Bali, 2025", 40, 146, 515, 10, muted)
para("Jakarta / Bali / Singapore", 40, 96, 515, 12, blue, True)
c.showPage()

featured = [
    ("Kaia House Hotel", "Full-interior refit of a 64-key boutique hotel.", "Seminyak, Bali | 2025 | +38% RevPAR", "d6cfb.webp"),
    ("Teduh Dining Room", "A 90-cover restaurant built around one long table.", "Kemang, Jakarta | 2025 | 4.9-star guest rating", "c8660.webp"),
    ("Lantai Tiga Offices", "Workplace for a 200-person fintech team.", "SCBD, Jakarta | 2024 | +27% weekly attendance", "f2889.webp"),
    ("Rumah Kebun", "A family residence opened to its garden.", "Ubud, Bali | 2024 | 14 weeks to handover", "b6391.webp"),
]
for number, start in [(2, 0), (3, 2)]:
    page(number, "Selected projects")
    para("Spaces with a story.", 40, 752, 515, 28, ink, True)
    for offset, (title, description, meta, file) in enumerate(featured[start:start + 2]):
        y = 694 - offset * 310
        para(title, 40, y, 515, 19, ink, True)
        para(description, 40, y - 32, 515, 11, muted)
        photo(file, 40, y - 250, 515, 190)
        para(meta, 40, y - 263, 515, 10, blue)
    c.showPage()

page(4, "The studio")
para("One team, from first sketch<br/>to opening night.", 40, 752, 515, 30, ink, True)
para("Founded in Jakarta in 2014, Sorrel is a collective of 28 interior designers, architects and makers across three studios.", 40, 648, 515, 13, muted)
items = [
    ("Interior Architecture", "Space planning, joinery and material palettes."),
    ("Hospitality Concepts", "Hotel, restaurant and bar concepts built around guests."),
    ("Furniture & Objects", "Custom furniture, lighting and locally made objects."),
    ("Styling & Art Direction", "Art, textiles and styling that carry a brand."),
    ("Project Management", "Budget, contractors and site supervision."),
    ("Brand Environments", "Retail and workplace interiors with a point of view."),
]
for i, (title, copy) in enumerate(items):
    x, y = 40 + (i % 2) * 265, 560 - (i // 2) * 116
    c.setFillColor(white); c.rect(x, y - 94, 250, 102, fill=1, stroke=0)
    para(title, x + 14, y - 8, 222, 12, ink, True)
    para(copy, x + 14, y - 35, 222, 11, muted)
c.setFillColor(pale); c.rect(40, 94, 515, 120, fill=1, stroke=0)
para("Let's make a place worth staying in.", 56, 192, 475, 19, ink, True)
para("hello@sorrel.studio<br/>Jakarta / Bali / Singapore", 56, 154, 475, 12, ink)
para("Design exploration and demonstration content. Before images on the website are AI-generated concepts.", 40, 76, 515, 8, muted)
c.save()
print(out)
