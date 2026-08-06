import { cookies } from 'next/headers';
import { TeamPage } from '../../components/TeamPage';

export const metadata = {
  title: 'The Team — Hopper',
  description: 'Meet the three co-founders building Hopper and leading its technology, growth, finance, and operations.',
};

export default async function Page() {
  const initialTheme = (await cookies()).get('hopper-theme')?.value === 'light' ? 'light' : 'dark';
  return <TeamPage initialTheme={initialTheme} />;
}
