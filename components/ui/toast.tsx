"use client";

import { createContext, useContext, useState, ReactNode, useCallback } from "react";
import { X, CheckCircle2, AlertCircle, Info } from "lucide-react";

type ToastType = "success" | "error" | "info" | "warning";

interface Toast {
  id: string;
  type: ToastType;
  title: string;
  message?: string;
  duration?: number;
}

interface ToastContextType {
  toasts: Toast[];
  addToast: (toast: Omit<Toast, "id">) => void;
  removeToast: (id: string) => void;
}

const ToastContext = createContext<ToastContextType | undefined>(undefined);

export function ToastProvider({ children }: { children: ReactNode }) {
  const [toasts, setToasts] = useState<Toast[]>([]);

  const addToast = useCallback((toast: Omit<Toast, "id">) => {
    const id = Math.random().toString(36).slice(2, 9);
    setToasts((prev) => [...prev, { ...toast, id }]);
  }, []);

  const removeToast = useCallback((id: string) => {
    setToasts((prev) => prev.filter((t) => t.id !== id));
  }, []);

  return (
    <ToastContext.Provider value={{ toasts, addToast, removeToast }}>
      {children}
      <ToastContainer toasts={toasts} onRemove={removeToast} />
    </ToastContext.Provider>
  );
}

export function useToast() {
  const context = useContext(ToastContext);
  if (!context) {
    throw new Error("useToast must be used within a ToastProvider");
  }
  return context;
}

function ToastContainer({ toasts, onRemove }: { toasts: Toast[]; onRemove: (id: string) => void }) {
  const icons = {
    success: CheckCircle2,
    error: AlertCircle,
    info: Info,
    warning: AlertCircle,
  };

  const colors = {
    success: "border-green-200 bg-green-50 text-green-800",
    error: "border-red-200 bg-red-50 text-red-800",
    info: "border-blue-200 bg-blue-50 text-blue-800",
    warning: "border-yellow-200 bg-yellow-50 text-yellow-800",
  };

  const iconColors = {
    success: "text-green-600",
    error: "text-red-600",
    info: "text-blue-600",
    warning: "text-yellow-600",
  };

  return (
    <div className="fixed bottom-4 right-4 z-50 flex flex-col gap-2 max-w-sm w-full" style={{ animation: "slide-in 0.3s ease-out" }}>
      {toasts.map((toast) => {
        const Icon = icons[toast.type];
        return (
          <div
            key={toast.id}
            className={`flex gap-3 rounded-lg border p-4 shadow-lg animate-slide-in ${colors[toast.type]}`}
            role="alert"
            aria-live="polite"
            style={{ animation: "slide-in 0.3s ease-out" }}
          >
            <Icon className={`h-5 w-5 flex-shrink-0 ${iconColors[toast.type]}`} />
            <div className="flex-1 min-w-0">
              <p className="font-medium">{toast.title}</p>
              {toast.message && <p className="text-sm mt-0.5">{toast.message}</p>}
            </div>
            <button
              onClick={() => onRemove(toast.id)}
              className="flex-shrink-0 text-current opacity-50 hover:opacity-100"
              aria-label="Dismiss"
            >
              <X className="h-4 w-4" />
            </button>
          </div>
        );
      })}
    </div>
  );
}

export function toast(type: ToastType, title: string, message?: string, duration = 5000) {
  if (typeof window === "undefined") return;
  const event = new CustomEvent("toast:add", { detail: { type, title, message, duration } });
  window.dispatchEvent(event);
}

toast.success = (title: string, message?: string, duration?: number) => toast("success", title, message, duration);
toast.error = (title: string, message?: string, duration?: number) => toast("error", title, message, duration);
toast.info = (title: string, message?: string, duration?: number) => toast("info", title, message, duration);
toast.warning = (title: string, message?: string, duration?: number) => toast("warning", title, message, duration);