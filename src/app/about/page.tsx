import { cookies } from 'next/headers';
import { AboutPage } from '../../components/AboutPage';

export const metadata = {
  title: 'About Us — Hopper',
  description:
    'Meet Hopper, an offline-first communication network built to keep people connected beyond conventional infrastructure.',
};

export default async function Page() {
  const initialTheme = (await cookies()).get('hopper-theme')?.value === 'light' ? 'light' : 'dark';
  return <AboutPage initialTheme={initialTheme} />;
}
