import { NextRequest, NextResponse } from 'next/server';

export function middleware(request: NextRequest) {
  const token = request.cookies.get('token')?.value;

  if (!token) {
    return NextResponse.redirect(new URL('/login', request.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    /*
      Mọi route trừ:
      - /login
      - /register
      - /api (API route)
      - file tĩnh: favicon, _next, static, images, v.v.
    */
    '/((?!api|_next/static|_next/image|favicon.ico|login|register).*)',
  ],
};


export async function login(request: Request) {
  const response = NextResponse.redirect(new URL('/', request.url));

  response.cookies.set({
    name: 'token',
    value: 'your_jwt_token',
    httpOnly: true,
    secure: true,
    sameSite: 'lax',
    path: '/',
  });

  return response;
}

