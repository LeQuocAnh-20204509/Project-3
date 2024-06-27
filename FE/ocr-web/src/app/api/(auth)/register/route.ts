import {NextRequest, NextResponse} from "next/server";

export async function POST(req: NextRequest) {
    return await fetch(process.env.BACKEND_API_ENDPOINT+'/api/register', {
        method: 'POST',
        body: await req.text(),
        headers: {
            'Content-Type': 'application/json'
        }
    })
}