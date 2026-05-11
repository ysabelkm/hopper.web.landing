import { cookies } from 'next/headers';
import { UseCasePage } from '../../../components/UseCasePage';

export const metadata = {
  title: 'Event Venues - Hopper',
  description: 'How Hopper keeps event staff and attendees connected when cell networks are overwhelmed.',
};

export default async function Page() {
  const initialTheme = (await cookies()).get('hopper-theme')?.value === 'light' ? 'light' : 'dark';

  return (
    <UseCasePage
      initialTheme={initialTheme}
      category="Event Venues"
      headline="Signal-proof gatherings."
      subheadline="When tens of thousands of people converge, cell towers buckle. Event staff, security teams, and attendees use Hopper to communicate reliably — no matter how congested the airwaves get."
      image="/images/festivals.jpg"
      imageAlt="Festival crowd connected through Hopper"
      stats={[
        { value: '500k+', label: 'Event users served' },
        { value: '40k+', label: 'Concurrent users at single events' },
        { value: '0', label: 'Dropped messages in field deployments' },
      ]}
      sections={[
        {
          title: 'The Problem',
          body: (
            <p>Large gatherings — festivals, conferences, sporting events, protests — instantly overwhelm carrier networks. Staff radio systems are expensive to rent, complex to manage, and don't scale with crowd size. When communication fails at a large event, safety and experience suffer.</p>
          ),
        },
        {
          title: 'How Hopper Helps',
          body: (
            <>
              <p>Hopper's mesh network scales with the crowd. The more attendees using Hopper, the stronger and denser the network becomes. Event operations teams can coordinate across the entire venue without relying on a single cell tower or radio channel.</p>
              <p>Security staff, medical teams, vendors, and stage crew all stay in sync — even when every carrier in the area is saturated.</p>
            </>
          ),
        },
        {
          title: 'Key Benefits',
          body: (
            <ul className="list-disc pl-6 flex flex-col gap-2">
              <li>Network gets stronger as attendance grows</li>
              <li>No dependence on carrier infrastructure</li>
              <li>Instant group channels for staff, security, and medical teams</li>
              <li>File and media sharing for real-time situational updates</li>
              <li>Works indoors, outdoors, underground — wherever people are</li>
            </ul>
          ),
        },
        {
          title: 'Real Impact',
          body: (
            <p>"We ran staff comms for 40,000 attendees across a 3-day festival. Zero dropped messages. The carrier networks were completely saturated." — Maya R., Operations Lead, SoundWave Festival</p>
          ),
        },
      ]}
    />
  );
}
