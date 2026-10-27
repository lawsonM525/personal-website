"""Restore the author's PDF artwork with its soft masks and source-page placement.

Requires Poppler and Pillow. No source PDF or clean paid body text is published.
Run after pdfimages -png, pdftohtml -xml, and pdftotext -bbox-layout into tmp/guide/art/.
"""
from pathlib import Path
from PIL import Image, ImageOps
import bisect
import collections
import hashlib
import json
import re
import subprocess
import xml.etree.ElementTree as ET

ROOT = Path(__file__).resolve().parent.parent
WORK = ROOT / 'tmp/guide/art'
DEST = ROOT / 'public/books/girly-guide-to-ai/illustrations'
SOURCE = Path('/Users/michelle/Documents/The Girly Guide to Artificial Intelligence - FULL BOOK.pdf')
# These are empty paper/speech-box backgrounds, not standalone illustrations.
# The cover is rendered intact separately. Its underlying art is not repeated.
DECORATION = {0, 7, 10, 14, 18, 20, 54, 155}
DESCRIPTIONS = {
 6:'Mia and her robot friend Mai wave hello.',8:'Mia holds her book.',9:'Mia thinks through an AI question.',
 11:'Mai considers an AI question.',12:'A comic about what it means for a machine to understand.',
 13:'Mai meets a raccoon while learning about machine learning.',15:'A hand-drawn neural network connects input, hidden, and output layers.',
 16:'Mai looks puzzled.',17:'Mia and a colleague study a computer.',19:'Alan Turing invites the reader to read his paper.',
 21:'An old computer illustrates the AI winter.',22:'Mai and Mia play a board game.',23:'A Doge meme about big data.',
 24:'Mia and Mai discuss an AI question.',25:'Mai asks whether it could pass a Turing test.',26:'A collection of robots in a forest.',
 27:'A four-panel conversation illustrates an AI concept.',28:'A Netflix recommendation example with people, machines, and numbers.',
 29:'A second Netflix recommendation example.',30:'A diagram traces a recommendation through connected examples.',
 31:'The digital wardrobe from Clueless.',32:'A close-up of the Clueless digital wardrobe interface.',
 33:'A reader considers whether homework was written with AI.',34:'Mai reacts to an AI question.',35:'A meme reminds AI to stay hydrated.',
 36:'Mai asks who it is.',37:'Mai asks whether it has a soul.',38:'Mai asks whether it has a choice.',
 39:'Two people study an AI diagram together.',40:'A chart compares different AI ethics perspectives.',
 41:'People and robots share ideas for a project.',42:'A light bulb marks a project idea.',43:'A pink play button.',
 44:'A scatter plot illustrates linear regression.',45:'A small neural network shows connected nodes and weights.',
 46:'Mia works through several stages of an AI project.',47:'A diagram compares a real value, a predicted value, and error.',
 48:'A diagram connects a dataset, model, and prediction.',49:'An annotated machine learning equation.',
 50:'Mia explains an AI result with a chart.',51:'Building blocks stacked into a pyramid.',52:'Mia and Mai learn together.',
 53:'A diagram shows the layers of an AI system.',55:'Mai thinks about a definition.',56:'Mai asks a question about machine learning.',
 57:'A funnel diagram explains how a learning system narrows its choices.',58:'Mai reacts to a learning example.',59:'Mai looks curious.',
 60:'Cloud-computing service illustrations.',61:'Cloud service icons for an AI project.',62:'A colorful linked-loop logo.',
 63:'A comic about understanding a technical explanation.',64:'A cartoon about using AI to solve a problem.',65:'A laughing emoji.',
 66:'Two people share an ice cream while discussing learning.',67:'A small example dataset.',68:'A person works at an early computer.',
 69:'A learning-cycle diagram.',70:'Mia and Mai work through a lesson at a blackboard.',71:'Mai explores a grid of data.',
 72:'A regression plot compares observations with a fitted line.',73:'The sigmoid activation function.',
 74:'Mia, Mai, and friends explore a garden.',75:'A machine learning formula.',76:'An annotated equation from the book.',
 77:'Mai visits a person in a hospital bed.',78:'Question marks invite the reader to think.',79:'A formula from the learning example.',
 80:'A two-panel illustration of Mai before and after learning.',81:'A neural network calculation.',82:'A four-panel comic with Mia and Mai.',
 83:'A neural network diagram with input, hidden, and output layers.',84:'Mia and Mai dance with friends.',85:'An annotated neural-network equation.',
 86:'A biological neuron beside an artificial neuron.',87:'A neural-network calculation.',88:'Sigmoid and ReLU activation-function plots.',
 89:'A graph of the tanh activation function.',90:'An annotated neural-network equation.',91:'An annotated neural-network equation.',
 92:'An annotated neural-network equation.',93:'An annotated neural-network equation.',94:'An annotated neural-network equation.',
 95:'An annotated neural-network equation.',96:'A predicted-value symbol.',97:'The cross-entropy loss formula.',98:'A predicted-value symbol.',
 99:'A predicted-value symbol.',100:'The gradient descent weight-update formula.',101:'A three-panel learning comic.',102:'A winking emoji.',
 103:'Mai looks at a landscape and asks how a robot sees it.',104:'A diagram traces image data processing.',
 105:'Mai and Mia discuss computer vision.',106:'The ImageNet image collection.',107:'Mai drives a small car.',
 108:'A convolutional neural network processes an image into a prediction.',109:'Mai asks a question about image processing.',
 110:'Mia and Mai demonstrate visual recognition.',111:'An autonomous-driving visualization detects roads and objects.',
 112:'A comparison of vision transformers and convolutional neural networks.',113:'Mai considers an artificial heart.',
 114:'Mia, Mai, and colleagues meet in a lab.',115:'Mai reads a book beside a stack of books.',116:'Mai reacts to a language example.',
 117:'A map of words in a vector space.',118:'Happy, disgusted, and angry faces illustrate sentiment.',
 119:'A diagram connects words by their relationships.',120:'Mia and Mai discuss a language example.',
 121:'People and robots discuss language around a table.',122:'A comic about predicting the next word.',
 123:'A four-panel comic demonstrates a language interaction.',124:'An example conversation with an AI assistant.',
 125:'Mia and Mai study advanced deep learning.',126:'Mai meets a small dog.',127:'Mai and Mia explore a colorful garden.',
 128:'A chart compares vanishing and exploding gradients.',129:'Mai throws away unhelpful data.',130:'A student holds a research paper.',
 131:'An example AI-assistant conversation.',132:'A comic asks how an AI product will make money.',133:'A comparison table from the book.',
 134:'Mai drives a car while exploring reinforcement learning.',135:'Four versions of Mai illustrate rewards and penalties.',
 136:'Mia smiles at the reader.',137:'Mai considers which road to take.',138:'A robot explores a maze.',139:'Mai stops at a traffic light.',
 140:'The Q-learning update equation.',141:'The expected-return equation.',142:'Three robots experiment under a shared umbrella.',
 143:'The TensorFlow logo.',144:'A comparison of AI development tools.',145:'A machine learning model lifecycle diagram.',
 146:'The Azure Machine Learning logo.',147:'The Google AI Platform logo.',148:'The Amazon SageMaker logo.',149:'The Docker logo.',
 150:'Mai stands with several animals.',151:'People and robots discuss AI ethics in a meeting.',152:'Mia, Mai, and a colleague share ideas.',
 153:'The SHAP logo.',154:'A courtroom scene with people and a robot.',156:'People and robots discuss a case around a table.',
 157:'Mai teaches a lesson at a blackboard.',158:'A comic about how people interpret AI.',159:'A group of people and robots plan a project.',
 160:'Mai explores a colorful landscape.',161:'Mia and Mai share their work in a classroom.',162:'A software development lifecycle diagram.',
 163:'Mia and Mai wave goodbye to the reader.',
}
normalize = lambda text: re.sub(r'[^a-z0-9]', '', text.lower())

