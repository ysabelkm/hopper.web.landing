import { getInitialTheme } from '../../lib/theme';
import { BlogPage } from '../../components/BlogPage';

export const metadata = {
  title: 'Blog — Hopper',
  description: 'Notes from the mesh: engineering, product and stories from the Hopper team.',
};

export default async function Page() {
  const initialTheme = await getInitialTheme();
  return <BlogPage initialTheme={initialTheme} />;
}
