export function GET(request: Request) { return Response.redirect(new URL("/ko",request.url),307); }
