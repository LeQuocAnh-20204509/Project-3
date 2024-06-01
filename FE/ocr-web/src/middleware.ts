import {NextRequest, NextResponse} from "next/server";
import {redirect} from "next/navigation";
function isPublicRoute(path: string) {
    return path.startsWith('/login') || path.startsWith('/signup');
}
export const middleware = (req: NextRequest) => {
    const auth_token = req.cookies.get('auth_token');
    if (!auth_token && !isPublicRoute(req.nextUrl.pathname)) {
        return NextResponse.redirect(new URL('/login', req.url))
    }
}
export const config = {
    matcher: [
        /*
         * Match all request paths except for the ones starting with:
         * - api (API routes)
         * - _next/static (static files)
         * - _next/image (image optimization files)
         * - favicon.ico (favicon file)
         */
        '/((?!api|_next/static|_next/image|favicon.ico).*)',
    ],
}