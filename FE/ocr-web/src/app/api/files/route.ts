import {NextRequest} from "next/server";
import {cookies} from "next/headers";

export async function GET(req: NextRequest) {

    const searchParams = req.nextUrl.searchParams.toString()
    return await fetch(process.env.BACKEND_API_ENDPOINT+'/api/files'+`?${searchParams}`, {
        method: 'GET',
        headers: {
            'Authorization':  req.headers.get("Authorization")??"Bearer "+ cookies().get('auth_token')?.value?? "",
        },
    });
}