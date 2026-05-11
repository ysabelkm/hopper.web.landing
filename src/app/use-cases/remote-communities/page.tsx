import { cookies } from 'next/headers';
import { UseCasePage } from '../../../components/UseCasePage';

export const metadata = {
  title: 'Remote Communities - Hopper',
  description: 'How Hopper connects remote and under-served communities without internet infrastructure.',
};

export default async function Page() {
  const initialTheme = (await cookies()).get('hopper-theme')?.value === 'light' ? 'light' : 'dark';

  return (
    <UseCasePage
      initialTheme={initialTheme}
      category="Remote Communities"
      headline="Connected, even at the edge of the world."
      subheadline="Hopper brings reliable communication to villages, rural clinics, and off-grid settlements — no towers, no subscriptions, no limits."
      image="/images/ruralareas.jpg"
      imageAlt="Rural community connected by Hopper"
      stats={[
        { value: '200+', label: 'Villages connected' },
        { value: '30–100m', label: 'Per-hop coverage' },
        { value: '0', label: 'Infrastructure required' },
      ]}
      sections={[
        {
          title: 'The Problem',
          body: (
            <p>Hundreds of millions of people live in areas where mobile towers are absent or unreliable. Traditional communication solutions require expensive infrastructure or ongoing data costs that rural communities cannot afford. When emergencies happen, the silence is deadly.</p>
          ),
        },
        {
          title: 'How Hopper Helps',
          body: (
            <>
              <p>Hopper devices form a self-healing mesh network using Bluetooth and Wi-Fi Direct. Each device acts as a relay node — the more Hopper users in an area, the stronger and farther the network reaches.</p>
              <p>Community members can send messages, share files, and coordinate in real time — all without a single byte of mobile data or internet connectivity.</p>
            </>
          ),
        },
        {
          title: 'Key Benefits',
          body: (
            <ul className="list-disc pl-6 flex flex-col gap-2">
              <li>Zero infrastructure cost — works on existing smartphones</li>
              <li>No SIM card or data plan required</li>
              <li>End-to-end encrypted for privacy</li>
              <li>Self-healing network — nodes drop in and out seamlessly</li>
              <li>Works across language barriers with simple, intuitive UI</li>
            </ul>
          ),
        },
        {
          title: 'Real Impact',
          body: (
            <p>"We haven't had reliable signal in years. Hopper connected our whole village in one afternoon." — Amara D., Community leader, Mali</p>
          ),
        },
      ]}
    />
  );
}
