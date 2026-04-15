'use client';

import React from 'react';

import '../i18n';
import { ExternalLinkWarningProvider } from '../components/ExternalLinkWarning';
import { ThemeProvider } from '../components/theme-provider';

export default function Providers({ children }: { children: React.ReactNode }) {
  return (
    <ThemeProvider>
      <ExternalLinkWarningProvider>{children}</ExternalLinkWarningProvider>
    </ThemeProvider>
  );
}

