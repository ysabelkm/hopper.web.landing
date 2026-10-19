import { cookies } from 'next/headers';

export type Theme = 'light' | 'dark';

/** Light is the default; dark only when the visitor has chosen it. */
export async function getInitialTheme(): Promise<Theme> {
  return (await cookies()).get('hopper-theme')?.value === 'dark' ? 'dark' : 'light';
}
