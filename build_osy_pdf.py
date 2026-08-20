"""
OSY 315319 - Complete Unit-Wise Notes PDF Generator
College Sahayak | Department of Computer Engineering | Semester 5
Includes: All 5 Units + Solved PYQ Board Questions
"""

import re
import docx
from reportlab.lib.pagesizes import A4
from reportlab.lib import colors
from reportlab.lib.styles import getSampleStyleSheet, ParagraphStyle
from reportlab.platypus import (
    SimpleDocTemplate, Paragraph, Spacer, Table, TableStyle,
    HRFlowable, PageBreak, KeepTogether
)
from reportlab.lib.units import cm, mm
from reportlab.pdfgen import canvas
from reportlab.pdfbase import pdfmetrics
from reportlab.pdfbase.ttfonts import TTFont

# ─────────────────────────────────────────────
# PATHS
# ─────────────────────────────────────────────
INPUT  = r'C:\Users\Yash\OneDrive\Desktop\Internship 2026\osy_temp_copy.docx'
OUTPUT = r'C:\Users\Yash\OneDrive\Desktop\Internship 2026\Final Project\resourses 5th sem\notes\osy\OSY_315319_College_Sahayak_Notes.pdf'

# ─────────────────────────────────────────────
# COLOURS
# ─────────────────────────────────────────────
NAVY        = colors.HexColor('#0F172A')
BLUE        = colors.HexColor('#1E40AF')
BLUE_LIGHT  = colors.HexColor('#3B82F6')
ACCENT      = colors.HexColor('#F59E0B')  # amber
TEAL        = colors.HexColor('#0D9488')
RED         = colors.HexColor('#DC2626')
WHITE       = colors.white
GREY_DARK   = colors.HexColor('#1E293B')
GREY_MED    = colors.HexColor('#475569')
GREY_LIGHT  = colors.HexColor('#F1F5F9')
GREY_RULE   = colors.HexColor('#CBD5E1')
GREEN       = colors.HexColor('#16A34A')
PURPLE      = colors.HexColor('#7C3AED')

UNIT_COLORS = [BLUE, TEAL, RED, GREEN, PURPLE]

# ─────────────────────────────────────────────
# STYLES
# ─────────────────────────────────────────────
SS = getSampleStyleSheet()

def sty(name, parent='Normal', **kw):
    return ParagraphStyle(name, parent=SS[parent], **kw)

cover_title = sty('CoverTitle', fontSize=22, fontName='Helvetica-Bold',
                  textColor=WHITE, alignment=1, spaceAfter=6, leading=28)
cover_sub   = sty('CoverSub',   fontSize=11, fontName='Helvetica',
                  textColor=colors.HexColor('#94A3B8'), alignment=1, spaceAfter=4)
cover_info  = sty('CoverInfo',  fontSize=10, fontName='Helvetica',
                  textColor=WHITE, alignment=1, spaceAfter=3)

unit_title  = sty('UnitTitle',  fontSize=14, fontName='Helvetica-Bold',
                  textColor=WHITE, alignment=0, spaceAfter=0, leading=20,
                  leftIndent=8)

h1          = sty('H1',    fontSize=12, fontName='Helvetica-Bold',
                  textColor=BLUE, spaceBefore=12, spaceAfter=4)
h2          = sty('H2',    fontSize=11, fontName='Helvetica-Bold',
                  textColor=GREY_DARK, spaceBefore=8, spaceAfter=3)
h3          = sty('H3',    fontSize=10, fontName='Helvetica-Bold',
                  textColor=GREY_DARK, spaceBefore=5, spaceAfter=2)

body        = sty('Body',  fontSize=9.5, fontName='Helvetica',
                  textColor=GREY_DARK, leading=14, spaceBefore=2, spaceAfter=3,
                  firstLineIndent=0)
bullet      = sty('Bullet', fontSize=9.5, fontName='Helvetica',
                  textColor=GREY_DARK, leading=13, spaceBefore=1, spaceAfter=1,
                  leftIndent=14, firstLineIndent=-10)

subhead     = sty('SubHead', fontSize=10, fontName='Helvetica-Bold',
                  textColor=TEAL, spaceBefore=7, spaceAfter=2)

