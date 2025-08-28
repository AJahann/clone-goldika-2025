"use client";

import { useEffect, useState } from "react";

export const usePWAInstall = () => {
  const [deferredPrompt, setDeferredPrompt] = useState<any>(null);
  const [isSupported, setIsSupported] = useState(false);
  const [isAppInstalled, setIsAppInstalled] = useState(false);

  useEffect(() => {
    const isSupportedBrowser =
      window.hasOwnProperty("BeforeInstallPromptEvent") ||
      (/iPad|iPhone|iPod/.test(navigator.userAgent) &&
        !(window as any).MSStream);

    setIsSupported(isSupportedBrowser);

    const checkIfAppInstalled = () => {
      if (window.matchMedia("(display-mode: standalone)").matches) {
        setIsAppInstalled(true);
        return true;
      }
      return false;
    };

    const handleBeforeInstallPrompt = (e: Event) => {
      e.preventDefault();
      setDeferredPrompt(e);
    };

    const handleAppInstalled = () => {
      setIsAppInstalled(true);
      setDeferredPrompt(null);
    };

    if (!checkIfAppInstalled() && isSupportedBrowser) {
      window.addEventListener("beforeinstallprompt", handleBeforeInstallPrompt);
      window.addEventListener("appinstalled", handleAppInstalled);
    }

    return () => {
      window.removeEventListener(
        "beforeinstallprompt",
        handleBeforeInstallPrompt,
      );
      window.removeEventListener("appinstalled", handleAppInstalled);
    };
  }, []);

  const installApp = async (): Promise<boolean> => {
    if (!deferredPrompt) return false;

    deferredPrompt.prompt();
    const { outcome } = await deferredPrompt.userChoice;

    if (outcome === "accepted") {
      setDeferredPrompt(null);
      return true;
    }

    return false;
  };

  return {
    canInstall: !!deferredPrompt && !isAppInstalled,
    isSupported,
    isAppInstalled,
    installApp,
  };
};