source_xml=ET.parse(WORK/'book.xml').getroot()
source_indices={}
for element in source_xml.findall('.//image'):
    digest=hashlib.sha256(Path(element.get('src')).read_bytes()).hexdigest()
    if digest not in source_indices: source_indices[digest]=len(source_indices)
records=[]
for line in subprocess.check_output(['pdfimages','-list',str(SOURCE)],text=True).splitlines()[2:]:
    cells=line.split()
    if cells and cells[0].isdigit(): records.append({'page':int(cells[0]),'number':int(cells[1]),'type':cells[2]})
by_page=collections.defaultdict(list)
for i,record in enumerate(records):
    if record['type']!='image': continue
    record['mask']=records[i+1]['number'] if i+1<len(records) and records[i+1]['type']=='smask' else None
    by_page[record['page']].append(record)

text_root=ET.parse(WORK/'text.html').getroot()
text_pages=text_root.findall('.//{*}page')
book=json.loads((ROOT/'_private/girly-guide-ai.full.json').read_text())
book_pages={page['number']:page for chapter in book['chapters'] for page in chapter['pages']}
DEST.mkdir(parents=True, exist_ok=True)
manifest={};used=set();count=0;matches=0;blocks_total=0
for page in source_xml.findall('page'):
    number=int(page.get('number'))
    if number not in book_pages: continue
    items=[]
    images=page.findall('image')
    assert len(images)==len(by_page[number]), f'Image order mismatch on page {number}'
    for element,record in zip(images,by_page[number]):
        index=source_indices[hashlib.sha256(Path(element.get('src')).read_bytes()).hexdigest()]
        if index in DECORATION: continue
        image=Image.open(WORK/f"image-{record['number']:03d}.png").convert('RGBA')
        if record['mask'] is not None:
            mask=Image.open(WORK/f"image-{record['mask']:03d}.png").convert('L')
            assert image.size==mask.size
            image.putalpha(mask)
        x=float(element.get('left'))/1.5;y=float(element.get('top'))/1.5
        w=float(element.get('width'))/1.5;h=float(element.get('height'))/1.5
        # Canva uses reflected transforms for several poses and diagrams.
        # Poppler preserves their negative extents in its placement XML.
        if w<0: x+=w;w=-w;image=ImageOps.mirror(image)
        if h<0: y+=h;h=-h;image=ImageOps.flip(image)
        if w<=0 or h<=0: continue
        items.append({'x':x,'y':y,'w':w,'h':h,'image':image,'index':index})
    groups=[]
    for item in sorted(items,key=lambda item:(item['y'],item['x'])):
        matched=None
        for group in groups:
            overlap=min(group['bottom'],item['y']+item['h'])-max(group['top'],item['y'])
            if overlap>min(group['bottom']-group['top'],item['h'])*.2:
                matched=group;break
        if matched is None:
            matched={'top':item['y'],'bottom':item['y']+item['h'],'items':[]};groups.append(matched)
        matched['items'].append(item);matched['top']=min(matched['top'],item['y']);matched['bottom']=max(matched['bottom'],item['y']+item['h'])
    words=text_pages[number-1].findall('.//{*}word');joined='';offsets=[];word_tops=[]
    for word in words:
        token=normalize(word.text or '')
        if token: offsets.append(len(joined));word_tops.append(float(word.get('yMin')));joined+=token
    block_tops=[]
    for i,block in enumerate(book_pages[number]['blocks']):
        blocks_total+=1;probe=normalize(block['text']);position=-1
        for length in [72,48,32,20]:
            if len(probe)<length: continue
            position=joined.find(probe[:length])
            if position>=0: break
        if position>=0:
            block_tops.append(word_tops[max(0,bisect.bisect_right(offsets,position)-1)]);matches+=1
        else: block_tops.append((i+1)/(len(book_pages[number]['blocks'])+1)*600)
    for sequence,group in enumerate(groups):
        left=min(item['x'] for item in group['items']);top=group['top']
        right=max(item['x']+item['w'] for item in group['items']);bottom=group['bottom']
        w=right-left;h=bottom-top;scale=3
        canvas=Image.new('RGBA',(max(1,round(w*scale)),max(1,round(h*scale))))
        for item in group['items']:
            resized=item['image'].resize((max(1,round(item['w']*scale)),max(1,round(item['h']*scale))),Image.Resampling.LANCZOS)
            canvas.alpha_composite(resized,(round((item['x']-left)*scale),round((item['y']-top)*scale)))
            used.add(item['index']);count+=1
        digest=hashlib.sha256(canvas.tobytes()).hexdigest()[:16]
        name=f'art-{digest}.webp';destination=DEST/name
        if not destination.exists(): canvas.save(destination,'WEBP',quality=94,method=6)
        before=next((i for i,y in enumerate(block_tops) if y>top+h*.45),len(block_tops))
        descriptions=list(dict.fromkeys(DESCRIPTIONS.get(item['index'],'An original illustration from this section of the book.') for item in group['items']))
        entry={'src':f'/books/girly-guide-to-ai/illustrations/{name}','width':canvas.width,'height':canvas.height,'displayWidth':min(100,round(w/307.2*100,1)),'beforeBlock':before,'alt':' '.join(descriptions),'sourcePage':number}
        manifest.setdefault(str(number),[]).append(entry)
manifest_path=ROOT/'data/books/girly-guide-ai.art.json'
manifest_path.write_text(json.dumps(manifest,ensure_ascii=False,indent=2)+'\n')
used_files={Path(item['src']).name for values in manifest.values() for item in values}
for file in DEST.glob('*.webp'):
    if file.name not in used_files:file.unlink()
print(json.dumps({'sourceImagePlacements':count,'distinctSourceImages':len(used),'figures':sum(map(len,manifest.values())),'pagesWithArt':len(manifest),'webpFiles':len(used_files),'assetBytes':sum(file.stat().st_size for file in DEST.glob('*.webp')),'matchedTextBlocks':matches,'textBlocks':blocks_total},indent=2))
