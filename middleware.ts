import { getToken } from "next-auth/jwt"
import { NextResponse } from "next/server"
import type { NextFetchEvent, NextRequest } from "next/server"


export async function middleware(req: NextRequest, ev: NextFetchEvent)
{
  const session = await getToken({ req, secret: process.env.SECRET, raw: true })

  if (!req.url.includes("/user") && !session){
    return NextResponse.next()
  }else if(req.url.includes("/user") && !session){
    return NextResponse.redirect(new URL("/login", req.url))
  }else if(req.url.includes("/login") && session){
    return NextResponse.redirect(new URL("/user", req.url))
  }

  // If user is authenticated, continue.
  return NextResponse.rewrite(req.url)
}

export const config = {
  matcher: ['/user','/login'],
}