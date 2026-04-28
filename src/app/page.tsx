import App from '../App';
import { cookies } from 'next/headers';

export default async function Page() {
  const initialTheme = (await cookies()).get('hopper-theme')?.value === 'light' ? 'light' : 'dark';

  return <App initialTheme={initialTheme} />;
}