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

const Table = () => (
  <div className="overflow-x-auto">
    <table className="w-full text-sm border-collapse">
      <thead>
        <tr className="border-b border-[var(--color-ghost)]">
          <th className="text-left py-3 pr-4 font-semibold text-[var(--color-foreground)] min-w-[140px]">Permission</th>
          <th className="text-left py-3 pr-4 font-semibold text-[var(--color-foreground)] min-w-[100px]">Platform</th>
          <th className="text-left py-3 pr-4 font-semibold text-[var(--color-foreground)]">Purpose</th>
          <th className="text-left py-3 font-semibold text-[var(--color-foreground)] min-w-[100px]">Optional?</th>
        </tr>
      </thead>
      <tbody className="text-[var(--color-muted)] font-light">
        {[
          ['Bluetooth / BLE', 'iOS & Android', 'Discover nearby Hopper users via Bluetooth Low Energy scanning and advertising', 'No — core feature'],
          ['Location (Approximate)', 'Android only', 'Required by Android OS to scan for Bluetooth and Wi-Fi Direct devices. Hopper does not read or store GPS coordinates.', 'No — mandated by Android'],
          ['Local Network', 'iOS only', 'Discover and connect to nearby devices on the same local Wi-Fi segment via MultipeerConnectivity', 'No — core feature'],
          ['Wi-Fi Direct', 'Android only', 'Establish direct device-to-device connections for high-speed P2P data transfer', 'No — core feature'],
          ['Camera', 'iOS & Android', 'Capture photos and videos to attach to messages', 'Yes — only when sharing media'],
          ['Microphone', 'iOS & Android', 'Record voice messages', 'Yes — only when recording audio'],
          ['Notifications', 'iOS & Android', 'Display incoming message notifications; maintain Android foreground service', 'Recommended'],
          ['Storage / Files', 'Android only', 'Read and write media files for sharing in messages', 'Yes — only when sharing files'],
          ['Photo Library', 'iOS only', 'Access saved photos and videos for sharing', 'Yes — only when sharing media'],
        ].map(([perm, platform, purpose, optional]) => (
          <tr key={perm} className="border-b border-[var(--color-ghost)]">
            <td className="py-3 pr-4 font-medium text-[var(--color-foreground)]">{perm}</td>
            <td className="py-3 pr-4">{platform}</td>
            <td className="py-3 pr-4">{purpose}</td>
            <td className="py-3">{optional}</td>
          </tr>
        ))}
      </tbody>
    </table>
  </div>
);

