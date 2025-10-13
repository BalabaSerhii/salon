"use client";

import { useEffect } from "react";

interface ToastNotificationProps {
  message: string;
  type: "success" | "error";
  isVisible: boolean;
  onClose: () => void;
  duration?: number;
}

export default function ToastNotification({
  message,
  type,
  isVisible,
  onClose,
  duration = 5000,
}: ToastNotificationProps) {
  useEffect(() => {
    if (isVisible) {
      const timer = setTimeout(() => {
        onClose();
      }, duration);

      return () => clearTimeout(timer);
    }
  }, [isVisible, duration, onClose]);

  if (!isVisible) return null;

  const styles = {
    success: {
      bg: "bg-green-50 border-green-200",
      text: "text-green-800",
      icon: "✅",
    },
    error: {
      bg: "bg-red-50 border-red-200",
      text: "text-red-800",
      icon: "❌",
    },
  };

  const currentStyle = styles[type];

  return (
    <>
      {/* Затемнение фона */}
      <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4">
        {/* Модальное окно с уведомлением */}
        <div
          className={`
            ${currentStyle.bg} border-2 ${currentStyle.text}
            rounded-xl shadow-2xl p-6 max-w-md w-full mx-auto
            transform transition-all duration-400
            animate-in zoom-in-95 fade-in-0
          `}
        >
          <div className="flex items-center justify-center space-x-3">
            <span className="text-2xl">{currentStyle.icon}</span>
            <div className="flex-1">
              <h3 className="font-semibold text-lg text-center">
                {type === "success" ? "Erfolg!" : "Fehler!"}
              </h3>
              <p className="text-center mt-2">{message}</p>
            </div>
          </div>

          {/* Прогресс бар */}
          <div className="mt-4 w-full bg-gray-200 rounded-full h-1">
            <div
              className={`h-1 rounded-full transition-all duration-${duration} ${
                type === "success" ? "bg-green-500" : "bg-red-500"
              }`}
              style={{
                animation: `shrinkWidth ${duration}ms linear forwards`,
              }}
            />
          </div>
        </div>
      </div>

      <style jsx>{`
        @keyframes shrinkWidth {
          from {
            width: 100%;
          }
          to {
            width: 0%;
          }
        }
      `}</style>
    </>
  );
}
