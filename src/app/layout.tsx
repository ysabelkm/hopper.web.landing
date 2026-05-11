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
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link href="https://fonts.googleapis.com/css2?family=Outfit:wght@500&display=swap" rel="stylesheet" />
        <link rel="icon" href="/hopper_icon_black.png" type="image/png" sizes="any" media="(prefers-color-scheme: light)" />
        <link rel="icon" href="/hopper_icon_white.png" type="image/png" sizes="any" media="(prefers-color-scheme: dark)" />
        <link rel="shortcut icon" href="/hopper_icon_black.png" type="image/png" />
      </head>
      <body>{children}</body>
    </html>
  );
}