pyq_h       = sty('PYQ_H',  fontSize=11, fontName='Helvetica-Bold',
                  textColor=ACCENT, spaceBefore=10, spaceAfter=4)
pyq_q       = sty('PYQ_Q',  fontSize=9.5, fontName='Helvetica-Bold',
                  textColor=GREY_DARK, spaceBefore=4, spaceAfter=2,
                  leftIndent=0)
pyq_marks   = sty('PYQ_M',  fontSize=8.5, fontName='Helvetica',
                  textColor=RED, spaceBefore=0, spaceAfter=2)

note_style  = sty('Note', fontSize=8.5, fontName='Helvetica-Oblique',
                  textColor=GREY_MED, leading=12, spaceBefore=2, spaceAfter=2,
                  leftIndent=10)

# ─────────────────────────────────────────────
# WATERMARK CANVAS
# ─────────────────────────────────────────────
class CSCanvas(canvas.Canvas):
    """Custom canvas: header, footer, page number, diagonal watermark."""
    def __init__(self, *args, **kwargs):
        super().__init__(*args, **kwargs)
        self._saved = []

    def showPage(self):
        self._saved.append(dict(self.__dict__))
        self._startPage()

    def save(self):
        n = len(self._saved)
        for s in self._saved:
            self.__dict__.update(s)
            self._decorate(n)
            canvas.Canvas.showPage(self)
        canvas.Canvas.save(self)

    def _decorate(self, total):
        W, H = A4
        pg = self._pageNumber

        # Skip decoration on cover (page 1)
        if pg == 1:
            return

        self.saveState()

        # ── diagonal watermark ──
        self.setFont('Helvetica-Bold', 38)
        self.setFillColor(colors.HexColor('#E2E8F0'), alpha=0.20)
        self.translate(W/2, H/2)
        self.rotate(42)
        self.drawCentredString(0, 0, 'College Sahayak')
        self.rotate(-42)
        self.translate(-W/2, -H/2)

        # ── header bar ──
        self.setFillColor(NAVY)
        self.rect(0, H - 22*mm, W, 22*mm, stroke=0, fill=1)

        self.setFont('Helvetica-Bold', 7.5)
        self.setFillColor(ACCENT)
        self.drawString(14*mm, H - 10*mm, 'College Sahayak — Official MSBTE Academic Notes')

        self.setFont('Helvetica', 7.5)
        self.setFillColor(colors.HexColor('#94A3B8'))
        self.drawRightString(W - 14*mm, H - 10*mm, 'Operating System | 315319 | CO5I | Semester 5')

        self.setFont('Helvetica', 7)
        self.setFillColor(colors.HexColor('#64748B'))
        self.drawString(14*mm, H - 17*mm, 'Government Polytechnic Awasari (Khurd) | MSBTE K-Scheme | 2025-26')

        # ── footer ──
        self.setFillColor(GREY_LIGHT)
        self.rect(0, 0, W, 14*mm, stroke=0, fill=1)
        self.setStrokeColor(GREY_RULE)
        self.setLineWidth(0.5)
        self.line(14*mm, 14*mm, W - 14*mm, 14*mm)

        self.setFont('Helvetica', 7.5)
        self.setFillColor(GREY_MED)
        self.drawString(14*mm, 5*mm, 'College Sahayak (c) 2026 | Verified MSBTE Study Material | All Rights Reserved')
        self.drawRightString(W - 14*mm, 5*mm, f'Page {pg} of {total}')

        self.restoreState()


# ─────────────────────────────────────────────
# PARSE SOURCE DOCUMENT
# ─────────────────────────────────────────────
print('Loading source document ...')
src = docx.Document(INPUT)
paras = [(p.style.name, any(r.bold for r in p.runs), p.text.strip()) for p in src.paragraphs if p.text.strip()]
print(f'  {len(paras)} non-empty paragraphs found')

# Split into sections by Heading 1 unit markers
def is_unit_heading(style, text):
    return style == 'Heading 1' or (
        'Unit' in text and any(x in text for x in ['Unit - I', 'Unit  I', 'Unit  II', 'Unit  III', 'Unit - IV', 'Unit  V'])
    )

