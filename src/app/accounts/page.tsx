import { AccountsClient } from './AccountsClient';

export const metadata = {
  title: 'Your subscription — Hopper',
  description: 'Manage your Hopper subscription.',
};

// Rendered when the mobile app opens hopperafrica.com/accounts?device_id=<hex>
// from the paywall / subscription screen. The device_id query param is the
// entire "linking" mechanism — no login, no pairing code.
export default function AccountsPage() {
  return <AccountsClient />;
}
