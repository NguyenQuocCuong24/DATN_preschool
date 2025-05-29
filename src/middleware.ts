import { jwtDecode } from 'jwt-decode';
import { NextRequest, NextResponse } from 'next/server';
import { CUSTOMER_TYPE } from './utils/config';

const urls = [
  ''
  // '/student',
  // '/teacher',
  // '/attendance'
]

export function middleware(request: NextRequest) {
  const token = request.cookies.get('token')?.value;

  if (!token) {
    return NextResponse.redirect(new URL('/login', request.url));
  }

  try {
    const decoded = jwtDecode(token);
    
    const pathname = request.nextUrl.pathname;

    if (decoded.customerType !== CUSTOMER_TYPE.ADMIN) {
      if(urls.includes(pathname)){
        return NextResponse.redirect(new URL('/forbiden', request.url));
      }
    }

    return NextResponse.next();
  } catch (err) {
    console.log(err);
    
    return NextResponse.redirect(new URL('/login', request.url));
  }

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
    '/((?!api|_next/static|_next/image|favicon.ico|login|register|forbiden|).*)',
  ],
};

