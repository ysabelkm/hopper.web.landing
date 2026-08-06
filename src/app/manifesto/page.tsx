import { cookies } from 'next/headers';
import { ManifestoPage } from '../../components/ManifestoPage';

export const metadata = {
  title: 'Manifesto — Hopper',
  description: 'The principles guiding Hopper as we build resilient, private, and accessible communication.',
};

export default async function Page() {
  const initialTheme = (await cookies()).get('hopper-theme')?.value === 'light' ? 'light' : 'dark';
  return <ManifestoPage initialTheme={initialTheme} />;
}
