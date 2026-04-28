import { cookies } from 'next/headers';
import { HowItWorksPage } from '../../components/HowItWorksPage';

export const metadata = {
  title: 'How It Works — Hopper',
  description: 'Learn how Hopper builds a live encrypted mesh from the radio chips already inside your phone.',
};

export default async function Page() {
  const initialTheme = (await cookies()).get('hopper-theme')?.value === 'light' ? 'light' : 'dark';
  return <HowItWorksPage initialTheme={initialTheme} />;
}
