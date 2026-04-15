'use client';

import { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';

import { DonateModal } from '../../components/DonateModal';

export function DonateFooterButton({ label }: { label: string }) {
  const { t } = useTranslation();
  const [open, setOpen] = useState(false);
  const [hasHydrated, setHasHydrated] = useState(false);

  useEffect(() => {
    setHasHydrated(true);
  }, []);

  return (
    <>
      <button className="themed-nav-link hover:underline" type="button" onClick={() => setOpen(true)}>
        {hasHydrated ? t('footer.donate') : label}
      </button>
      <DonateModal open={open} onClose={() => setOpen(false)} />
    </>
  );
}
