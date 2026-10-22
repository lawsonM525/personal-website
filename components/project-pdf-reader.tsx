"use client"

import { useState } from "react"
import { ChevronLeft, ChevronRight, ZoomIn, ZoomOut } from "lucide-react"

export function ProjectPdfReader() {
  const [page,setPage]=useState(1)
  const [zoom,setZoom]=useState(false)
  return <section className="project-pdf-reader" aria-label="Delta stock pitch PDF preview"><div className="project-reader-toolbar"><div><button type="button" aria-label="Previous PDF page" disabled={page===1} onClick={()=>setPage(value=>value-1)}><ChevronLeft size={17}/></button><span role="status">Page {page} of 19</span><button type="button" aria-label="Next PDF page" disabled={page===19} onClick={()=>setPage(value=>value+1)}><ChevronRight size={17}/></button></div><button type="button" aria-pressed={zoom} onClick={()=>setZoom(value=>!value)}>{zoom?<ZoomOut size={16}/>:<ZoomIn size={16}/>}<span>{zoom?"Fit page":"Enlarge"}</span></button></div><div className={`project-reader-canvas${zoom?" project-reader-zoom":""}`} tabIndex={0} role="region" aria-label={`PDF page ${page}. Use arrow buttons to change pages.`}><img key={page} src={`/projects/delta-stock-pitch/page-${String(page).padStart(2,"0")}.webp`} alt={`Delta Air Lines stock pitch — original presentation, page ${page} of 19. Open PDF above for the text version.`} width="1600" height="1200"/></div></section>
}
