import { cookies } from 'next/headers';
import { UseCasePage } from '../../../components/UseCasePage';

export const metadata = {
  title: 'Field Operations - Hopper',
  description: 'How Hopper keeps humanitarian teams, NGOs, and field workers coordinated in the most disconnected environments.',
};

export default async function Page() {
  const initialTheme = (await cookies()).get('hopper-theme')?.value === 'light' ? 'light' : 'dark';

  return (
    <UseCasePage
      initialTheme={initialTheme}
      category="Field Operations"
      headline="Coordination that works where nothing else does."
      subheadline="Hopper keeps humanitarian teams, medical missions, and disaster-response units in sync — across remote field sites, without satellite uplinks or expensive equipment."
      image="/images/ruralareas.jpg"
      imageAlt="Field workers coordinating with Hopper"
      stats={[
        { value: '80+', label: 'Active NGO missions' },
        { value: '72h+', label: 'Sustained operation in field tests' },
        { value: '100%', label: 'Offline — no internet needed' },
      ]}
      sections={[
        {
          title: 'The Problem',
          body: (
            <p>Field teams operating in disaster zones, remote clinics, or conflict-affected areas face communication blackouts the moment infrastructure fails. Satellite phones are expensive and scarce. Radio systems are complex to deploy. When coordination breaks down, lives are at risk.</p>
          ),
        },
        {
          title: 'How Hopper Helps',
          body: (
            <>
              <p>Hopper creates an instant mesh network the moment two devices are within range. As teams spread across a site, the network extends with them — each device becoming a relay node for others.</p>
              <p>Team leaders can broadcast updates, field units can report status, and medical staff can coordinate handoffs — all in real time, with no external dependency.</p>
            </>
          ),
        },
        {
          title: 'Key Benefits',
          body: (
            <ul className="list-disc pl-6 flex flex-col gap-2">
              <li>Deploys instantly — no configuration or setup required</li>
              <li>Extends range as the team spreads out</li>
              <li>File and document sharing for field reports</li>
              <li>End-to-end encrypted — sensitive mission data stays secure</li>
              <li>Works on standard Android and iOS devices the team already carries</li>
            </ul>
          ),
        },
        {
          title: 'Real Impact',
          body: (
            <p>"During the floods, every other comms system failed within hours. Hopper kept our medical teams coordinated for three days straight." — Dr. Kwame A., Field Director, MedReach International</p>
          ),
        },
      ]}
    />
  );
}
