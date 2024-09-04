import { Noto_Sans, Noto_Sans_KR } from 'next/font/google';

import './globals.css';

import type { Metadata } from 'next';

import ReactQuery from '@/components/Provider/ReactQuery';
import TossOverlay from '@/components/Provider/TossOverlay';
import Toast from '@/components/Toast';

const notoSansKr = Noto_Sans_KR({ subsets: ['latin'], weight: ['400', '500', '700', '900'] });
const notoSans = Noto_Sans({ subsets: ['latin'], weight: ['400', '700', '900'] });

export const metadata: Metadata = {
  title: '돌잔치',
  description: '돌잔치 랭킹현황표',
};

// export const viewport: Viewport = {
//   width: 'device-width',
//   initialScale: 1,
//   maximumScale: 1,
//   userScalable: false,
// };

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ko">
      <body className={`${notoSansKr.className} ${notoSans.className}`}>
        <ReactQuery>
          <TossOverlay>{children}</TossOverlay>
        </ReactQuery>
        <Toast />
      </body>
    </html>
  );
}
