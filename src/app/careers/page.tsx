import { cookies } from 'next/headers';
import { CareersPage } from '../../components/CareersPage';

export const metadata = {
  title: 'Careers — Hopper',
  description: 'Career opportunities at Hopper.',
};

export default async function Page() {
  const initialTheme = (await cookies()).get('hopper-theme')?.value === 'light' ? 'light' : 'dark';
  return <CareersPage initialTheme={initialTheme} />;
}
