import {NextRequest, NextResponse} from "next/server";

export async function POST(req: NextRequest) {
    return await fetch('http://localhost:8000/api/register', {
        method: 'POST',
        body: await req.text(),
        headers: {
            'Content-Type': 'application/json'
        }
    })
}