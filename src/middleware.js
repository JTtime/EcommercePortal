import { NextResponse, NextRequest } from "next/server";


const protectedRoutes = [ '/products-list','/cart','/profile'];
// const user = true

export default function middleware(req) {
    const token = req.cookies.get('token'); 

    console.log('token', token)

    if (!token && protectedRoutes.includes(req.nextUrl.pathname)) {
        const baseURL = new URL('/login', req.nextUrl.origin);
        return NextResponse.redirect(baseURL.toString());
    }

    return NextResponse.next(); 

}