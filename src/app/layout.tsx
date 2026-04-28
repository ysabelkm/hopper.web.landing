import type { Metadata } from 'next';
import { cookies } from 'next/headers';
import '../index.css';

export const metadata: Metadata = {
  title: 'Hopper',
  description: 'Offline-first mesh networking for resilient communication.',
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const theme = (await cookies()).get('hopper-theme')?.value === 'light' ? 'light' : 'dark';

  return (
    <html lang="en" className={theme} suppressHydrationWarning>
      <body>{children}</body>
    </html>
  );
}