UNIT_TITLES = {
    1: 'UNIT I\nOperating System: Services & Components',
    2: 'UNIT II\nProcess Management',
    3: 'UNIT III\nCPU Scheduling',
    4: 'UNIT IV\nMemory Management',
    5: 'UNIT V\nFile Management & Disk Scheduling',
}

UNIT_CO = {
    1: 'CO1: Explain the services and components of an Operating System.\nTotal Marks: 14',
    2: 'CO2: Describe the different aspects of Process Management in an OS.\nTotal Marks: 14',
    3: 'CO3: Implement various CPU Scheduling algorithms and evaluate effectiveness.\nTotal Marks: 14',
    4: 'CO4: Analyze Memory Management techniques used by an OS.\nTotal Marks: 14',
    5: 'CO5: Apply techniques for effective File Management in an OS.\nTotal Marks: 14',
}

# Split paragraphs by unit
units = {i: [] for i in range(0, 6)}  # 0 = before units (syllabus/PYQ)
current = 0
current_unit_num = 0

for style, bold, text in paras:
    if not text:
        continue
    # Detect unit boundaries (handle broken unicode chars like \ufffd from encoding issues)
    if style == 'Heading 1':
        # Normalize text: replace all non-ASCII to '-' for matching
        txt_u = ''.join(c if ord(c) < 128 else '-' for c in text)
        if 'Unit' in txt_u:
            if ' I ' in txt_u and 'II' not in txt_u and 'III' not in txt_u and 'IV' not in txt_u:
                current = 1
            elif 'IV' in txt_u:
                current = 4
            elif 'III' in txt_u:
                current = 3
            elif ('II' in txt_u or '-II' in txt_u) and 'III' not in txt_u and 'IV' not in txt_u:
                current = 2
            elif ' V' in txt_u or '-V' in txt_u or txt_u.rstrip().endswith('V'):
                current = 5
        continue  # unit header itself, skip
    units[current].append((style, bold, text))

for u, items in units.items():
    print(f'  Unit {u}: {len(items)} items')

# Extract PYQs from section 0 (before unit notes)
pyq_items = []
in_exam = False
for style, bold, text in units[0]:
    txt_clean = text.strip()
    # Detect board exam question markers
    if '315319' in txt_clean and len(txt_clean) < 30:
        in_exam = True
    if in_exam:
        if 'Attempt any' in txt_clean or 'Marks' in txt_clean:
            pyq_items.append(('SECTION', txt_clean))
        elif bold and len(txt_clean) < 200:
            pyq_items.append(('Q', txt_clean))
        elif not bold and len(txt_clean) < 300 and txt_clean:
            pyq_items.append(('BODY', txt_clean))

print(f'  PYQs collected: {len(pyq_items)}')


# ─────────────────────────────────────────────
# CONTENT CLASSIFIER
# ─────────────────────────────────────────────
def classify(style, bold, text):
    """Return (kind, text) where kind is h1/h2/h3/bullet/body/note"""
    t = text.strip()
    if not t:
        return None, None
    # Heading 7 is a subtopic heading in source
    if style in ('Heading 7', 'Heading 4', 'Heading 6'):
        return 'h1', t
    if bold and style == 'Normal':
        if len(t) < 100:
            return 'h2', t
        return 'h3', t
    if bold and style == 'List Paragraph' and len(t) < 80:
        return 'h3', t
    if style == 'List Paragraph':
        return 'bullet', t
    if style in ('Body Text', 'Normal'):
        return 'body', t
    if bold:
        return 'h3', t
    return 'body', t


