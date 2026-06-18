export const metadata = { title: 'Checkout cancelled — Hopper' };

export default function CancelPage() {
  return (
    <main className="flex min-h-screen items-center justify-center bg-[#1C1C1E] px-6">
      <div className="w-full max-w-md py-16 text-center">
        <h1 className="text-2xl font-bold text-white">Checkout cancelled</h1>
        <p className="mt-3 text-white/60">
          No charge was made. You can reopen Hopper and try again any time.
        </p>
      </div>
    </main>
  );
}
