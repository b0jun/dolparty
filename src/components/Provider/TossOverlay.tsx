'use client';

import { OverlayProvider } from '@toss/use-overlay';

const TossOverlay = ({ children }: { children: React.ReactNode }) => {
  return <OverlayProvider>{children}</OverlayProvider>;
};

export default TossOverlay;
