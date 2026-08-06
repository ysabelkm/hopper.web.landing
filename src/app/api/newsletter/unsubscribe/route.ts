import { NextRequest, NextResponse } from 'next/server';

export async function GET(request: NextRequest) {
  const base = process.env.SUPABASE_URL;
  const token = request.nextUrl.searchParams.get('token') || '';
  if (!base || !/^[0-9a-f-]{36}$/i.test(token)) return NextResponse.redirect(new URL('/?unsubscribe=invalid', request.url));
  try {
    const response = await fetch(`${base}/functions/v1/newsletter-unsubscribe`, {
      method: 'POST', headers: { 'content-type': 'application/json' }, body: JSON.stringify({ token }), cache: 'no-store',
    });
    return NextResponse.redirect(new URL(response.ok ? '/?unsubscribe=success' : '/?unsubscribe=failed', request.url));
  } catch {
    return NextResponse.redirect(new URL('/?unsubscribe=failed', request.url));
  }
}
