import { NextRequest, NextResponse } from 'next/server';

export async function POST(request: NextRequest) {
  const base = process.env.SUPABASE_URL;
  if (!base) return NextResponse.json({ error: 'server_misconfigured' }, { status: 500 });
  try {
    const body = await request.json();
    const response = await fetch(`${base}/functions/v1/newsletter-subscribe`, {
      method: 'POST',
      headers: { 'content-type': 'application/json' },
      body: JSON.stringify({ email: body.email, company: body.company || '' }),
      cache: 'no-store',
    });
    const data = await response.json();
    return NextResponse.json(data, { status: response.status });
  } catch {
    return NextResponse.json({ error: 'upstream_error' }, { status: 502 });
  }
}
