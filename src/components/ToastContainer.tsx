import React from 'react';
import { useBakery } from '../context/BakeryContext';
import { CheckCircle2, Info, AlertCircle, X } from 'lucide-react';

export const ToastContainer: React.FC = () => {
  const { toasts, removeToast } = useBakery();

  if (toasts.length === 0) return null;

  return (
    <div className="fixed bottom-6 right-6 z-50 flex flex-col gap-2 max-w-sm w-full pointer-events-none px-4 sm:px-0">
      {toasts.map((toast) => (
        <div
          key={toast.id}
          className="pointer-events-auto flex items-start gap-3 bg-white/95 backdrop-blur-md p-4 rounded-xl shadow-xl border border-[#E8DFC8] text-[#2C2420] transition-all transform animate-in fade-in slide-in-from-bottom-3 duration-300"
        >
          <div className="shrink-0 mt-0.5">
            {toast.type === 'success' && (
              <CheckCircle2 className="w-5 h-5 text-[#8B6B55]" />
            )}
            {toast.type === 'info' && (
              <Info className="w-5 h-5 text-[#9C826B]" />
            )}
            {toast.type === 'warning' && (
              <AlertCircle className="w-5 h-5 text-[#C0604A]" />
            )}
          </div>
          <div className="flex-1 min-w-0">
            <h4 className="text-sm font-semibold text-[#2C2420] font-sans">
              {toast.title}
            </h4>
            {toast.message && (
              <p className="text-xs text-[#6B5A4E] mt-0.5 leading-relaxed">
                {toast.message}
              </p>
            )}
          </div>
          <button
            onClick={() => removeToast(toast.id)}
            className="shrink-0 text-[#9C826B] hover:text-[#2C2420] p-1 transition-colors rounded-lg hover:bg-[#F5EFE6]"
            aria-label="Close notification"
          >
            <X className="w-4 h-4" />
          </button>
        </div>
      ))}
    </div>
  );
};
