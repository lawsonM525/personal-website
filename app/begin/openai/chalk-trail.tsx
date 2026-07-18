"use client";

import { useEffect } from "react";

type Point = {
  x: number;
  y: number;
};

function makeChalkStroke(from: Point, to: Point) {
  const distance = Math.hypot(to.x - from.x, to.y - from.y);
  if (distance < 3) return;

  const angle = Math.atan2(to.y - from.y, to.x - from.x);
  const length = Math.min(distance + 10, 46);
  const perpendicular = angle + Math.PI / 2;

  for (let layer = 0; layer < 3; layer += 1) {
    const mark = document.createElement("span");
    const offset = (layer - 1) * 3 + (Math.random() - 0.5) * 2;
    const jitterX = Math.cos(perpendicular) * offset;
    const jitterY = Math.sin(perpendicular) * offset;
    const thickness = 3 + Math.random() * 3;

    mark.className = "begin-chalk-mark";
    mark.style.left = `${from.x + jitterX}px`;
    mark.style.top = `${from.y + jitterY}px`;
    mark.style.width = `${length * (0.82 + Math.random() * 0.24)}px`;
    mark.style.height = `${thickness}px`;
    mark.style.transform = `translateY(-50%) rotate(${angle + (Math.random() - 0.5) * 0.08}rad)`;
    mark.style.opacity = `${0.56 + Math.random() * 0.22}`;

    document.body.appendChild(mark);
    window.setTimeout(() => mark.remove(), 2600);
  }

  for (let fleck = 0; fleck < 2; fleck += 1) {
    const powder = document.createElement("span");
    const progress = Math.random();
    const spread = (Math.random() - 0.5) * 14;

    powder.className = "begin-chalk-powder";
    powder.style.left = `${from.x + Math.cos(angle) * length * progress + Math.cos(perpendicular) * spread}px`;
    powder.style.top = `${from.y + Math.sin(angle) * length * progress + Math.sin(perpendicular) * spread}px`;
    powder.style.width = `${2 + Math.random() * 3}px`;
    powder.style.height = `${1 + Math.random() * 2}px`;
    powder.style.rotate = `${Math.random() * 180}deg`;
    powder.style.opacity = `${0.32 + Math.random() * 0.28}`;

    document.body.appendChild(powder);
    window.setTimeout(() => powder.remove(), 2200);
  }
}

export function ChalkTrail() {
  useEffect(() => {
    const style = document.createElement("style");
    style.textContent = `
      .begin-chalk-mark {
        position: absolute;
        z-index: 9999;
        pointer-events: none;
        border-radius: 6px;
        background:
          linear-gradient(90deg, rgba(255,255,255,0.30), rgba(255,255,255,0.82) 42%, rgba(255,255,255,0.44) 78%, rgba(255,255,255,0.20)),
          repeating-linear-gradient(0deg, rgba(255,255,255,0.36) 0 1px, rgba(255,255,255,0.08) 1px 3px),
          repeating-linear-gradient(90deg, rgba(255,255,255,0.24) 0 5px, rgba(255,255,255,0.07) 5px 9px);
        box-shadow:
          0 -1px 0 rgba(255,255,255,0.20),
          0 1px 0 rgba(255,255,255,0.18),
          0 0 2px rgba(255,255,255,0.10);
        transform-origin: left center;
        animation: begin-chalk-fade 2600ms ease-out forwards;
      }

      .begin-chalk-powder {
        position: absolute;
        z-index: 9999;
        pointer-events: none;
        border-radius: 999px;
        background: rgba(255,255,255,0.82);
        filter: blur(0.4px);
        animation: begin-chalk-powder-fade 2200ms ease-out forwards;
      }

      @keyframes begin-chalk-fade {
        0% {
          filter: blur(0);
        }
        72% {
          opacity: 0.72;
        }
        100% {
          opacity: 0;
          filter: blur(0.9px);
        }
      }

      @keyframes begin-chalk-powder-fade {
        0% {
          transform: translateY(0);
        }
        100% {
          opacity: 0;
          transform: translateY(3px);
        }
      }

      .begin-chalk-drawing,
      .begin-chalk-drawing * {
        user-select: none !important;
      }
    `;

    let isDrawing = false;
    let lastPoint: Point | null = null;
    let lastMark = 0;

    const handlePointerDown = (event: PointerEvent) => {
      if (window.innerWidth < 640) return;
      event.preventDefault();
      isDrawing = true;
      lastPoint = { x: event.pageX, y: event.pageY };
      document.documentElement.classList.add("begin-chalk-drawing");
    };

    const handlePointerMove = (event: PointerEvent) => {
      if (window.innerWidth < 640) return;
      if (!isDrawing) return;
      event.preventDefault();

      const now = window.performance.now();
      if (now - lastMark < 12) return;

      lastMark = now;
      const nextPoint = { x: event.pageX, y: event.pageY };

      if (lastPoint) {
        makeChalkStroke(lastPoint, nextPoint);
      }

      lastPoint = nextPoint;
    };

    const stopDrawing = () => {
      isDrawing = false;
      lastPoint = null;
      document.documentElement.classList.remove("begin-chalk-drawing");
    };

    document.head.appendChild(style);
    window.addEventListener("pointerdown", handlePointerDown);
    window.addEventListener("pointermove", handlePointerMove);
    window.addEventListener("pointerup", stopDrawing);
    window.addEventListener("pointercancel", stopDrawing);
    window.addEventListener("blur", stopDrawing);

    return () => {
      style.remove();
      window.removeEventListener("pointerdown", handlePointerDown);
      window.removeEventListener("pointermove", handlePointerMove);
      window.removeEventListener("pointerup", stopDrawing);
      window.removeEventListener("pointercancel", stopDrawing);
      window.removeEventListener("blur", stopDrawing);
      document.documentElement.classList.remove("begin-chalk-drawing");
      document
        .querySelectorAll(".begin-chalk-mark, .begin-chalk-powder")
        .forEach((mark) => {
          mark.remove();
        });
    };
  }, []);

  return null;
}
