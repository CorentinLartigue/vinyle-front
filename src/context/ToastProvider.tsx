"use client";

import { createContext, useContext } from "react";
import { toast, ToastContainer, ToastOptions } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

interface ToastContextType {
    showSuccess: (msg: string) => void;
    showError: (msg: string) => void;
    showWarning: (msg: string) => void;
    showInfo: (msg: string) => void;
}

const ToastContext = createContext<ToastContextType | undefined>(undefined);

export const useToast = (): ToastContextType => {
    const context = useContext(ToastContext);
    if (!context) {
        throw new Error("useToast doit être utilisé dans un ToastProvider");
    }
    return context;
};

const toastStyles: Record<string, React.CSSProperties> = {
    success: { background: "#4CAF50", color: "#fff" },
    error: { background: "#F44336", color: "#fff" },
    warning: { background: "#FF9800", color: "#fff" },
    info: { background: "#2196F3", color: "#fff" },
};

export const ToastProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    const toastOptions: ToastOptions = {
        position: "top-right",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
    };

    const showToast = (type: keyof typeof toastStyles, message: string) => {
        toast(message, { ...toastOptions, style: toastStyles[type] });
    };

    const contextValue: ToastContextType = {
        showSuccess: (msg) => showToast("success", msg),
        showError: (msg) => showToast("error", msg),
        showWarning: (msg) => showToast("warning", msg),
        showInfo: (msg) => showToast("info", msg),
    };

    return (
        <ToastContext.Provider value={contextValue}>
            {children}
            <ToastContainer />
        </ToastContext.Provider>
    );
};