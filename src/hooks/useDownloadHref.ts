"use client";

import { useEffect, useState } from 'react';
import { APP_STORE_URL, DOWNLOAD_ANCHOR, PLAY_STORE_URL } from '../lib/links';

/**
 * The best target for a single "Download" button: Apple devices (iPhone, iPad
 * and Mac, whose owners almost always carry an iPhone) get the App Store,
 * Android gets Google Play, and anything else (Windows, Linux) gets the
 * footer's QR code and both store buttons. Starts on the anchor so the server
 * render and first client render match.
 */
export function useDownloadHref() {
  const [href, setHref] = useState(DOWNLOAD_ANCHOR);

  useEffect(() => {
    const ua = navigator.userAgent;
    // Android first: some Android browsers' desktop mode claims to be a Mac.
    if (/Android/.test(ua)) setHref(PLAY_STORE_URL);
    else if (/iPhone|iPad|iPod|Macintosh/.test(ua)) setHref(APP_STORE_URL);
  }, []);

  return href;
}

/** Store links open in a new tab; the in-page anchor doesn't. */
export const externalProps = (href: string) =>
  href.startsWith('http') ? { target: '_blank', rel: 'noopener noreferrer' } : {};
