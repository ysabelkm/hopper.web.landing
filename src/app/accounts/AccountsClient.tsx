'use client';

import { useEffect, useState } from 'react';

type Plan = 'monthly' | 'annual';

interface Status {
  hasSubscription: boolean;
  plan: string | null;
  periodEnd: string | null;
  graceUntil: string | null;
  autoRenew: boolean | null;
}

const PRICES: Record<Plan, { label: string; price: string; sub: string }> = {
  annual: { label: 'Annual', price: '₦9,500', sub: '₦792/month · billed yearly' },
  monthly: { label: 'Monthly', price: '₦867', sub: 'billed monthly' },
};

function getDeviceId(): string {
  if (typeof window === 'undefined') return '';
  return new URLSearchParams(window.location.search).get('device_id') ?? '';
}

export function AccountsClient() {
  const [deviceId, setDeviceId] = useState('');
  const [email, setEmail] = useState('');
  const [plan, setPlan] = useState<Plan>('annual');
  const [autoRenew, setAutoRenew] = useState(true);
  const [status, setStatus] = useState<Status | null>(null);
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const [managing, setManaging] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [notice, setNotice] = useState<string | null>(null);

  useEffect(() => {
    const id = getDeviceId();
    setDeviceId(id);
    if (!/^[0-9a-fA-F]{64}$/.test(id)) {
      setLoading(false);
      return;
    }
    fetch(`/api/device-status?device_id=${id}`)
      .then((r) => r.json())
      .then((d) => setStatus(d))
      .catch(() => {})
      .finally(() => setLoading(false));
  }, []);

  const validDevice = /^[0-9a-fA-F]{64}$/.test(deviceId);

  async function subscribe() {
    setError(null);
    if (!/^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(email)) {
      setError('Enter a valid email for your receipt.');
      return;
    }
    setSubmitting(true);
    try {
      const resp = await fetch('/api/create-checkout', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ device_id: deviceId, email, plan, auto_renew: autoRenew }),
      });
      const data = await resp.json();
      if (!resp.ok || !data.checkout_url) {
        setError('Could not start checkout. Please try again.');
        setSubmitting(false);
        return;
      }
      window.location.href = data.checkout_url;
    } catch {
      setError('Network error. Please try again.');
      setSubmitting(false);
    }
  }

  async function toggleAutoRenew() {
    if (!status) return;
    const action = status.autoRenew ? 'disable' : 'enable';
    setManaging(true);
    setError(null);
    setNotice(null);
    try {
      const resp = await fetch('/api/manage-subscription', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ device_id: deviceId, action }),
      });
      const data = await resp.json();
      if (!resp.ok) {
        setError('Could not update auto-renewal. Please try again.');
      } else {
        setStatus({ ...status, autoRenew: data.auto_renew });
        setNotice(
          data.auto_renew
            ? 'Auto-renewal is on. Your subscription will renew automatically.'
            : 'Auto-renewal is off. You keep access until your current period ends.',
        );
      }
    } catch {
      setError('Network error. Please try again.');
    } finally {
      setManaging(false);
    }
  }

  // Missing/invalid device_id → instruct to open from the app.
  if (!loading && !validDevice) {
    return (
      <Shell>
        <h1 className="text-2xl font-bold text-white">Open this from Hopper</h1>
        <p className="mt-3 text-white/60">
          Tap “Subscribe” inside the Hopper app to manage your subscription —
          this page needs to be opened from the app so it knows which device
          you’re on.
        </p>
      </Shell>
    );
  }

  const statusLine = (() => {
    if (!status) return null;
    if (status.hasSubscription && status.periodEnd) {
      return `Your subscription is active until ${new Date(status.periodEnd).toDateString()}.`;
    }
    return 'No active subscription on this device yet.';
  })();

  return (
    <Shell>
      <h1 className="text-2xl font-bold text-white">Unlock Hopper</h1>
      {loading ? (
        <p className="mt-3 text-white/50">Checking your subscription…</p>
      ) : (
        statusLine && <p className="mt-3 text-white/60">{statusLine}</p>
      )}

      {/* Manage panel — only when this device has an active subscription. */}
      {!loading && status?.hasSubscription && (
        <div className="mt-6 rounded-2xl border border-white/12 bg-white/[0.04] p-5">
          <div className="flex items-center justify-between gap-4">
            <div>
              <p className="font-medium text-white">Auto-renewal</p>
              <p className="mt-1 text-sm text-white/50">
                {status.autoRenew
                  ? 'Renews automatically each period.'
                  : 'Will not renew — access ends after the current period.'}
              </p>
            </div>
            <button
              onClick={toggleAutoRenew}
              disabled={managing}
              aria-pressed={!!status.autoRenew}
              className={`relative h-7 w-12 shrink-0 rounded-full transition disabled:opacity-50 ${
                status.autoRenew ? 'bg-emerald-500' : 'bg-white/20'
              }`}
            >
              <span
                className={`absolute top-1 h-5 w-5 rounded-full bg-white transition-all ${
                  status.autoRenew ? 'left-6' : 'left-1'
                }`}
              />
            </button>
          </div>
          {notice && <p className="mt-3 text-sm text-white/60">{notice}</p>}
        </div>
      )}

      <div className="mt-8 space-y-3">
        {(['annual', 'monthly'] as Plan[]).map((p) => {
          const def = PRICES[p];
          const selected = plan === p;
          return (
            <button
              key={p}
              onClick={() => setPlan(p)}
              className={`flex w-full items-center justify-between rounded-2xl border px-5 py-4 text-left transition ${
                selected
                  ? 'border-white/55 bg-white/12'
                  : 'border-white/12 bg-white/[0.04]'
              }`}
            >
              <span>
                <span className="flex items-center gap-2">
                  <span className="font-medium text-white">{def.label}</span>
                  {p === 'annual' && (
                    <span className="rounded-full bg-white/15 px-2 py-0.5 text-[10px] font-bold tracking-wider text-white">
                      POPULAR
                    </span>
                  )}
                </span>
                <span className="mt-1 block text-sm text-white/50">{def.sub}</span>
              </span>
              <span className="text-lg font-medium text-white">{def.price}</span>
            </button>
          );
        })}
      </div>

      <input
        type="email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        placeholder="Email for your receipt"
        className="mt-5 w-full rounded-2xl border border-white/12 bg-white/[0.04] px-5 py-4 text-white placeholder-white/40 outline-none focus:border-white/40"
      />

      <label className="mt-4 flex cursor-pointer items-center gap-3 text-sm text-white/70">
        <input
          type="checkbox"
          checked={autoRenew}
          onChange={(e) => setAutoRenew(e.target.checked)}
          className="h-4 w-4 rounded border-white/30 bg-white/10 accent-emerald-500"
        />
        Automatically renew my subscription (you can turn this off any time)
      </label>

      {error && <p className="mt-3 text-sm text-red-400">{error}</p>}

      <button
        onClick={subscribe}
        disabled={submitting}
        className="mt-6 w-full rounded-2xl bg-white py-4 text-base font-semibold text-black transition disabled:opacity-60"
      >
        {submitting ? 'Starting checkout…' : `Subscribe — ${PRICES[plan].price}`}
      </button>

      <p className="mt-4 text-center text-xs text-white/40">
        Secure payment via Flutterwave. You’ll be redirected to complete checkout.
      </p>
    </Shell>
  );
}

function Shell({ children }: { children: React.ReactNode }) {
  return (
    <main className="flex min-h-screen items-center justify-center bg-[#1C1C1E] px-6">
      <div className="w-full max-w-md py-16">{children}</div>
    </main>
  );
}
