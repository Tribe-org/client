import { NextRequest, NextResponse } from 'next/server';

export async function handler(req: NextRequest) {
  const url = new URL(req.url);
  const apiUrl = `${process.env.NEXT_PUBLIC_SERVER_URL}/v1${url.pathname}${url.search}`;

  const requestOptions: RequestInit = {
    method: req.method,
    headers: {
      'Content-Type': 'application/json',
    },
  };

  if (req.method !== 'GET') {
    try {
      const body = await req.json();
      requestOptions.body = JSON.stringify(body);
    } catch (error) {
      return NextResponse.json({ error: 'Invalid JSON body' }, { status: 400 });
    }
  }

  try {
    const response = await fetch(apiUrl, requestOptions);
    const data = await response.json();

    const res = NextResponse.json(data, { status: response.status });
    res.headers.set('Access-Control-Allow-Origin', '*');
    res.headers.set(
      'Access-Control-Allow-Methods',
      'GET, POST, PUT, DELETE, OPTIONS'
    );
    res.headers.set(
      'Access-Control-Allow-Headers',
      'Content-Type, Authorization'
    );

    return res;
  } catch (e) {
    return NextResponse.json(
      { error: 'Client Proxying Error' },
      { status: 400 }
    );
  }
}

// 모든 HTTP 메서드 지원
export {
  handler as GET,
  handler as POST,
  handler as PUT,
  handler as DELETE,
  handler as OPTIONS,
};
