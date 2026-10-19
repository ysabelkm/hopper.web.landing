import { getInitialTheme } from '../../lib/theme';
import { HowItWorksPage } from '../../components/HowItWorksPage';

export const metadata = {
  title: 'How It Works — Hopper',
  description: 'Learn how Hopper builds a live encrypted mesh from the radio chips already inside your phone.',
};

export default async function Page() {
  const initialTheme = await getInitialTheme();
  return <HowItWorksPage initialTheme={initialTheme} />;
}
