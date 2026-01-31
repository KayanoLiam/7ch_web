import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';

// --- UI Components ---

const Button = React.forwardRef<HTMLButtonElement, React.ButtonHTMLAttributes<HTMLButtonElement> & { variant?: 'default' | 'outline' | 'ghost' | 'secondary' | 'monero' }>(
  ({ className, variant = 'default', ...props }, ref) => {
    const baseStyles = "inline-flex items-center justify-center rounded-md text-sm font-medium ring-offset-white transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-slate-950 focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50";
    const variants = {
      default: "bg-slate-900 text-white hover:bg-slate-900/90",
      outline: "border border-slate-200 bg-white hover:bg-slate-100 hover:text-slate-900",
      ghost: "hover:bg-slate-100 hover:text-slate-900",
      secondary: "bg-slate-100 text-slate-900 hover:bg-slate-100/80",
      monero: "bg-[#ff6600] text-white hover:bg-[#ff6600]/90"
    };
    return (
      <button ref={ref} className={`${baseStyles} ${variants[variant]} h-10 px-4 py-2 ${className || ''}`} {...props} />
    );
  }
);

const Input = React.forwardRef<HTMLInputElement, React.InputHTMLAttributes<HTMLInputElement>>(
  ({ className, type, ...props }, ref) => {
    return (
      <input
        type={type}
        className={`flex h-10 w-full rounded-md border border-slate-200 bg-white px-3 py-2 text-sm ring-offset-white file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-slate-500 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-slate-950 focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 ${className || ''}`}
        ref={ref}
        {...props}
      />
    );
  }
);

const Label = React.forwardRef<HTMLLabelElement, React.LabelHTMLAttributes<HTMLLabelElement>>(
  ({ className, ...props }, ref) => (
    <label ref={ref} className={`text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70 ${className || ''}`} {...props} />
  )
);

// --- Icons ---

const CopyIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect width="14" height="14" x="8" y="8" rx="2" ry="2" /><path d="M4 16c-1.1 0-2-.9-2-2V4c0-1.1.9-2 2-2h10c1.1 0 2 .9 2 2" /></svg>
);

const CheckIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="20 6 9 17 4 12" /></svg>
);

const XIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M18 6 6 18" /><path d="m6 6 12 12" /></svg>
);

const HeartIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#ff6600" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M19 14c1.49-1.46 3-3.21 3-5.5A5.5 5.5 0 0 0 16.5 3c-1.76 0-3 .5-4.5 2-1.5-1.5-2.74-2-4.5-2A5.5 5.5 0 0 0 2 8.5c0 2.3 1.5 4.05 3 5.5l7 7Z" /></svg>
);

// --- Main Component ---

interface DonateModalProps {
  open: boolean;
  onClose: () => void;
}

export const DonateModal: React.FC<DonateModalProps> = ({ open, onClose }) => {
  const { t } = useTranslation();
  const [copied, setCopied] = useState(false);
  const xmrAddress = "84Uyp3QwGbPZvqHBwo68FRbQHFephm1DUYMa8t8yhdC2RhzJM5uQPCbRMRq4q1KnyCZ4GWHzcvxqMB5b6pPmcDr7PVQchYJ";

  const copyToClipboard = () => {
    navigator.clipboard.writeText(xmrAddress);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  if (!open) return null;

  return (
    // Overlay with fade-in effect
    <div className="fixed inset-0 z-50 bg-black/80 flex items-center justify-center p-4 animate-[fadeIn_0.2s_ease-out]" onClick={onClose}>

      {/* Dialog Content */}
      <div
        className="relative w-full max-w-lg gap-4 border border-slate-200 bg-white p-6 shadow-lg duration-200 sm:rounded-lg animate-[zoomIn_0.2s_ease-out]"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Close Button (Icon) */}
        <div className="absolute right-4 top-4 rounded-sm opacity-70 ring-offset-white transition-opacity hover:opacity-100 focus:outline-none focus:ring-2 focus:ring-slate-950 focus:ring-offset-2 disabled:pointer-events-none">
          <button onClick={onClose} className="p-1"><XIcon /></button>
        </div>

        {/* Header */}
        <div className="flex flex-col space-y-1.5 text-center sm:text-left mb-5">
          <h2 className="text-lg font-semibold leading-none tracking-tight flex items-center justify-center sm:justify-start gap-2 text-slate-900">
            <HeartIcon />
            {t('donate.title')}
          </h2>
          <p className="text-sm text-slate-500">
            Make 7ch stronger with Monero
          </p>
        </div>

        {/* Body */}
        <div className="grid gap-5 py-2">
          <p className="text-sm text-slate-700 leading-relaxed">
            {t('donate.desc')}
          </p>

          <div className="grid gap-2">
            <Label htmlFor="xmr-address" className="text-slate-600">XMR Address</Label>
            <div className="flex items-center space-x-2">
              <Input
                id="xmr-address"
                value={xmrAddress}
                readOnly
                className="font-mono text-xs bg-slate-50 text-slate-600 h-10 select-all"
              />
              <Button
                type="button"
                variant="outline"
                onClick={copyToClipboard}
                className="px-3 shrink-0 w-12"
              >
                {copied ? <CheckIcon /> : <CopyIcon />}
              </Button>
            </div>
          </div>

          <div className="bg-slate-50 p-3 rounded border border-slate-100">
            <p className="text-[11px] text-slate-500 italic text-center">
              {t('donate.note')}
            </p>
          </div>
        </div>

        {/* Footer */}
        <div className="flex flex-col-reverse sm:flex-row sm:justify-end sm:space-x-2 mt-6">
          <Button type="button" variant="ghost" onClick={onClose}>
            {t('donate.close')}
          </Button>
          <Button type="button" variant="monero" onClick={() => window.open('https://getmonero.org', '_blank')}>
            About Monero
          </Button>
        </div>
      </div>
    </div>
  );
};

// Add animation styles to global CSS
export const donateModalStyles = `
  @keyframes fadeIn {
    from { opacity: 0; }
    to { opacity: 1; }
  }
  @keyframes zoomIn {
    from { transform: scale(0.95); opacity: 0; }
    to { transform: scale(1); opacity: 1; }
  }
`;