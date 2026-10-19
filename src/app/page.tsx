import { getInitialTheme } from '../lib/theme';
import App from '../App';

export default async function Page() {
  const initialTheme = await getInitialTheme();

  return <App initialTheme={initialTheme} />;
}