import { Inter, Noto_Sans, Noto_Sans_KR } from 'next/font/google';

import type { Metadata } from 'next';
import './globals.css';

const notoSansKr = Noto_Sans_KR({ subsets: ['latin'], weight: ['400', '700', '900'] });
const notoSans = Noto_Sans({ subsets: ['latin'], weight: ['400', '700', '900'] });

export const metadata: Metadata = {
	title: '돌잔치',
	description: '돌잔치 랭킹현황표',
};

export default function RootLayout({
	children,
}: Readonly<{
	children: React.ReactNode;
}>) {
	return (
		<html lang="ko">
			<body className={`${notoSansKr.className} ${notoSans.className}`}>{children}</body>
		</html>
	);
}
