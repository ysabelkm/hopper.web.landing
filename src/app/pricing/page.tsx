import { cookies } from 'next/headers';
import { PricingPage } from '../../components/PricingPage';

export const metadata = {
  title: 'Pricing — Hopper',
  description: 'Simple, honest pricing. $1/month or $11/year. No hidden fees, no towers, no limits.',
};

export default async function Page() {
  const initialTheme = (await cookies()).get('hopper-theme')?.value === 'light' ? 'light' : 'dark';
  return <PricingPage initialTheme={initialTheme} />;
}
