import {NextRequest} from "next/server";

export async function GET(req: NextRequest) {



    return await fetch(process.env.BACKEND_API_ENDPOINT+'/api/me', {
        method: 'GET',
        headers: {
            'Authorization': req.headers.get("Authorization")??"",
        },
    });
}