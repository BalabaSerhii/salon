"use client";

import { useEffect, useState } from "react";
import Script from "next/script";
import { hasCookieConsent, waitForCookieConsent } from "./CookiebotLoader";

export function GoogleAnalyticsWithCookiebot() {
  const GA_TRACKING_ID = process.env.NEXT_PUBLIC_GA_TRACKING_ID;
  const [hasGAconsent, setHasGAconsent] = useState(false);

  useEffect(() => {
    if (!GA_TRACKING_ID || typeof window === "undefined") return;

    let timeoutId: NodeJS.Timeout;

    const initializeGA = () => {
      // Задержка 3 секунды после получения согласия
      timeoutId = setTimeout(() => {
        setHasGAconsent(true);
        console.log("Google Analytics will load after 3 seconds delay");
      }, 3000);
    };

    // Проверяем сразу при монтировании
    if (hasCookieConsent("statistics")) {
      console.log("Statistics consent already given on mount");
      initializeGA();
    } else {
      // Ждем согласия
      waitForCookieConsent("statistics").then((consentGiven) => {
        if (consentGiven) {
          console.log("Statistics consent given via promise");
          initializeGA();
        }
      });
    }

    // Также слушаем события напрямую
    const handleCookiebotEvent = () => {
      if (hasCookieConsent("statistics") && !hasGAconsent) {
        console.log("Statistics consent given via event");
        initializeGA();
      }
    };

    window.addEventListener("CookiebotOnAccept", handleCookiebotEvent);
    window.addEventListener("CookiebotScriptLoaded", handleCookiebotEvent);

    return () => {
      clearTimeout(timeoutId);
      window.removeEventListener("CookiebotOnAccept", handleCookiebotEvent);
      window.removeEventListener("CookiebotScriptLoaded", handleCookiebotEvent);
    };
  }, [GA_TRACKING_ID, hasGAconsent]);

  if (!GA_TRACKING_ID || !hasGAconsent) {
    return null;
  }

  return (
    <>
      <Script
        id="gtag-script"
        strategy="lazyOnload"
        src={`https://www.googletagmanager.com/gtag/js?id=${GA_TRACKING_ID}`}
      />
      <Script
        id="gtag-init"
        strategy="lazyOnload"
        dangerouslySetInnerHTML={{
          __html: `
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', '${GA_TRACKING_ID}', {
              anonymize_ip: true,
              allow_google_signals: false,
              allow_ad_personalization_signals: false
            });
            console.log('GA loaded with cookie consent + 3s delay');
          `,
        }}
      />
    </>
  );
}
