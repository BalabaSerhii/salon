"use client";

import { useEffect, useRef } from "react";

// Создаем глобальный интерфейс для Cookiebot
declare global {
  interface Window {
    Cookiebot?: {
      consent?: {
        necessary: boolean;
        preferences: boolean;
        statistics: boolean;
        marketing: boolean;
      };
      show?: () => void;
      hide?: () => void;
      renew?: () => void;
    };
  }
}

// Экспортируемая функция для проверки согласия (можно использовать в других компонентах)
export function hasCookieConsent(
  category: "statistics" | "marketing" | "preferences" = "statistics"
): boolean {
  if (typeof window === "undefined") return false;

  // Если Cookiebot не загружен или нет согласия - возвращаем false
  if (!window.Cookiebot || !window.Cookiebot.consent) {
    return false;
  }

  return window.Cookiebot.consent[category] === true;
}

// Функция для ожидания согласия
export function waitForCookieConsent(
  category: "statistics" | "marketing" | "preferences" = "statistics"
): Promise<boolean> {
  return new Promise((resolve) => {
    if (typeof window === "undefined") {
      resolve(false);
      return;
    }

    // Если согласие уже есть
    if (hasCookieConsent(category)) {
      resolve(true);
      return;
    }

    // Слушаем событие Cookiebot
    const handler = () => {
      if (hasCookieConsent(category)) {
        window.removeEventListener("CookiebotOnAccept", handler);
        window.removeEventListener("CookiebotOnLoad", handler);
        resolve(true);
      }
    };

    window.addEventListener("CookiebotOnAccept", handler);
    window.addEventListener("CookiebotOnLoad", handler);

    // Таймаут на случай, если Cookiebot не загрузится
    setTimeout(() => {
      window.removeEventListener("CookiebotOnAccept", handler);
      window.removeEventListener("CookiebotOnLoad", handler);
      resolve(hasCookieConsent(category));
    }, 10000);
  });
}

// Создаем кастомное событие для уведомления других компонентов
const dispatchCookiebotLoaded = () => {
  if (typeof window !== "undefined") {
    window.dispatchEvent(new CustomEvent("CookiebotScriptLoaded"));
  }
};

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

      // Добавляем обработчики для отслеживания загрузки
      script.onload = () => {
        console.log("Cookiebot script loaded successfully");
        dispatchCookiebotLoaded();

        // Добавляем слушатели для глобальных событий Cookiebot
        if (window.Cookiebot) {
          // Создаем кастомные события для лучшей интеграции
          const originalShow = window.Cookiebot.show;
          const originalHide = window.Cookiebot.hide;
          const originalRenew = window.Cookiebot.renew;

          if (originalShow) {
            window.Cookiebot.show = function () {
              const result = originalShow.apply(this, arguments as any);
              window.dispatchEvent(new CustomEvent("CookiebotShown"));
              return result;
            };
          }

          if (originalHide) {
            window.Cookiebot.hide = function () {
              const result = originalHide.apply(this, arguments as any);
              window.dispatchEvent(new CustomEvent("CookiebotHidden"));
              return result;
            };
          }

          if (originalRenew) {
            window.Cookiebot.renew = function () {
              const result = originalRenew.apply(this, arguments as any);
              window.dispatchEvent(new CustomEvent("CookiebotRenewed"));
              return result;
            };
          }
        }
      };

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
