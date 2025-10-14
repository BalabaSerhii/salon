"use client";

import { useEffect, useRef } from "react";

export default function CookiebotLoader(): null {
  const loadedRef = useRef(false);
  const timerRef = useRef<number | null>(null);

  useEffect(() => {
    if (typeof window === "undefined") return;

    const opts: AddEventListenerOptions = { passive: true };

    const loadScript = () => {
      if (loadedRef.current) return;
      loadedRef.current = true;

      const script = document.createElement("script");
      script.id = "Cookiebot";
      script.src = "https://consent.cookiebot.com/uc.js";
      script.dataset.cbid = "08322d39-bbda-4e0c-925a-4e08a8067212";
      script.dataset.blockingmode = "auto";
      script.type = "text/javascript";
      script.async = true;
      script.defer = true;
      document.body.appendChild(script);

      removeListeners();
      if (timerRef.current) {
        window.clearTimeout(timerRef.current);
        timerRef.current = null;
      }
    };

    const onFirstInteraction = () => {
      loadScript();
    };

    window.addEventListener("scroll", onFirstInteraction, opts);
    window.addEventListener("click", onFirstInteraction);
    window.addEventListener("pointerdown", onFirstInteraction);
    window.addEventListener("keydown", onFirstInteraction);

    const removeListeners = () => {
      try {
        window.removeEventListener("scroll", onFirstInteraction, opts);
        window.removeEventListener("click", onFirstInteraction);
        window.removeEventListener("pointerdown", onFirstInteraction);
        window.removeEventListener("keydown", onFirstInteraction);
      } catch {}
    };

    timerRef.current = window.setTimeout(() => {
      loadScript();
    }, 8000);

    return () => {
      removeListeners();
      if (timerRef.current) {
        window.clearTimeout(timerRef.current);
        timerRef.current = null;
      }
    };
  }, []);

  return null;
}
