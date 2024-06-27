import { NextRequest, NextResponse } from "next/server";
import { cookies } from "next/headers";

async function handlePost(request: NextRequest, questionId: string) {
    const body = await request.json();

    const response = await fetch(`${process.env.BACKEND_API_ENDPOINT}/api/questions/${questionId}/share`, {
        method: 'POST',
        headers: {
            'Authorization': request.headers.get("Authorization") ?? "Bearer " + (cookies().get('auth_token')?.value ?? ""),
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(body),
    });

    if (!response.ok) {
        return new Response(response.statusText, { status: response.status });
    }

    const data = await response.json();
    return new Response(JSON.stringify(data), {
        headers: {
            'Content-Type': 'application/json',
        },
    });
}

export async function POST(req: NextRequest) {
    const urlParts = req.nextUrl.pathname.split('/');
    const questionId = urlParts[urlParts.length - 2];
    return handlePost(req, questionId);
}
