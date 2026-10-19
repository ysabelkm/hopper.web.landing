import { getInitialTheme } from '../../lib/theme';
import { TermsPage } from '../../components/TermsPage';

export const metadata = {
  title: 'Terms of Service - Hopper',
  description: 'Read the Hopper Terms of Service. These terms govern your use of the Hopper mesh communication app.',
};

export default async function Page() {
  const initialTheme = await getInitialTheme();
  return <TermsPage initialTheme={initialTheme} />;
}
