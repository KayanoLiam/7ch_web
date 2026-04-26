'use client';

import { useRouter } from 'next/navigation';
import { RefreshCw } from 'lucide-react';

interface BoardRefreshButtonProps {
  label: string;
}

export function BoardRefreshButton({ label }: BoardRefreshButtonProps) {
  const router = useRouter();

  return (
    <button
      type="button"
      onClick={() => router.refresh()}
      className="bbs-desktop-icon-button"
      aria-label={label}
      title={label}
    >
      <RefreshCw className="h-4 w-4" />
    </button>
  );
}
