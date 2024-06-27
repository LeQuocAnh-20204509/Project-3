import { NextRequest, NextResponse } from "next/server";
import { cookies } from "next/headers";

async function handleGet(request: NextRequest) {
    const response = await fetch(`${process.env.BACKEND_API_ENDPOINT}/api/dashboard/submission_by_month`, {
        method: 'GET',
        headers: {
            'Authorization': request.headers.get("Authorization") ?? "Bearer " + (cookies().get('auth_token')?.value ?? ""),
        },
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

export async function GET(req: NextRequest) {
    return handleGet(req);
}
