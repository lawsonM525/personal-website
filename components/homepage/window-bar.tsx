"use client"

import { useEffect, useRef, type KeyboardEvent, type PointerEvent } from "react"
import { FileText, Minus, Square, X } from "lucide-react"
import styles from "./home.module.css"

type Move = { x:number; y:number }
export function WindowBar({ title, warm = false, onMinimize, onMaximize, onClose, maximized = false }: { title: string; warm?: boolean; onMinimize?: () => void; onMaximize?: () => void; onClose?: () => void; maximized?: boolean }) {
  const bar=useRef<HTMLDivElement>(null)
  useEffect(()=>{function reset(){const target=bar.current?.closest<HTMLElement>("[data-computer-window]");if(target){target.style.removeProperty("translate");delete target.dataset.windowX;delete target.dataset.windowY}}reset();window.addEventListener("resize",reset);return()=>window.removeEventListener("resize",reset)},[title,maximized])
  const gesture = useRef<{pointer:number;startX:number;startY:number;origin:Move;target:HTMLElement} | null>(null)
  function targetFor(element:HTMLElement) { return element.closest<HTMLElement>("[data-computer-window]") }
  function position(target:HTMLElement):Move { return {x:Number(target.dataset.windowX || 0),y:Number(target.dataset.windowY || 0)} }
  function move(target:HTMLElement, next:Move) {
    const old=position(target), box=target.getBoundingClientRect()
    const top=Number.parseFloat(getComputedStyle(document.documentElement).getPropertyValue("--computer-header-height")) || 52
    const dock=document.querySelector('[aria-label="Desktop controls"]')?.getBoundingClientRect().top ?? innerHeight - 12
    const left=box.left-old.x, y=box.top-old.y
    const x=Math.max(8-left,Math.min(next.x,innerWidth-8-left-box.width))
    // Keep a fitting window above the dock. Tall documents retain a reachable title bar.
    const visibleHeight=Math.min(box.height,dock-top-16)
    const value={x,y:Math.max(top+8-y,Math.min(next.y,dock-8-y-visibleHeight))}
    target.dataset.windowX=String(value.x);target.dataset.windowY=String(value.y)
    target.style.translate=`${value.x}px ${value.y}px`
  }
  function start(event:PointerEvent<HTMLDivElement>) {
    if(event.button!==0 || event.pointerType!=="mouse" || innerWidth<=760 || maximized || (event.target as HTMLElement).closest("button,a,input"))return
    const target=targetFor(event.currentTarget); if(!target)return
    event.preventDefault();event.currentTarget.focus({preventScroll:true});event.currentTarget.setPointerCapture(event.pointerId)
    gesture.current={pointer:event.pointerId,startX:event.clientX,startY:event.clientY,origin:position(target),target}
  }
  function drag(event:PointerEvent<HTMLDivElement>) { const g=gesture.current;if(!g||g.pointer!==event.pointerId)return;move(g.target,{x:g.origin.x+event.clientX-g.startX,y:g.origin.y+event.clientY-g.startY}) }
  function end() {gesture.current=null}
  function keyboard(event:KeyboardEvent<HTMLDivElement>) {
    if(event.target!==event.currentTarget||maximized||innerWidth<=760)return
    const target=targetFor(event.currentTarget);if(!target)return
    if(event.key==="Home"){event.preventDefault();target.style.removeProperty("translate");delete target.dataset.windowX;delete target.dataset.windowY;return}
    const delta:Record<string,Move>={ArrowLeft:{x:-16,y:0},ArrowRight:{x:16,y:0},ArrowUp:{x:0,y:-16},ArrowDown:{x:0,y:16}}
    if(!delta[event.key])return;event.preventDefault();const old=position(target);move(target,{x:old.x+delta[event.key].x,y:old.y+delta[event.key].y})
  }
  function maximize() { const target=gesture.current?.target; if(target){target.style.removeProperty("translate");delete target.dataset.windowX;delete target.dataset.windowY} onMaximize?.() }
  return <div ref={bar} className={`${styles.windowBar} ${warm ? styles.warmBar : ""}`} data-window-drag-handle tabIndex={maximized?-1:0} role="group" aria-label={`${title} title bar`} title="Drag to move · Arrow keys to move · Home to reset" onPointerDown={start} onPointerMove={drag} onPointerUp={end} onPointerCancel={end} onLostPointerCapture={end} onKeyDown={keyboard}>
    <FileText size={14} aria-hidden="true" /><span>{title}</span><span className={styles.barLines} aria-hidden="true" />
    {(onMinimize || onMaximize || onClose) && <span className={styles.windowControls}>
      {onMinimize && <button type="button" onClick={onMinimize} aria-label={`Minimize ${title}`}><Minus size={13} aria-hidden="true" /></button>}
      {onMaximize && <button type="button" onClick={event=>{const target=targetFor(event.currentTarget);if(target){target.style.removeProperty("translate");delete target.dataset.windowX;delete target.dataset.windowY}maximize()}} aria-label={`${maximized ? "Restore" : "Maximize"} ${title}`}><Square size={11} aria-hidden="true" /></button>}
      {onClose && <button type="button" onClick={onClose} aria-label={`Close ${title}`}><X size={13} aria-hidden="true" /></button>}
    </span>}
  </div>
}
