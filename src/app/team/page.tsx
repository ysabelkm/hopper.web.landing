import { getInitialTheme } from '../../lib/theme';
import { TeamPage } from '../../components/TeamPage';

export const metadata = {
  title: 'The Team — Hopper',
  description: 'Meet the three co-founders building Hopper and leading its technology, growth, finance, and operations.',
};

export default async function Page() {
  const initialTheme = await getInitialTheme();
  return <TeamPage initialTheme={initialTheme} />;
}
