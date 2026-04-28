export default function NotFound() {
  return (
    <main className="min-h-screen flex items-center justify-center bg-[var(--color-background)] text-[var(--color-foreground)] px-10 text-center">
      <div>
        <h1 className="text-4xl md:text-6xl font-bold tracking-tight mb-4">Page not found</h1>
        <p className="text-[var(--color-muted)] text-lg">The page you’re looking for doesn’t exist.</p>
      </div>
    </main>
  );
}