def build_unit_story(unit_num, items, color):
    """Build flowable story for one unit."""
    story = []

    # Unit Banner
    banner_data = [[Paragraph(UNIT_TITLES[unit_num], unit_title)]]
    bt = Table(banner_data, colWidths=[A4[0] - 3.4*cm])
    bt.setStyle(TableStyle([
        ('BACKGROUND', (0,0), (-1,-1), color),
        ('TOPPADDING',    (0,0), (-1,-1), 10),
        ('BOTTOMPADDING', (0,0), (-1,-1), 10),
        ('LEFTPADDING',   (0,0), (-1,-1), 12),
        ('RIGHTPADDING',  (0,0), (-1,-1), 12),
        ('ROWBACKGROUNDS', (0,0), (-1,-1), [color]),
    ]))
    story.append(bt)
    story.append(Spacer(1, 4*mm))

    # CO & Marks info
    co_data = [[Paragraph(UNIT_CO[unit_num], note_style)]]
    ct = Table(co_data, colWidths=[A4[0] - 3.4*cm])
    ct.setStyle(TableStyle([
        ('BACKGROUND', (0,0), (-1,-1), GREY_LIGHT),
        ('LEFTPADDING', (0,0), (-1,-1), 10),
        ('TOPPADDING', (0,0), (-1,-1), 5),
        ('BOTTOMPADDING', (0,0), (-1,-1), 5),
        ('BOX', (0,0), (-1,-1), 0.5, GREY_RULE),
    ]))
    story.append(ct)
    story.append(Spacer(1, 5*mm))

    # Content
    prev_kind = None
    item_count = 0
    for style, bold, text in items:
        kind, t = classify(style, bold, text)
        if not kind:
            continue
        # Skip repeated exam/paper junk
        if any(skip in t for skip in ['P.T.O.', 'Seat No.', 'MSBTE Approval', 'K Scheme']):
            continue
        # Skip very short noise
        if len(t) < 3:
            continue

        item_count += 1
        # Limit per unit to keep compact (skip duplicated noise after ~500 items)
        if item_count > 550:
            break

        if kind == 'h1':
            # Add rule before new section
            if prev_kind not in (None, 'h1'):
                story.append(Spacer(1, 2*mm))
                story.append(HRFlowable(width='100%', thickness=0.5, color=GREY_RULE, spaceAfter=3))
            p = ParagraphStyle(f'H1_{unit_num}', parent=h1, textColor=color)
            story.append(Paragraph(t, p))
        elif kind == 'h2':
            story.append(Paragraph(t, h2))
        elif kind == 'h3':
            story.append(Paragraph(t, subhead))
        elif kind == 'bullet':
            # Clean bullet: remove leading dashes already present
            clean_t = t.lstrip('-').lstrip('*').strip()
            story.append(Paragraph(f'• {clean_t}', bullet))
        else:
            story.append(Paragraph(t, body))

        prev_kind = kind

    return story


def build_pyq_story(pyq_items):
    story = []

    # Banner
    banner_data = [[Paragraph('BOARD EXAM — SOLVED PYQ EXAMPLES', unit_title)]]
    bt = Table(banner_data, colWidths=[A4[0] - 3.4*cm])
    bt.setStyle(TableStyle([
        ('BACKGROUND', (0,0), (-1,-1), colors.HexColor('#92400E')),
        ('TOPPADDING',    (0,0), (-1,-1), 10),
        ('BOTTOMPADDING', (0,0), (-1,-1), 10),
        ('LEFTPADDING',   (0,0), (-1,-1), 12),
    ]))
    story.append(bt)
    story.append(Spacer(1, 4*mm))
    story.append(Paragraph(
        'The following questions are sourced from MSBTE board examination papers (315319). '
        'Practice these for Summer / Winter examination preparation.',
        note_style
    ))
    story.append(Spacer(1, 4*mm))

    q_num = 0
    for kind, text in pyq_items[:80]:  # Limit to 80 items for compactness
        if kind == 'SECTION':
            story.append(Spacer(1, 3*mm))
            story.append(HRFlowable(width='100%', thickness=1, color=ACCENT, spaceAfter=3))
            story.append(Paragraph(text, pyq_h))
        elif kind == 'Q':
            q_num += 1
            story.append(Paragraph(f'Q{q_num}. {text}', pyq_q))
        else:
            story.append(Paragraph(text, body))

    return story


# ─────────────────────────────────────────────
# BUILD PDF
# ─────────────────────────────────────────────
print('Building PDF ...')

