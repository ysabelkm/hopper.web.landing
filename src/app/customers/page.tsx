import { cookies } from 'next/headers';
import { CustomersPage } from '../../components/CustomersPage';

export const metadata = {
  title: 'Customers — Hopper',
  description: 'See how communities, NGOs, schools, and first responders use Hopper to stay connected when everything else fails.',
};

export default async function Page() {
  const initialTheme = (await cookies()).get('hopper-theme')?.value === 'light' ? 'light' : 'dark';
  return <CustomersPage initialTheme={initialTheme} />;
}
