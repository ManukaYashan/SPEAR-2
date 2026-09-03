"use client";

import { useState, useEffect, useRef, RefObject } from "react";

/**
 * Generic IntersectionObserver hook.
 * Returns [ref, isIntersecting].
 * Once `once` is true the intersection state latches to true permanently.
 */
export function useInView<T extends Element>(
  options?: IntersectionObserverInit,
  once = false
): [RefObject<T | null>, boolean] {
  const ref = useRef<T>(null);
  const [isInView, setIsInView] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const observer = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) {
        setIsInView(true);
        if (once) observer.disconnect();
      } else {
        if (!once) setIsInView(false);
      }
    }, options);

    observer.observe(el);
    return () => observer.disconnect();
  }, [options, once]);

  return [ref, isInView];
}
