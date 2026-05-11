import { cookies } from 'next/headers';
import { UseCasePage } from '../../../components/UseCasePage';

export const metadata = {
  title: 'Campus Networks - Hopper',
  description: 'How Hopper powers campus-wide mesh networks for schools and universities without costly infrastructure.',
};

export default async function Page() {
  const initialTheme = (await cookies()).get('hopper-theme')?.value === 'light' ? 'light' : 'dark';

  return (
    <UseCasePage
      initialTheme={initialTheme}
      category="Campus Networks"
      headline="Learning without limits."
      subheadline="Schools and universities use Hopper to build campus-wide mesh networks. Students share files, collaborate on projects, and stay connected — no internet subscription required."
      image="/images/campuses.jpg"
      imageAlt="Students connected on a campus mesh network"
      stats={[
        { value: '120+', label: 'Campuses connected' },
        { value: '10k+', label: 'Students on the network' },
        { value: '₦0', label: 'Monthly data cost' },
      ]}
      sections={[
        {
          title: 'The Problem',
          body: (
            <p>Many schools in Africa and beyond struggle with unreliable or unaffordable internet access. Even institutions with some connectivity face dead zones, bandwidth throttling, and service outages that disrupt learning at critical moments.</p>
          ),
        },
        {
          title: 'How Hopper Helps',
          body: (
            <>
              <p>With Hopper installed on student and staff devices, a campus mesh network forms automatically. Lecture notes, assignments, and resources flow freely between devices — no Wi-Fi router or internet connection needed.</p>
              <p>Administrators can broadcast campus-wide announcements, teachers can distribute materials to every student in seconds, and students can collaborate in study groups across dorms and classrooms.</p>
            </>
          ),
        },
        {
          title: 'Key Benefits',
          body: (
            <ul className="list-disc pl-6 flex flex-col gap-2">
              <li>Campus-wide coverage using students' own devices</li>
              <li>Fast file transfer for lecture materials and assignments</li>
              <li>No internet required — works during outages</li>
              <li>Secure, private communication between students and staff</li>
              <li>Zero cost to the institution beyond the app itself</li>
            </ul>
          ),
        },
        {
          title: 'Real Impact',
          body: (
            <p>"Our students can collaborate on projects even when the school's internet goes down, which is often." — Prof. Fatima K., IT Director, University of Nairobi</p>
          ),
        },
      ]}
    />
  );
}
