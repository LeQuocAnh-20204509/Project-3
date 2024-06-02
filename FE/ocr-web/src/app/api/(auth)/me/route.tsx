import {NextRequest} from "next/server";
import {cookies} from "next/headers";

export async function GET(req: NextRequest) {



    return await fetch('http://localhost:8000/api/me', {
        method: 'GET',
        headers: {
            'Authorization': req.headers.get("Authorization")??"",
        },
    });
}