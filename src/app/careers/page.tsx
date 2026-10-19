import { getInitialTheme } from '../../lib/theme';
import { CareersPage } from '../../components/CareersPage';

export const metadata = {
  title: 'Careers — Hopper',
  description: 'Career opportunities at Hopper.',
};

export default async function Page() {
  const initialTheme = await getInitialTheme();
  return <CareersPage initialTheme={initialTheme} />;
}
