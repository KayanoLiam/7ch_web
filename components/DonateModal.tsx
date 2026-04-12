import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Button } from './ui/button';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from './ui/dialog';
import { Copy, Check, ArrowRight } from 'lucide-react';

interface DonateModalProps {
  open: boolean;
  onClose: () => void;
}

export const DonateModal: React.FC<DonateModalProps> = ({ open, onClose }) => {
  const { t } = useTranslation();
  const [copied, setCopied] = useState(false);
  const solanaAddress = 'BDyEDrsh2KNxVcxhkocgqgJ5Psxy6X7ffsmRPMfAw7G6';

  const copyToClipboard = () => {
    navigator.clipboard.writeText(solanaAddress);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <Dialog open={open} onOpenChange={(isOpen) => !isOpen && onClose()}>
      <DialogContent className="max-w-md overflow-hidden border-gray-200 bg-white p-0 text-gray-900 shadow-xl dark:border-gray-700 dark:bg-gray-900 dark:text-gray-100">
        <div className="px-6 py-6 md:px-8 md:py-8">
          <DialogHeader className="mb-6 space-y-1.5 flex flex-col items-start text-left">
            <DialogTitle className="flex items-center gap-2 text-xl tracking-tight text-gray-900 dark:text-gray-100">
              <span className="w-2 h-2 rounded-full bg-gradient-to-r from-[#14F195] to-[#9945FF]" />
              {t('donate.title')}
            </DialogTitle>
            <DialogDescription className="text-[14px] themed-meta">
              {t('donate.subtitle')}
            </DialogDescription>
          </DialogHeader>

          <div className="grid gap-5">
            <p className="text-[14px] font-normal leading-relaxed themed-meta">
              {t('donate.desc')}
            </p>

            {/* Network Display */}
            <div className="themed-metric-card p-3.5">
              <div className="themed-kicker mb-1 flex justify-between">
                <span>{t('donate.networkLabel')}</span>
              </div>
              <div className="mt-0.5 flex items-center gap-2 font-mono text-[13px] text-foreground">
                <span className="w-2 h-2 rounded-full bg-[#14F195] shadow-[0_0_4px_rgba(20,241,149,0.4)]" />
                {t('donate.networkValue')}
              </div>
            </div>

            {/* Address Field */}
            <div className="space-y-1.5">
              <label htmlFor="solana-address" className="themed-kicker block text-[12px]">
                {t('donate.addressLabel')}
              </label>
              <div className="themed-card flex items-center gap-2 p-1 transition-colors focus-within:border-[#9945FF] focus-within:ring-1 focus-within:ring-[#9945FF]/20">
                <input
                  id="solana-address"
                  value={solanaAddress}
                  readOnly
                  className="w-full select-all bg-transparent px-3 font-mono text-[13px] text-foreground focus:outline-none"
                />
                <Button
                  type="button"
                  onClick={copyToClipboard}
                  className="themed-secondary-action flex h-8 w-10 shrink-0 items-center justify-center rounded-xl border-0 px-3 text-gray-600 transition-colors dark:text-gray-300"
                >
                  {copied ? <Check className="h-4 w-4 text-[#14F195]" /> : <Copy className="h-4 w-4" />}
                </Button>
              </div>
            </div>

            {/* Note Section */}
            <div className="pt-2">
              <p className="themed-meta text-center text-[12px] font-normal leading-relaxed">
                {t('donate.note')}
              </p>
            </div>
          </div>

          <DialogFooter className="mt-8 flex flex-col-reverse gap-3 border-t border-border pt-5 sm:flex-row sm:justify-between sm:gap-0">
            <Button
              variant="ghost"
              onClick={onClose}
              className="h-10 rounded-xl px-4 text-sm font-medium themed-meta transition-colors hover:bg-secondary hover:text-foreground"
            >
              {t('donate.close')}
            </Button>
            <Button
              asChild
              className="themed-secondary-action group flex h-10 w-full items-center justify-center gap-2 rounded-md px-5 text-sm font-medium text-gray-900 transition-all dark:text-gray-100 sm:w-auto"
            >
              <a href="https://solana.com" target="_blank" rel="noopener noreferrer">
                <span className="bg-gradient-to-r from-[#14F195] to-[#9945FF] bg-clip-text text-transparent transition-opacity group-hover:opacity-80">
                  {t('donate.learn')}
                </span>
                <ArrowRight className="h-4 w-4 text-[#9945FF]/70" />
              </a>
            </Button>
          </DialogFooter>
        </div>
      </DialogContent>
    </Dialog>
  );
};
