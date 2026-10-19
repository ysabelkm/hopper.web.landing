import { getInitialTheme } from '../../lib/theme';
import { SupportPage } from '../../components/SupportPage';

export const metadata = {
  title: 'Support - How can we help you get connected?',
  description: 'Get help with Hopper. Find answers to common questions, reach our team, or explore the documentation.',
};

export default async function Page() {
  const initialTheme = await getInitialTheme();
  return <SupportPage initialTheme={initialTheme} />;
}