doc = SimpleDocTemplate(
    OUTPUT,
    pagesize=A4,
    leftMargin=1.7*cm,
    rightMargin=1.7*cm,
    topMargin=2.8*cm,     # space for header bar
    bottomMargin=2.0*cm,  # space for footer
    title='OSY 315319 Complete Unit-Wise Notes — College Sahayak',
    author='College Sahayak | Yash Date',
    subject='Operating System | MSBTE K-Scheme Semester 5',
)

story = []

# ──────── COVER PAGE ────────
W, H = A4
cover_data = [
    [Paragraph('COLLEGE SAHAYAK', cover_sub)],
    [Paragraph('Government Polytechnic Awasari (Khurd)', cover_info)],
    [Paragraph('Department of Computer Engineering', cover_info)],
    [Spacer(1, 8*mm)],
    [Paragraph('Operating System', cover_title)],
    [Paragraph('Course Code: 315319', cover_info)],
    [Spacer(1, 4*mm)],
    [Paragraph('Complete Unit-Wise Class Notes', ParagraphStyle('cs2', parent=cover_sub, fontSize=13, textColor=ACCENT))],
    [Spacer(1, 8*mm)],
    [Paragraph('Semester 5 | K-Scheme | CO5I', cover_info)],
    [Paragraph('Academic Year 2025–26', cover_info)],
    [Spacer(1, 10*mm)],
    [Paragraph('Units I  •  II  •  III  •  IV  •  V  +  PYQ Examples', cover_info)],
]
ct = Table(cover_data, colWidths=[W - 3.4*cm])
ct.setStyle(TableStyle([
    ('BACKGROUND', (0,0), (-1,-1), NAVY),
    ('TOPPADDING', (0,0), (-1,-1), 6),
    ('BOTTOMPADDING', (0,0), (-1,-1), 6),
    ('LEFTPADDING', (0,0), (-1,-1), 24),
    ('RIGHTPADDING', (0,0), (-1,-1), 24),
    ('ALIGN', (0,0), (-1,-1), 'CENTER'),
    ('VALIGN', (0,0), (-1,-1), 'MIDDLE'),
]))
story.append(Spacer(1, 2*cm))
story.append(ct)
story.append(Spacer(1, 1*cm))

# Units table of contents
toc_rows = [
    [Paragraph('<b>Unit</b>', sty('th', fontSize=9, fontName='Helvetica-Bold', textColor=WHITE)),
     Paragraph('<b>Topic</b>', sty('th2', fontSize=9, fontName='Helvetica-Bold', textColor=WHITE)),
     Paragraph('<b>Marks</b>', sty('th3', fontSize=9, fontName='Helvetica-Bold', textColor=WHITE))],
    ['I',  'Operating System: Services & Components', '14'],
    ['II', 'Process Management', '14'],
    ['III', 'CPU Scheduling', '14'],
    ['IV', 'Memory Management', '14'],
    ['V',  'File Management & Disk Scheduling', '14'],
]
toc_t = Table(toc_rows, colWidths=[1.5*cm, 11*cm, 2*cm])
toc_t.setStyle(TableStyle([
    ('BACKGROUND', (0,0), (-1,0), BLUE),
    ('TEXTCOLOR', (0,0), (-1,0), WHITE),
    ('FONTNAME', (0,0), (-1,0), 'Helvetica-Bold'),
    ('FONTSIZE', (0,0), (-1,-1), 9),
    ('ROWBACKGROUNDS', (0,1), (-1,-1), [GREY_LIGHT, WHITE]),
    ('GRID', (0,0), (-1,-1), 0.5, GREY_RULE),
    ('TOPPADDING', (0,0), (-1,-1), 5),
    ('BOTTOMPADDING', (0,0), (-1,-1), 5),
    ('LEFTPADDING', (0,0), (-1,-1), 8),
    ('ALIGN', (2,0), (2,-1), 'CENTER'),
]))
story.append(toc_t)
story.append(PageBreak())

# ──────── UNITS ────────
for u in range(1, 6):
    story += build_unit_story(u, units[u], UNIT_COLORS[u-1])
    story.append(PageBreak())

# ──────── PYQ SECTION ────────
if pyq_items:
    story += build_pyq_story(pyq_items)

# ──────── BUILD ────────
doc.build(story, canvasmaker=CSCanvas)
print(f'PDF generated: {OUTPUT}')
