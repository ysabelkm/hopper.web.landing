export const metadata = { title: 'Payment received — Hopper' };

// Paystack redirects here after a successful checkout. Informational only — the
// webhook (server-to-server) is what actually grants entitlement, so we tell
// the user to reopen the app where it'll update within a few seconds.
export default function SuccessPage() {
  return (
    <main className="flex min-h-screen items-center justify-center bg-[#1C1C1E] px-6">
      <div className="w-full max-w-md py-16 text-center">
        <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-[#0FB981]/20 text-3xl">
          ✓
        </div>
        <h1 className="mt-6 text-2xl font-bold text-white">Payment received</h1>
        <p className="mt-3 text-white/60">
          Thanks for subscribing to Hopper. Reopen the app — your subscription
          will activate within a few seconds.
        </p>
      </div>
    </main>
  );
}
