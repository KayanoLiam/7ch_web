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
import { X, Copy, Check, Heart } from 'lucide-react';

// 捐赠弹窗：展示 XMR 地址并提供一键复制。
// Donate modal: shows XMR address with one-click copy.
interface DonateModalProps {
  open: boolean;
  onClose: () => void;
}

export const DonateModal: React.FC<DonateModalProps> = ({ open, onClose }) => {
  const { t } = useTranslation();
  const [copied, setCopied] = useState(false);
  // 地址为只读展示；更换时只需更新此常量。
  // Address is read-only; update here when rotated.
  const xmrAddress = "84Uyp3QwGbPZvqHBwo68FRbQHFephm1DUYMa8t8yhdC2RhzJM5uQPCbRMRq4q1KnyCZ4GWHzcvxqMB5b6pPmcDr7PVQchYJ";

  const copyToClipboard = () => {
    // 复制后短暂展示成功图标，提升反馈感。
    // After copy, show a short success state for feedback.
    navigator.clipboard.writeText(xmrAddress);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <Dialog open={open} onOpenChange={(isOpen) => !isOpen && onClose()}>
      <DialogContent className="max-w-lg">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <Heart className="h-5 w-5 text-[#ff6600]" />
            {t('donate.title')}
          </DialogTitle>
          <DialogDescription>Make 7ch stronger with Monero</DialogDescription>
        </DialogHeader>

        <div className="grid gap-5 py-2">
          <p className="text-sm text-slate-700 leading-relaxed">
            {t('donate.desc')}
          </p>

          <div className="grid gap-2">
            <label htmlFor="xmr-address" className="text-sm font-medium leading-none text-slate-600">XMR Address</label>
            <div className="flex items-center space-x-2">
              <input
                id="xmr-address"
                value={xmrAddress}
                readOnly
                className="flex h-10 w-full rounded-md border border-slate-200 bg-white px-3 py-2 text-sm ring-offset-white file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-slate-500 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-slate-950 focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 font-mono text-xs bg-slate-50 text-slate-600 select-all"
              />
              <Button
                type="button"
                variant="outline"
                onClick={copyToClipboard}
                className="px-3 shrink-0 w-12"
              >
                {copied ? <Check className="h-4 w-4" /> : <Copy className="h-4 w-4" />}
              </Button>
            </div>
          </div>

          <div className="bg-slate-50 p-3 rounded border border-slate-100">
            <p className="text-[11px] text-slate-500 italic text-center">
              {t('donate.note')}
            </p>
          </div>
        </div>

        <DialogFooter>
          <Button variant="ghost" onClick={onClose}>
            {t('donate.close')}
          </Button>
          <Button variant="blue" onClick={() => window.open('https://getmonero.org', '_blank')}>
            About Monero
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};
