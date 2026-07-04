import { cookies } from 'next/headers';
import { PricingPage } from '../../components/PricingPage';

export const metadata = {
  title: 'Pricing — Hopper',
  description: 'Simple, honest pricing. ₦867/month or ₦9,500/year. No hidden fees, no towers, no limits.',
};

export default async function Page() {
  const initialTheme = (await cookies()).get('hopper-theme')?.value === 'light' ? 'light' : 'dark';
  return <PricingPage initialTheme={initialTheme} />;
}
