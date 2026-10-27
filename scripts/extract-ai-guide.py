"""Convert the author's local PDF text to structured, private reader data.

Run pdftotext -layout and pdftohtml -xml -hidden -i first. The latter is used
only to identify display headings: its body-font extraction is incomplete.
"""
from pathlib import Path
import json
import re
import sys
import xml.etree.ElementTree as ET

text_path = Path(sys.argv[1] if len(sys.argv) > 1 else "tmp/guide/full-book.txt")
xml_path = Path(sys.argv[2] if len(sys.argv) > 2 else "tmp/guide/book.xml")
pages = text_path.read_text().split("\f")
root = ET.parse(xml_path).getroot()
fonts = {item.get("id"): item.attrib for item in root.iter("fontspec")}
normalize = lambda value: re.sub(r"[^a-z0-9]", "", value.lower())

chapters = [
    (0, "Introduction", 10, 11, "Before we begin"),
    (1, "Introduction to Artificial Intelligence", 13, 38, "Foundations"),
    (2, "Your First AI Project", 39, 55, "Foundations"),
    (3, "Building Blocks of AI", 56, 69, "Foundations"),
    (4, "Machine Learning Fundamentals", 71, 88, "Learning and models"),
    (5, "Neural Network Basics", 89, 111, "Learning and models"),
    (6, "Computer Vision", 113, 134, "AI applications"),
    (7, "Natural Language Processing (NLP)", 135, 154, "AI applications"),
    (8, "Advanced Deep Learning", 156, 179, "Advanced topics"),
    (9, "Reinforcement Learning", 180, 200, "Advanced topics"),
    (10, "AI Development Tools and Frameworks", 202, 222, "Tools and real-world AI"),
    (11, "Ethics, Challenges, and Future Trends", 223, 242, "Tools and real-world AI"),
    (12, "Building AI That Makes a Difference", 244, 250, "Capstone"),
    (13, "Glossary", 251, 267, "Your AI cheat sheet"),
]

def page_headings(number):
    page = root.find(f"page[@number='{number}']")
    if page is None:
        return []
    lines = []
    for item in page.findall("text"):
        font = fonts.get(item.get("font"), {})
        if "BobbyJones" not in font.get("family", "") or float(font.get("size", 0)) < 20 or float(font.get("opacity", 1)) == 0:
            continue
        value = "".join(item.itertext()).strip()
        if value:
            lines.append((float(item.get("top")), float(item.get("left")), float(item.get("height")), value))
    lines.sort()
    groups = []
    for top, left, height, value in lines:
        if groups and top - groups[-1][0] < height * 1.3:
            groups[-1] = (top, groups[-1][1] + " " + value)
        else:
            groups.append((top, value))
    return [value for _, value in groups]

def extract_page(number, chapter_title):
    raw = pages[number - 1].replace("\u00a0", " ").strip()
    lines = raw.splitlines()
    if lines and re.fullmatch(r"\s*(?:\d{1,3}|i{1,3}|iv|v|vi{0,3}|ix|x)\s*", lines[-1], re.I):
        lines.pop()
    raw = "\n".join(lines).strip()
    headings = page_headings(number)
    blocks = []
    for chunk in re.split(r"\n\s*\n", raw):
        lines = chunk.splitlines()
        current = []
        i = 0
        while i < len(lines):
            found = None
            for count in range(min(5, len(lines) - i), 0, -1):
                candidate = " ".join(line.strip() for line in lines[i:i+count])
                if normalize(candidate) in {normalize(value) for value in headings}:
                    found = (candidate, count)
                    break
            if found:
                if current:
                    blocks.append(("body", current)); current = []
                heading, count = found
                if normalize(chapter_title) not in normalize(heading) and not re.match(r"^chapter\s+\d", heading, re.I):
                    blocks.append(("heading", [heading]))
                i += count
            else:
                current.append(lines[i]); i += 1
        if current:
            blocks.append(("body", current))
    output = []
    for kind, lines in blocks:
        text = " ".join(line.strip() for line in lines).strip()
        text = re.sub(r"\s+", " ", text)
        if not text:
            continue
        code_lines = sum(bool(re.match(r"\s*(?:from \w+|import \w+|def |class |# |>>>|pip |[A-Za-z_][\w.]*\s*=|[A-Za-z_][\w.]*\(.*\)|for .+ in .+:|if .+:)", line)) for line in lines)
        if kind == "body" and code_lines >= 2:
            kind = "code"; text = "\n".join(lines).strip()
        elif kind == "body" and len(lines) > 1 and min(len(line) - len(line.lstrip()) for line in lines if line.strip()) >= 8:
            kind = "callout"
        output.append({"kind": kind, "text": text})
    return {"number": number, "blocks": output}

book = {"title": "The Girly Guide to Artificial Intelligence", "author": "Michelle Lawson", "edition": "First edition, 2024", "pageCount": 267, "freeThroughPage": 24, "chapters": []}
for number, title, first, last, part in chapters:
    chapter = {"id": "introduction" if number == 0 else "glossary" if number == 13 else f"chapter-{number}", "number": number, "title": title, "part": part, "pages": [extract_page(page, title) for page in range(first, last+1)]}
    book["chapters"].append(chapter)
book["wordCount"] = sum(len(block["text"].split()) for chapter in book["chapters"] for page in chapter["pages"] for block in page["blocks"])
destination = Path("_private/girly-guide-ai.full.json")
destination.parent.mkdir(parents=True, exist_ok=True)
destination.write_text(json.dumps(book, ensure_ascii=False, indent=2))
print(json.dumps({"chapters": len(book["chapters"]), "words": book["wordCount"], "private_source": str(destination)}))
