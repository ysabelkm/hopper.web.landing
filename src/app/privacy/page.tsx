import { cookies } from 'next/headers';
import { PrivacyPage } from '../../components/PrivacyPage';

export const metadata = {
  title: 'Privacy Policy - Hopper',
  description: 'Read the Hopper Privacy Policy. Learn how we collect, use, and protect your information.',
};

export default async function Page() {
  const initialTheme = (await cookies()).get('hopper-theme')?.value === 'light' ? 'light' : 'dark';
  return <PrivacyPage initialTheme={initialTheme} />;
}
