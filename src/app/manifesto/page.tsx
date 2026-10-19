import { getInitialTheme } from '../../lib/theme';
import { ManifestoPage } from '../../components/ManifestoPage';

export const metadata = {
  title: 'Manifesto — Hopper',
  description: 'The principles guiding Hopper as we build resilient, private, and accessible communication.',
};

export default async function Page() {
  const initialTheme = await getInitialTheme();
  return <ManifestoPage initialTheme={initialTheme} />;
}
