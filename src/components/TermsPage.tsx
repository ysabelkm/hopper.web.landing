"use client";

import { useState, useEffect } from 'react';
import { Footer } from './Footer';
import { TopScrollProgress } from './TopScrollProgress';
import { Navbar } from './Navbar';

// ─── Section ─────────────────────────────────────────────────────────────────

type Section = { title: string; body: React.ReactNode };

const Note = ({ children }: { children: React.ReactNode }) => (
  <div className="border-l-2 border-blue-500/40 pl-4 italic text-[var(--color-faint)]">{children}</div>
);

const sections: Section[] = [
  {
    title: 'Agreement to Terms',
    body: (
      <>
        <p>These Terms of Service ("Terms", "Agreement") constitute a legally binding agreement between you ("User", "you", "your") and the Hopper development team ("Hopper", "we", "us", "our") governing your access to and use of the Hopper mobile application ("App"), website, and all related services (collectively, the "Service").</p>
        <p>By downloading, installing, accessing, or using the Hopper application on any device, you acknowledge that you have read, understood, and agree to be bound by these Terms in their entirety. If you do not agree to these Terms, you must immediately cease use of the Service and uninstall the application.</p>
        <p>If you are using Hopper on behalf of an organization, school, employer, or other legal entity, you represent that you have the authority to bind that entity to these Terms, and "you" shall refer to both you as an individual and that entity.</p>
      </>
    ),
  },
  {
    title: '1. Description of Service',
    body: (
      <>
        <p>Hopper is a decentralized, infrastructure-free peer-to-peer communication application. Unlike conventional messaging services that rely on central servers, cloud infrastructure, or internet connectivity, Hopper operates using device-to-device ("mesh") networking technology via:</p>
        <ul className="list-disc pl-6 flex flex-col gap-2">
          <li><strong className="font-medium text-[var(--color-foreground)]">Wi-Fi Direct (Android):</strong> Direct device-to-device Wi-Fi connections enabling high-throughput local data transfer without internet access.</li>
          <li><strong className="font-medium text-[var(--color-foreground)]">Apple MultipeerConnectivity (iOS):</strong> Apple's native peer-to-peer framework leveraging Wi-Fi and Bluetooth for local device discovery and communication.</li>
          <li><strong className="font-medium text-[var(--color-foreground)]">Bluetooth Low Energy (BLE):</strong> Low-power Bluetooth scanning and peripheral broadcasting used for device discovery and signal proximity estimation.</li>
        </ul>
        <p>Through the mesh network, Hopper supports: Direct Messaging, Broadcast Messaging, Media Sharing, Voice Messages, Message Reactions, Reply Threading, Read Receipts, Delivery Status, and Hop-Based Routing.</p>
        <Note>Hopper is NOT an internet-based service and does NOT connect to any central server or cloud infrastructure. All communication is local, device-to-device, and dependent on physical proximity and network density.</Note>
      </>
    ),
  },
  {
    title: '2. Eligibility & Account Registration',
    body: (
      <>
        <p><strong className="font-medium text-[var(--color-foreground)]">Minimum Age:</strong> You must be at least 13 years of age to use Hopper. If you are between 13 and 17, a parent or legal guardian must have reviewed and agreed to these Terms on your behalf. We do not knowingly collect information from children under 13.</p>
        <p><strong className="font-medium text-[var(--color-foreground)]">Username Registration:</strong> Hopper does not require an email address, phone number, or password. You create a local username that must be 3–12 characters (letters, numbers, underscores only), is stored exclusively on your device, and is visible to all Hopper users within your active mesh network.</p>
        <p><strong className="font-medium text-[var(--color-foreground)]">No Central Account:</strong> Because Hopper operates without central servers, there is no account database, password recovery, or remote account management. All user data exists solely on your device. Uninstalling the application permanently deletes all locally stored data with no possibility of recovery.</p>
      </>
    ),
  },
  {
    title: '3. Acceptable Use Policy',
    body: (
      <>
        <p>You agree to use Hopper solely for lawful, ethical, and legitimate communication purposes. You explicitly agree NOT to:</p>
        <p><strong className="font-medium text-[var(--color-foreground)]">Prohibited Content:</strong></p>
        <ul className="list-disc pl-6 flex flex-col gap-2">
          <li>Transmit content that is unlawful, harmful, harassing, abusive, threatening, defamatory, obscene, or pornographic</li>
          <li>Share child sexual abuse material (CSAM) or any content that sexually exploits or endangers minors</li>
          <li>Transmit hate speech, incitement to violence, or content promoting discrimination based on race, gender, religion, nationality, sexual orientation, disability, or any other protected characteristic</li>
          <li>Disseminate false, misleading, or fraudulent information, particularly during emergencies</li>
          <li>Impersonate any person, organization, government body, or emergency services</li>
        </ul>
        <p><strong className="font-medium text-[var(--color-foreground)]">Prohibited Technical Conduct:</strong></p>
        <ul className="list-disc pl-6 flex flex-col gap-2">
          <li>Transmit, propagate, or relay malicious code, viruses, ransomware, spyware, or any other malicious software</li>
          <li>Attempt to intercept, access, decode, or tamper with messages intended for other users</li>
          <li>Reverse-engineer, decompile, or disassemble the application, except as expressly permitted by applicable law</li>
          <li>Use automated scripts or bots to artificially generate or relay messages</li>
          <li>Attempt to overload, disrupt, or degrade mesh network performance through denial-of-service type actions</li>
          <li>Probe or scan the vulnerability of the application without prior written authorization from Hopper</li>
        </ul>
        <Note>CRITICAL: Hopper is NOT a substitute for official emergency services. In any life-threatening emergency, contact your local emergency services immediately (e.g., 911 in the US, 112 in the EU, 999 in the UK). Hopper cannot guarantee message delivery and must never be relied upon as the sole means of emergency communication.</Note>
      </>
    ),
  },
  {
    title: '4. Device Permissions',
    body: (
      <>
        <p>Hopper requires access to certain hardware capabilities and device permissions to function. You expressly consent to the following when using the Service:</p>
        <ul className="list-disc pl-6 flex flex-col gap-2">
          <li><strong className="font-medium text-[var(--color-foreground)]">Bluetooth & BLE:</strong> Required for device discovery, proximity estimation, and peer-to-peer connectivity.</li>
          <li><strong className="font-medium text-[var(--color-foreground)]">Location (Precise / Approximate):</strong> Required on Android to scan for nearby Wi-Fi networks and Bluetooth devices. Hopper does NOT track your GPS location or transmit location data to any server.</li>
          <li><strong className="font-medium text-[var(--color-foreground)]">Local Network Access:</strong> Required on iOS to discover and communicate with nearby devices.</li>
          <li><strong className="font-medium text-[var(--color-foreground)]">Wi-Fi Direct:</strong> Required on Android for direct device-to-device connections.</li>
          <li><strong className="font-medium text-[var(--color-foreground)]">Notifications:</strong> Required for incoming message alerts and background mesh service.</li>
          <li><strong className="font-medium text-[var(--color-foreground)]">Camera & Microphone:</strong> Required for capturing photos, videos, and voice messages.</li>
          <li><strong className="font-medium text-[var(--color-foreground)]">Storage / Files:</strong> Required to save, access, and share media attachments.</li>
        </ul>
        <p>Platform requirements: iOS 14.0+ with MultipeerConnectivity support; Android 5.0 (API Level 21)+ with Wi-Fi Direct capability.</p>
      </>
    ),
  },
  {
    title: '5. Data Handling & Local Storage',
    body: (
      <>
        <p>Because Hopper operates without cloud infrastructure, all data is processed and stored locally on your device. The following data types are stored in the application's local SQLite database:</p>
        <ul className="list-disc pl-6 flex flex-col gap-2">
          <li><strong className="font-medium text-[var(--color-foreground)]">Messages:</strong> All sent and received messages including content, sender/recipient identifiers, timestamps, message types, hop counts, delivery status, and read receipts.</li>
          <li><strong className="font-medium text-[var(--color-foreground)]">Media Files:</strong> Images, videos, audio recordings, and documents stored in the application's local documents directory.</li>
          <li><strong className="font-medium text-[var(--color-foreground)]">Device Records:</strong> Identifiers, usernames, signal strength readings, and connection metadata for previously discovered mesh peers.</li>
          <li><strong className="font-medium text-[var(--color-foreground)]">File Transfer Records:</strong> Metadata about in-progress and completed file transfers.</li>
        </ul>
        <p>All locally stored data is automatically purged after seven (7) days of inactivity. You may manually clear all stored data at any time through Settings. Uninstalling the application permanently destroys all local data.</p>
      </>
    ),
  },
  {
    title: '6. Intellectual Property',
    body: (
      <>
        <p>The Hopper application, including its source code, design, user interface, logos, trademarks, icons, graphics, documentation, and underlying technology, is the exclusive intellectual property of the Hopper development team and is protected by applicable copyright, trademark, and intellectual property laws.</p>
        <p>Subject to your compliance with these Terms, Hopper grants you a limited, non-exclusive, non-transferable, non-sublicensable, revocable license to download and use the application on devices you own or control, solely for personal, non-commercial communication purposes.</p>
        <p>You retain full ownership of all content you create and transmit through Hopper. Because Hopper does not operate central servers, we do not claim any license, rights, or interest in your content. You are solely responsible for the legality, accuracy, and appropriateness of all content you transmit.</p>
      </>
    ),
  },
  {
    title: '7. Message Delivery & Network Reliability',
    body: (
      <>
        <p>Given the inherently decentralized and infrastructure-free nature of Hopper's mesh network, Hopper makes no guarantees regarding:</p>
        <ul className="list-disc pl-6 flex flex-col gap-2">
          <li>Message delivery, timeliness, or completeness</li>
          <li>The availability of the mesh network in any given location or under any given conditions</li>
          <li>Message routing through intermediary ("hop") devices, which depends on physical proximity and the density of active Hopper users in the vicinity</li>
          <li>The security of messages during transit through intermediary nodes prior to full end-to-end encryption implementation</li>
        </ul>
        <Note>Hopper is actively developing end-to-end encryption (E2EE) for all messages. Until E2EE is fully implemented and announced, messages relayed through intermediary nodes are transmitted as encrypted packets that intermediary devices cannot read, but the encryption layer is subject to ongoing development.</Note>
      </>
    ),
  },
  {
    title: '8. Disclaimers & Limitation of Liability',
    body: (
      <>
        <p>THE HOPPER SERVICE IS PROVIDED "AS IS" AND "AS AVAILABLE," WITHOUT ANY WARRANTY OF ANY KIND, EXPRESS OR IMPLIED. TO THE FULLEST EXTENT PERMITTED BY APPLICABLE LAW, HOPPER DISCLAIMS ALL WARRANTIES INCLUDING IMPLIED WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE, AND NON-INFRINGEMENT.</p>
        <p>HOPPER SHALL NOT BE LIABLE FOR ANY DIRECT, INDIRECT, INCIDENTAL, SPECIAL, CONSEQUENTIAL, PUNITIVE, OR EXEMPLARY DAMAGES ARISING FROM: (A) UNDELIVERED, DELAYED, OR LOST MESSAGES; (B) YOUR USE OF OR INABILITY TO USE THE SERVICE; (C) UNAUTHORIZED ACCESS TO YOUR TRANSMISSIONS; (D) CONTENT TRANSMITTED BY OTHER USERS; OR (E) ANY OTHER MATTER RELATED TO THE SERVICE.</p>
        <p>HOPPER EXPRESSLY DISCLAIMS ALL LIABILITY FOR ANY HARM, INJURY, DEATH, OR DAMAGES ARISING FROM RELIANCE ON THE SERVICE IN EMERGENCY SITUATIONS. HOPPER IS A SUPPLEMENTAL COMMUNICATION TOOL AND IS NOT DESIGNED OR CERTIFIED FOR USE IN LIFE-CRITICAL APPLICATIONS.</p>
      </>
    ),
  },
  {
    title: '9. Indemnification',
    body: (
      <p>You agree to indemnify, defend, and hold harmless Hopper and its officers, directors, employees, developers, affiliates, and successors from and against any and all claims, liabilities, damages, losses, costs, and expenses (including reasonable legal fees) arising out of or relating to: (a) your use of or access to the Service; (b) your violation of these Terms; (c) your violation of any applicable law or regulation; (d) your User Content; or (e) your infringement of any third-party intellectual property or other rights.</p>
    ),
  },
  {
    title: '10. Privacy & Data Protection',
    body: (
      <>
        <p>Your use of Hopper is also governed by our <a href="/privacy" className="text-blue-500 hover:underline">Privacy Policy</a>, incorporated into these Terms by reference. Key privacy principles embedded in Hopper's design include:</p>
        <ul className="list-disc pl-6 flex flex-col gap-2">
          <li>No central data collection — we do not collect, store, or process your messages on any server</li>
          <li>Local-first architecture — all personal data remains on your device unless explicitly shared by you</li>
          <li>Minimal permissions — we only request device permissions strictly necessary for core mesh networking functionality</li>
          <li>User control — you can clear all local data at any time from within the application</li>
        </ul>
      </>
    ),
  },
  {
    title: '11. Modifications to Service & Terms',
    body: (
      <p>Hopper reserves the right to modify, suspend, or discontinue any aspect of the Service at any time, with or without notice. We also reserve the right to update these Terms at any time. When we make material changes, we will update the effective date at the top of this document and, where practicable, notify users through the application. Your continued use of the Service after any modifications constitutes your acceptance of the updated Terms.</p>
    ),
  },
  {
    title: '12. Termination',
    body: (
      <p>Hopper reserves the right to restrict, suspend, or terminate your access to the Service at any time, with or without cause and without notice, if we reasonably believe you have violated these Terms or applicable law. You may stop using the Service at any time by uninstalling the application. Upon uninstallation, all locally stored data will be permanently deleted from your device.</p>
    ),
  },
  {
    title: '13. Third-Party Services & Open Source',
    body: (
      <>
        <p>Hopper incorporates a number of open-source libraries and third-party components whose use may be subject to additional license terms. Key frameworks include:</p>
        <ul className="list-disc pl-6 flex flex-col gap-2">
          <li>Flutter & Dart SDK — Google LLC (BSD License)</li>
          <li>flutter_blue_plus — BLE scanning and peripheral management</li>
          <li>sqflite — Local SQLite database</li>
          <li>flutter_local_notifications — Push notification delivery</li>
          <li>permission_handler — Runtime permission management</li>
          <li>Apple MultipeerConnectivity — Apple Inc. (iOS only, Apple SDK License)</li>
        </ul>
        <p>Hopper does not endorse and is not responsible for the practices or content of any third-party services, applications, or websites that may be linked to or integrated with the Service.</p>
      </>
    ),
  },
  {
    title: '14. Governing Law & Dispute Resolution',
    body: (
      <p>These Terms shall be governed by and construed in accordance with applicable laws, without regard to conflict of law principles. Any dispute arising out of or relating to these Terms shall first be attempted to be resolved through good-faith negotiation. If unresolved, it shall be submitted to binding arbitration in accordance with standard commercial arbitration rules. Each party shall bear its own legal costs, and the arbitral award shall be final and binding. Nothing in this clause prevents either party from seeking emergency injunctive or equitable relief from a court of competent jurisdiction.</p>
    ),
  },
  {
    title: '15. Export Controls',
    body: (
      <p>Hopper uses peer-to-peer networking and encryption technologies that may be subject to export control laws and regulations in certain jurisdictions. You agree not to export, re-export, or transfer the Hopper application or its underlying technology in violation of applicable export control laws, including U.S. Export Administration Regulations (EAR) and OFAC sanctions lists. You represent that you are not located in, under the control of, or a national or resident of any country subject to a comprehensive U.S. government embargo.</p>
    ),
  },
  {
    title: '16. Severability & Entire Agreement',
    body: (
      <>
        <p>If any provision of these Terms is found to be invalid, illegal, or unenforceable, that provision shall be modified to the minimum extent necessary to make it enforceable, and the remaining provisions shall continue in full force and effect.</p>
        <p>These Terms, together with Hopper's Privacy Policy and any other policies incorporated by reference, constitute the entire agreement between you and Hopper with respect to the Service and supersede all prior understandings, agreements, representations, or warranties relating to the Service.</p>
      </>
    ),
  },
  {
    title: '17. Contact',
    body: (
      <>
        <p>If you have any questions, concerns, or feedback regarding these Terms or the Hopper application, please contact us:</p>
        <div className="mt-4 flex flex-col gap-1">
          <a href="mailto:legal@hopper.app" className="text-blue-500 hover:underline">legal@hopper.app</a>
          <a href="https://hopper.app" className="text-blue-500 hover:underline">hopper.app</a>
          <a href="/privacy" className="text-blue-500 hover:underline">Privacy Policy</a>
        </div>
      </>
    ),
  },
];

