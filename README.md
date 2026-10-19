<div align="center">
  <img src="public/hopper_logo_black.png" alt="Hopper" height="44" />
  <p><strong>Connects communities, one hop at a time.</strong></p>
  <p>
    <a href="https://testflight.apple.com/join/zENrqBdh">Try the iOS beta on TestFlight</a>
    ·
    <a href="https://www.linkedin.com/company/hopperafrica">LinkedIn</a>
  </p>
</div>

# Hopper — website

Hopper is an offline mesh messenger. Your message hops from phone to phone over Bluetooth LE and
Wi-Fi Direct until it reaches the person you're talking to — no SIM, no Wi-Fi, no cell towers. It's
built for the places networks don't reach or can't cope: rural communities, campuses, field
operations, festivals and emergencies.

- **Phone to phone.** Devices discover each other nearby and relay messages for one another, with a
  hop budget of 7 (16 in Large Venue Mode).
- **Private by design.** Every message is end-to-end encrypted with a Noise XX handshake before it
  leaves the phone, so relays only ever carry ciphertext. There is no server and no message log.
- **No identity on the mesh.** No phone number or sign-up to join; keys are generated on the device.

Messaging is available on iOS and Android. Reading the mesh and sending broadcasts is free;
a subscription (₦867/month or ₦9,500/year) unlocks one-on-one messaging, file transfer, broadcast
media, Large Venue Mode and priority relay.

This repository is the marketing site and subscription portal for Hopper, by Hopper Africa. The
mobile app lives in its own repository.

## What's in the site

| Route                                       | What it is                                                          |
| ------------------------------------------- | ------------------------------------------------------------------- |
| `/`                                         | Landing page: mesh hero, use cases, demo video, pricing             |
| `/how-it-works`                             | The five steps a message takes, demo video, privacy guarantees      |
| `/pricing`                                  | Monthly / yearly plans, Free vs Premium, FAQ                        |
| `/blog`                                     | Blog index (placeholder posts until a CMS is connected)             |
| `/about`, `/team`, `/manifesto`, `/careers` | Company pages                                                       |
| `/support`                                  | Help centre: FAQ, setup guide, contact                              |
| `/use-cases/*`                              | Remote communities, campus networks, event venues, field operations |
| `/terms`, `/privacy`                        | Legal                                                               |
| `/accounts`                                 | Check a device's subscription, start checkout, manage or cancel     |

## Tech stack

- [Next.js 15](https://nextjs.org) (App Router) with React 19 and TypeScript
- [Tailwind CSS v4](https://tailwindcss.com) with design tokens as CSS variables in `src/index.css`
- [Motion](https://motion.dev) for animation; a canvas mesh animation in `src/hooks/useMeshCanvas.ts`
- Payments through Flutterwave and subscription state in Supabase, both reached only through
  server-side API routes

## Getting started

**Prerequisites:** Node.js 20 or newer.

```bash
npm install
cp .env.example .env.local   # then fill in the values below
npm run dev                  # http://localhost:3000
```

The marketing pages work without any environment variables. The newsletter form, `/accounts` and
checkout need the Supabase settings.

| Variable              | Used for                                                                                                  |
| --------------------- | --------------------------------------------------------------------------------------------------------- |
| `SUPABASE_URL`        | Base URL of the Supabase project, e.g. `https://<ref>.supabase.co` (no `/functions/v1`)                   |
| `HOPPER_PROXY_SECRET` | Shared secret that authenticates this site to the Supabase Edge Functions; must match the value set there |

Both are server-side only and are never sent to the browser.

### Scripts

| Command         | Does                                    |
| --------------- | --------------------------------------- |
| `npm run dev`   | Start the dev server on port 3000       |
| `npm run build` | Production build                        |
| `npm start`     | Serve the production build on port 3000 |
| `npm run lint`  | Type-check with `tsc --noEmit`          |
| `npm run clean` | Delete `.next`                          |

Run only one dev server per checkout, and stop it before `npm run build`. They share the `.next`
folder and will serve mismatched bundles (hydration errors) if run together.

## Project structure

```
src/
  app/                 Routes (App Router) and API routes
    api/               Server-side proxies to Supabase Edge Functions
  components/          Page components and shared sections
    ui/                Small building blocks: Pill, Card, SectionHeader, FaqList, StoreBadges…
    PageShell.tsx      Theme + navbar + footer wrapper for a page
    PageHero.tsx       Centred mesh hero used by the secondary pages
  hooks/               useTheme, useMeshCanvas
  lib/                 Theme cookie helper, shared links (TestFlight URL)
  index.css            Design tokens (light/dark), keyframes, the .hop-pill highlight
public/                Images, app mockups, logos, demo video
```

## How things work

- **Theme.** Light is the default. The choice is stored in the `hopper-theme` cookie so the server
  renders the right theme on the first paint (`src/lib/theme.ts`), and `useTheme` keeps the
  `light`/`dark` class on `<html>` in sync. All colours come from the tokens in `src/index.css`.
- **API routes.** `create-checkout`, `manage-subscription`, `device-status` and `newsletter/*`
  forward requests to Supabase Edge Functions. The browser never talks to Supabase or Flutterwave
  directly, and card details never reach this site.
- **Demo video.** Served from `public/how-it-works.mp4` with a poster image, and it only downloads
  when someone presses play. The source is `src/components/DemoVideo.tsx`. Keep the file small
  (H.264 MP4, ideally under ~15 MB); large uploads can time out when pushing over HTTPS.

## Deployment

The site is built to deploy on Vercel. Set `SUPABASE_URL` and `HOPPER_PROXY_SECRET` in the project's
environment variables (server-side only), then deploy `main`.

## Contact

Questions or support: [support@hopperafrica.com](mailto:support@hopperafrica.com)

© 2026 HopperAfrica by KambiliTech. All rights reserved.
