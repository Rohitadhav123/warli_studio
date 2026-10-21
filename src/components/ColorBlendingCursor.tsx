"use client";

import React, { useEffect, useRef, useSyncExternalStore } from "react";

function subscribe(callback: () => void) {
  window.addEventListener("resize", callback);
  return () => window.removeEventListener("resize", callback);
}

function getClientSnapshot(): boolean {
  if (typeof window === "undefined") return false;
  const hasTouch = window.matchMedia("(pointer: coarse)").matches;
  const isMobile = "ontouchstart" in window || navigator.maxTouchPoints > 0;
  return !hasTouch && !isMobile;
}

function getServerSnapshot(): boolean {
  return false;
}

export default function ColorBlendingCursor() {
  const isEnabled = useSyncExternalStore(subscribe, getClientSnapshot, getServerSnapshot);
  const circleRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!isEnabled) return;

    // Enable cursor hiding on non-touch desktop devices so OS pointer doesn't show inside circle
    document.documentElement.classList.add("custom-cursor-active");

    const prefersReducedMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;

    // Direct coordinates for zero React state overhead
    let targetX = -100;
    let targetY = -100;
    let currentX = -100;
    let currentY = -100;
    let isVisible = false;

    let targetScale = 1;
    let currentScale = 1;

    let rafId: number;

    const render = () => {
      const lerp = prefersReducedMotion ? 1 : 0.35;
      currentX += (targetX - currentX) * lerp;
      currentY += (targetY - currentY) * lerp;
      currentScale += (targetScale - currentScale) * 0.2;

      if (circleRef.current && isVisible) {
        // Exactly centered on pointer tip (26px / 2 = 13px)
        circleRef.current.style.transform = `translate3d(${currentX - 13}px, ${currentY - 13}px, 0) scale(${currentScale})`;
      }

      rafId = requestAnimationFrame(render);
    };

    rafId = requestAnimationFrame(render);

    const handlePointerMove = (e: PointerEvent) => {
      targetX = e.clientX;
      targetY = e.clientY;

      if (!isVisible) {
        isVisible = true;
        currentX = targetX;
        currentY = targetY;
        if (circleRef.current) {
          circleRef.current.style.opacity = "1";
        }
      }
    };

    const handlePointerLeave = () => {
      isVisible = false;
      if (circleRef.current) {
        circleRef.current.style.opacity = "0";
      }
    };

    // Global event delegation for hover states
    const handleMouseOver = (e: MouseEvent) => {
      const target = e.target as HTMLElement | null;
      if (!target) return;

      const interactive = target.closest(
        "a, button, [role='button'], input, textarea, select, .project-card-item, [data-cursor='hover']"
      );

      if (interactive) {
        targetScale = 1.6; // Subtly expands from 26px to ~42px over interactive elements
      } else {
        targetScale = 1.0;
      }
    };

    window.addEventListener("pointermove", handlePointerMove, { passive: true });
    document.addEventListener("mouseleave", handlePointerLeave);
    document.addEventListener("mouseover", handleMouseOver, { passive: true });

    return () => {
      cancelAnimationFrame(rafId);
      document.documentElement.classList.remove("custom-cursor-active");
      window.removeEventListener("pointermove", handlePointerMove);
      document.removeEventListener("mouseleave", handlePointerLeave);
      document.removeEventListener("mouseover", handleMouseOver);
    };
  }, [isEnabled]);

  if (!isEnabled) return null;

  // Single direct element attached with mix-blend-mode: difference and NO wrapper container
  // This guarantees Chrome/Blink/WebKit composites and inverts against all underlying text, images, and backgrounds
  return (
    <div
      ref={circleRef}
      className="fixed top-0 left-0 w-[26px] h-[26px] rounded-full bg-white opacity-0 pointer-events-none will-change-transform z-[999999]"
      style={{
        mixBlendMode: "difference",
      }}
      aria-hidden="true"
    />
  );
}
