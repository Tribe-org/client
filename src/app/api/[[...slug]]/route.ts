/* eslint-disable @typescript-eslint/no-explicit-any */
import { NextRequest, NextResponse } from 'next/server';

const SERVER_URL = process.env.NEXT_PUBLIC_SERVER_URL;
const SERVER_VERSION = process.env.NEXT_PUBLIC_SERVER_VERSION;
const SERVER_STAGE =
  process.env.NEXT_PUBLIC_SERVER_STAGE !== 'prod'
    ? process.env.NEXT_PUBLIC_SERVER_STAGE
    : '';

export async function GET(
  req: NextRequest,
  { params }: { params: Promise<{ slug: string }> }
) {
  const { search } = req.nextUrl;

  const slugs = [(await params).slug].flat();
  const pathname = '/' + [SERVER_STAGE, SERVER_VERSION, ...slugs].join('/');

  const apiUrl = `${SERVER_URL}${pathname}${search}`;

  const requestOptions: Record<string, any> = {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
    },
    redirect: 'manual', // 자동 리디렉션 방지
  };

  try {
    const response = await fetch(apiUrl, requestOptions);

    // 307 리디렉션 감지
    if (
      response.status === 307 ||
      response.status === 302 ||
      response.status === 301
    ) {
      const redirectUrl = response.headers.get('Location');
      if (redirectUrl) {
        return NextResponse.redirect(redirectUrl, response.status);
      }
    }

    const contentType = response.headers.get('content-type') || '';

    if (contentType.includes('application/json')) {
      const data = await response.json();
      return NextResponse.json(data, { status: response.status });
    }

    const textData = await response.text();
    return NextResponse.json(
      { error: 'Received non-JSON response', details: textData },
      { status: 400 }
    );
  } catch (error) {
    return NextResponse.json(
      { error: 'Client Proxying Error', details: error },
      { status: 400 }
    );
  }
}