const sections: Section[] = [
  {
    title: 'Introduction',
    body: (
      <>
        <p>Welcome to Hopper. This Privacy Policy explains how Hopper ("we", "us", "our") handles information in connection with your use of the Hopper mobile application ("App") and related services (collectively, the "Service"). Hopper is a decentralized, infrastructure-free peer-to-peer mesh communication platform designed to enable users to communicate without reliance on the internet, cell towers, or cloud servers.</p>
        <p>Our privacy architecture is built on a fundamental principle: your data belongs to you and stays on your device. We do not operate central servers that collect, store, or process your personal messages or communication history.</p>
        <p>By using the Hopper application, you acknowledge and agree to the practices described in this document. This Policy is incorporated by reference into Hopper's Terms of Service.</p>
      </>
    ),
  },
  {
    title: '1. Core Privacy Commitment: No-Server Architecture',
    body: (
      <>
        <Note>Hopper does not have servers. We do not store your messages, contacts, media files, or communication history anywhere outside of your own device. This is not just a policy — it is a technical reality built into how the application works.</Note>
        <p>Most messaging applications route your communications through central servers operated by the company, where data is stored, processed, and potentially accessible to the company and its partners. Hopper fundamentally rejects this model. Our Service is built on:</p>
        <ul className="list-disc pl-6 flex flex-col gap-2">
          <li><strong className="font-medium text-[var(--color-foreground)]">Peer-to-peer (P2P) communication:</strong> All messages travel directly between devices on the local mesh network.</li>
          <li><strong className="font-medium text-[var(--color-foreground)]">Local-only storage:</strong> Your messages, contacts, and media are stored in an encrypted SQLite database on your device and nowhere else.</li>
          <li><strong className="font-medium text-[var(--color-foreground)]">No authentication servers:</strong> Hopper does not require you to create an account with an email or phone number. Your identity on the network is a locally chosen username.</li>
          <li><strong className="font-medium text-[var(--color-foreground)]">No telemetry servers:</strong> We do not collect crash logs, usage analytics, or behavioral data via any remote server.</li>
        </ul>
      </>
    ),
  },
  {
    title: '2. Information We Collect and How',
    body: (
      <>
        <p>Because Hopper operates without central servers, the concept of "data we collect" is substantially different from conventional applications.</p>

        <p><strong className="font-medium text-[var(--color-foreground)]">Username</strong></p>
        <p>When you first launch Hopper, you choose a username (3–12 characters, letters, numbers, and underscores only). This username is stored locally on your device, broadcast over the local mesh network to announce your presence, visible to all nearby Hopper users, and never transmitted to any Hopper server or linked to any real-world identity.</p>

        <p><strong className="font-medium text-[var(--color-foreground)]">Messages and Content</strong></p>
        <p>All messages you send or receive — including text, images, videos, audio recordings, voice messages, documents, reactions, and read receipts — are transmitted directly device-to-device, stored exclusively in a local SQLite database on your device, automatically purged after seven (7) days, permanently deleted when you clear data or uninstall the application, and never transmitted to or accessible by Hopper's infrastructure.</p>

        <p><strong className="font-medium text-[var(--color-foreground)]">Media Files</strong></p>
        <p>Images, videos, audio files, and documents you receive are stored in the application's local documents directory. These files are subject to the same seven-day automatic cleanup cycle and user-initiated deletion.</p>

        <p><strong className="font-medium text-[var(--color-foreground)]">Device Identifiers</strong></p>
        <p>To facilitate device discovery, Hopper reads: on iOS, <code className="text-xs bg-[var(--color-ghost)] px-1.5 py-0.5 rounded">identifierForVendor</code> (reset on app reinstall, not an advertising ID); on Android, <code className="text-xs bg-[var(--color-ghost)] px-1.5 py-0.5 rounded">Android ID</code> (reset on factory reset); and the device model name for display in the nearby users list. These are used exclusively for local peer identification and are never transmitted to Hopper servers.</p>

        <p><strong className="font-medium text-[var(--color-foreground)]">Signal Strength & Proximity Data</strong></p>
        <p>Hopper reads RSSI values from Bluetooth and Wi-Fi connections to estimate proximity of nearby peers. This data is processed entirely on-device, used solely to display proximity indicators, and never transmitted off-device.</p>

        <p><strong className="font-medium text-[var(--color-foreground)]">What We Do NOT Collect</strong></p>
        <ul className="list-disc pl-6 flex flex-col gap-2">
          <li>The content of your messages on any server</li>
          <li>Your GPS location, precise geographic coordinates, or location history</li>
          <li>Your contacts list, phone book, or social graph</li>
          <li>Your real name, email address, phone number, or any government-issued identifier</li>
          <li>Advertising identifiers (IDFA on iOS, GAID on Android)</li>
          <li>Financial information of any kind</li>
          <li>Browsing history or activity outside the Hopper application</li>
          <li>Behavioral analytics or usage patterns on any server</li>
        </ul>
      </>
    ),
  },
  {
    title: '3. Device Permissions',
    body: (
      <>
        <p>Hopper requests the following device permissions. Each permission is strictly necessary for the stated purpose and is not used for any other purpose:</p>
        <Table />
      </>
    ),
  },
  {
    title: '4. Mesh Network Data Routing',
    body: (
      <>
        <p>Hopper's core innovation is its mesh networking capability: messages can be relayed through intermediary devices ("hops") to reach peers that are not in direct range.</p>

        <p><strong className="font-medium text-[var(--color-foreground)]">How Message Routing Works</strong></p>
        <p>When a message cannot reach its intended recipient directly, Hopper may route it through one or more intermediary devices. These devices act as relay nodes, forwarding the message packet without the ability to read its content.</p>

        <p><strong className="font-medium text-[var(--color-foreground)]">Encryption During Transit</strong></p>
        <Note>Hopper is actively developing full end-to-end encryption (E2EE) for all messages in transit. Until E2EE is fully deployed and announced: messages are transmitted as structured data packets over the local mesh network. Intermediary relay nodes process packets at the routing layer only and do not have access to human-readable message content under the current architecture. We are committed to implementing cryptographic E2EE and will update this Policy when that implementation is complete.</Note>

        <p><strong className="font-medium text-[var(--color-foreground)]">Data Retained on Relay Devices</strong></p>
        <p>Intermediary relay devices do NOT permanently store forwarded message content. Message packets are held in memory only for the duration needed to forward them to the next hop. No message data from other users is written to the relay device's local database.</p>

        <p><strong className="font-medium text-[var(--color-foreground)]">Broadcast Messages</strong></p>
        <p>Broadcast messages are transmitted to all nearby connected peers and are visible to all recipients within the mesh. You should not include sensitive personal information in broadcast messages.</p>
      </>
    ),
  },
  {
    title: '5. Local Data Storage',
    body: (
      <>
        <p><strong className="font-medium text-[var(--color-foreground)]">SQLite Database (hopper.db)</strong></p>
        <p>Hopper maintains a local SQLite database with three primary tables:</p>
        <ul className="list-disc pl-6 flex flex-col gap-2">
          <li><strong className="font-medium text-[var(--color-foreground)]">Messages Table:</strong> Message ID, content, sender/recipient identifiers, timestamps, message type, delivery status, hop count, local media file path, read status.</li>
          <li><strong className="font-medium text-[var(--color-foreground)]">Devices Table:</strong> Device ID, device name, connection type, signal strength, last seen timestamp, connection status. Records older than 7 days are automatically deleted.</li>
          <li><strong className="font-medium text-[var(--color-foreground)]">File Transfers Table:</strong> File name, local path, file size, file type, sender/recipient IDs, transfer status, and progress value.</li>
        </ul>

        <p><strong className="font-medium text-[var(--color-foreground)]">Application Preferences</strong></p>
        <p>Stored in SharedPreferences (Android) / NSUserDefaults (iOS): username, showActivityStatus, allowComments, shareUsageData, allowPersonalizedAds (Hopper currently shows no ads), requireBiometric, enable2FA, sendEmailAlerts, and sendPushNotifications.</p>

        <p><strong className="font-medium text-[var(--color-foreground)]">Media Directory</strong></p>
        <p>Received media files are stored in the application documents directory at <code className="text-xs bg-[var(--color-ghost)] px-1.5 py-0.5 rounded">/documents/</code>, accessible only to the Hopper application and deleted on uninstall.</p>

        <p><strong className="font-medium text-[var(--color-foreground)]">Cache</strong></p>
        <p>Hopper uses a local file cache (<code className="text-xs bg-[var(--color-ghost)] px-1.5 py-0.5 rounded">hopper_cache</code>) with a 7-day stale period and a maximum of 1,000 cached objects. The cache can be cleared from Settings.</p>
      </>
    ),
  },
  {
    title: '6. Data Retention & Deletion',
    body: (
      <>
        <p><strong className="font-medium text-[var(--color-foreground)]">Automatic Retention Policy</strong></p>
        <p>All locally stored data — messages, device records, and file transfer records — are automatically deleted after seven (7) days from the date of creation or last activity. This cleanup occurs in the background to manage device storage.</p>

        <p><strong className="font-medium text-[var(--color-foreground)]">User-Initiated Deletion</strong></p>
        <p>You may delete all locally stored data at any time by navigating to Settings &gt; Clear All Data, or by uninstalling the application, which permanently deletes the database, media directory, and all preferences. There is no way for us to recover deleted data, as Hopper does not maintain any remote copies.</p>

        <p><strong className="font-medium text-[var(--color-foreground)]">No Remote Data to Delete</strong></p>
        <p>Because Hopper does not store your personal data on any server, there is no remote data to request deletion of. Your data is always entirely under your control on your device.</p>
      </>
    ),
  },
  {
    title: '7. Security',
    body: (
      <>
        <p><strong className="font-medium text-[var(--color-foreground)]">Current Security Measures</strong></p>
        <ul className="list-disc pl-6 flex flex-col gap-2">
          <li>All data is stored in the application's private storage area, inaccessible to other applications on the device</li>
          <li>On iOS, application data benefits from Apple's built-in device encryption and Secure Enclave protections</li>
          <li>On Android, the application targets a minimum SDK of 21, with application-layer private storage</li>
          <li>Biometric authentication (Face ID, Touch ID, or fingerprint) can be enabled in Settings</li>
          <li>Two-factor authentication (2FA) setting is available in application settings</li>
          <li>Messages in transit use the underlying encryption of the Wi-Fi Direct / MultipeerConnectivity transport layer</li>
        </ul>

        <p><strong className="font-medium text-[var(--color-foreground)]">End-to-End Encryption Roadmap</strong></p>
        <Note>We are committed to implementing full cryptographic end-to-end encryption (E2EE) for all messages transmitted through the Hopper mesh network. This is a stated development priority. When E2EE is implemented, this Privacy Policy will be updated to reflect the technical details of the encryption scheme. Users will be notified via in-app notification and an updated Policy effective date.</Note>

        <p><strong className="font-medium text-[var(--color-foreground)]">Security Limitations</strong></p>
        <ul className="list-disc pl-6 flex flex-col gap-2">
          <li>Physical proximity sharing: Because Hopper broadcasts your username and device ID to all nearby users, anyone running Hopper within range can see your username and that you are present in the area</li>
          <li>Broadcast messages: Messages sent to the broadcast channel are visible to all mesh participants in range</li>
          <li>Device logs: Standard OS crash logs and device analytics (managed by Apple or Google) may capture application errors independent of Hopper's design</li>
        </ul>
      </>
    ),
  },
  {
    title: "8. Children's Privacy",
    body: (
      <>
        <p>Hopper does not knowingly collect personal information from children under the age of 13. The Service is not directed at children under 13. If you are a parent or guardian and believe your child under 13 has used Hopper, please contact us immediately. Because all data is stored locally on the device, the most effective remediation is to clear the application data or uninstall the application.</p>
        <p>Users between the ages of 13 and 17 may use Hopper with parental or guardian consent. We encourage parents and guardians to review these Terms and this Privacy Policy with minors before allowing use.</p>
      </>
    ),
  },
  {
    title: '9. Third-Party Services & SDKs',
    body: (
      <>
        <p>Hopper integrates third-party open-source libraries and platform SDKs to deliver its functionality. While Hopper itself does not transmit data to external servers, some third-party components may have their own data handling behavior under certain conditions.</p>

        <p><strong className="font-medium text-[var(--color-foreground)]">Platform Services</strong></p>
        <ul className="list-disc pl-6 flex flex-col gap-2">
          <li><strong className="font-medium text-[var(--color-foreground)]">Apple MultipeerConnectivity (iOS):</strong> Managed by Apple Inc. Peer-to-peer connections may be subject to Apple's Privacy Policy. No message content is transmitted to Apple servers.</li>
          <li><strong className="font-medium text-[var(--color-foreground)]">Android Wi-Fi Direct:</strong> Managed by Google LLC via the Android platform. Wi-Fi Direct connections are device-to-device and do not route through Google servers.</li>
        </ul>

        <p><strong className="font-medium text-[var(--color-foreground)]">Key Open-Source Libraries</strong></p>
        <ul className="list-disc pl-6 flex flex-col gap-2">
          <li>flutter_local_notifications — displays local notifications on-device, no data transmitted externally</li>
          <li>sqflite — local SQLite database library, all data remains on-device</li>
          <li>flutter_cache_manager — local file caching, cache stored on-device</li>
          <li>flutter_blue_plus — BLE scanning and advertising, operates entirely on-device</li>
          <li>device_info_plus — reads device hardware identifiers locally, not transmitted externally</li>
        </ul>
        <p>We do not integrate advertising SDKs, third-party analytics platforms, or social media SDKs into the Hopper application.</p>
      </>
    ),
  },
  {
    title: '10. Your Privacy Rights',
    body: (
      <>
        <p><strong className="font-medium text-[var(--color-foreground)]">Right to Access</strong></p>
        <p>You have the right to know what personal data Hopper holds about you. Because all data is stored locally on your device, you can access it directly by reviewing your message history within the application.</p>

        <p><strong className="font-medium text-[var(--color-foreground)]">Right to Deletion</strong></p>
        <p>You have the right to delete your personal data at any time by clearing all application data within Settings, or by uninstalling the application. No remote action is required because we hold no remote copies of your data.</p>

        <p><strong className="font-medium text-[var(--color-foreground)]">Right to Portability</strong></p>
        <p>Hopper provides a data export function (available in Settings) that allows you to export your messages and device records as a structured JSON file.</p>

        <p><strong className="font-medium text-[var(--color-foreground)]">EU/EEA Residents — GDPR</strong></p>
        <p>If you are located in the European Economic Area (EEA), you have rights under the GDPR including the right to access, rectify, restrict, port, and delete personal data, as well as the right to object to processing. The legal basis for any processing is your consent (Article 6(1)(a) GDPR) and the performance of our contractual obligations (Article 6(1)(b) GDPR).</p>

        <p><strong className="font-medium text-[var(--color-foreground)]">California Residents — CCPA</strong></p>
        <p>If you are a California resident, the CCPA grants you the right to know what personal information is collected, the right to delete it, and the right to opt out of the sale of personal information. Hopper does not sell personal information to third parties.</p>

        <p><strong className="font-medium text-[var(--color-foreground)]">Exercising Your Rights</strong></p>
        <p>To exercise any of these rights, contact us at <a href="mailto:privacy@hopper.app" className="text-blue-500 hover:underline">privacy@hopper.app</a>. Because Hopper holds no remote data about you, most requests can be fulfilled entirely by you using the in-app data management tools.</p>
      </>
    ),
  },
  {
    title: '11. International Users',
    body: (
      <>
        <p>Hopper is available globally. Because Hopper does not operate central servers and does not transmit personal data to any infrastructure we control, there are no cross-border data transfers associated with using the Service. All data remains on your device in whatever country you are located.</p>
        <p>Users are responsible for complying with local laws and regulations governing the use of peer-to-peer communication tools, encryption, and mesh networking technologies in their jurisdiction.</p>
      </>
    ),
  },
  {
    title: '12. Notifications',
    body: (
      <p>Hopper uses local push notifications to alert you to incoming messages. These notifications are generated and displayed entirely on-device using flutter_local_notifications. Notification content is not transmitted to Apple Push Notification Service (APNs) or Firebase Cloud Messaging (FCM) because Hopper does not use remote push notification infrastructure. On Android, Hopper maintains a low-priority foreground service notification to keep the mesh service alive in the background. This is a system requirement for background Bluetooth/Wi-Fi operations and does not involve data transmission.</p>
    ),
  },
  {
    title: '13. Changes to This Policy',
    body: (
      <>
        <p>We may update this Privacy Policy from time to time to reflect changes in our practices, technology, applicable law, or other factors. When we make material changes, we will:</p>
        <ul className="list-disc pl-6 flex flex-col gap-2">
          <li>Update the "Effective Date" at the top of this document</li>
          <li>Notify users through an in-app alert or announcement where practicable</li>
          <li>Post the updated Policy on our website</li>
        </ul>
        <p>Your continued use of the Service after the updated Policy becomes effective constitutes your acceptance of the revised terms.</p>
      </>
    ),
  },
  {
    title: '14. Contact Us',
    body: (
      <>
        <p>If you have any questions, concerns, or requests regarding this Privacy Policy or our data handling practices, please contact us:</p>
        <div className="mt-4 flex flex-col gap-1">
          <span className="text-[var(--color-muted)]">Privacy Team</span>
          <a href="mailto:privacy@hopper.app" className="text-blue-500 hover:underline">privacy@hopper.app</a>
          <a href="mailto:hello@hopper.app" className="text-blue-500 hover:underline">hello@hopper.app</a>
          <a href="https://hopper.app" className="text-blue-500 hover:underline">hopper.app</a>
        </div>
      </>
    ),
  },
];

// ─── Main Component ───────────────────────────────────────────────────────────

export const PrivacyPage = ({ initialTheme }: { initialTheme: 'dark' | 'light' }) => {
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
        <h1 className="text-5xl md:text-6xl font-semibold tracking-tight mb-6">Privacy Policy</h1>
        <p className="text-[var(--color-muted)] text-lg font-light leading-relaxed max-w-2xl">
          We believe privacy is a fundamental right. Here's exactly what we collect, why, and how we protect it — down to the technical architecture.
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