// ─── Main Component ───────────────────────────────────────────────────────────

export const TermsPage = ({ initialTheme }: { initialTheme: 'dark' | 'light' }) => {
  const [theme, setTheme] = useState<'dark' | 'light'>(initialTheme);

  useEffect(() => {
    const root = document.documentElement;
    if (theme === 'light') root.classList.add('light');
    else root.classList.remove('light');
    document.cookie = `hopper-theme=${theme};path=/;max-age=31536000`;
  }, [theme]);

  const toggleTheme = () => setTheme(t => t === 'dark' ? 'light' : 'dark');

  const divider = theme === 'dark' ? 'border-white/8' : 'border-black/8';

  return (
    <div className="min-h-screen bg-[var(--color-background)] text-[var(--color-foreground)]">
      <TopScrollProgress />
      <Navbar theme={theme} toggleTheme={toggleTheme} />

      {/* Hero */}
      <section className="pt-40 pb-20 px-6 md:px-8 lg:px-12 max-w-7xl mx-auto">
        <p className="text-[11px] uppercase tracking-[0.25em] text-[var(--color-faint)] mb-4">Legal</p>
        <h1 className="text-5xl md:text-6xl font-semibold tracking-tight mb-6">Terms of Service</h1>
        <p className="text-[var(--color-muted)] text-lg font-light leading-relaxed max-w-2xl">
          Please read these terms carefully before using the Hopper app. They constitute a legally binding agreement governing your use of our services.
        </p>
        <p className="text-[var(--color-faint)] text-sm mt-6">Effective Date: May 11, 2026 · Version 1.0</p>
      </section>

      {/* Content */}
      <section className="px-6 md:px-8 lg:px-12 max-w-7xl mx-auto pb-32">
        <div className={`border-t ${divider} flex flex-col divide-y divide-[var(--color-ghost)]`}>
          {sections.map((sec) => (
            <div key={sec.title} className="py-12 grid md:grid-cols-[200px_1fr] gap-12">
              <h2 className="text-[15px] font-semibold text-[var(--color-foreground)] leading-snug">{sec.title}</h2>
              <div className="flex flex-col gap-4 text-[var(--color-muted)] text-sm font-light leading-relaxed">
                {sec.body}
              </div>
            </div>
          ))}
        </div>
      </section>

      <Footer theme={theme} />
    </div>
  );
};
