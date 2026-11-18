import { getInitialTheme } from '../lib/theme';
import type { Metadata } from 'next';
import { Instrument_Sans, Sora } from 'next/font/google';
import '../index.css';
import { Splash } from '../components/Splash';

export const metadata: Metadata = {
  title: 'Hopper: Offline Chat',
  description:
    'The offline chat app. Messages hop phone to phone over Bluetooth and Wi-Fi Direct — no SIM, no Wi-Fi, no towers.',
};

// Downloaded at build time and served from this site, so text doesn't wait on
// a request to Google before it can paint. index.css reads the variables.
const instrumentSans = Instrument_Sans({
  subsets: ['latin'],
  weight: ['400', '500', '600', '700'],
  variable: '--font-instrument-sans',
  display: 'swap',
});

const sora = Sora({
  subsets: ['latin'],
  weight: ['300', '400', '500', '600', '700', '800'],
  variable: '--font-sora',
  display: 'swap',
});

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const theme = await getInitialTheme();

  return (
    <html
      lang="en"
      className={`${theme} ${instrumentSans.variable} ${sora.variable}`}
      suppressHydrationWarning
    >
      <head>
        <link rel="icon" href="/hopper_icon_black.png" type="image/png" sizes="any" media="(prefers-color-scheme: light)" />
        <link rel="icon" href="/hopper_icon_white.png" type="image/png" sizes="any" media="(prefers-color-scheme: dark)" />
        <link rel="shortcut icon" href="/hopper_icon_black.png" type="image/png" />
      </head>
      <body>
        {/* First in <body> so the loading screen paints before anything else. */}
        <Splash />
        {children}
      </body>
    </html>
  );
}
