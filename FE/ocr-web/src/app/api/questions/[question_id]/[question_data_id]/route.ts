import { NextRequest, NextResponse } from "next/server";
import { cookies } from "next/headers";

export async function GET(req: NextRequest) {
    const urlParts = req.nextUrl.pathname.split('/');
    const questionId = urlParts[urlParts.length - 2];
    const questionDataId = urlParts[urlParts.length - 1];
    return handleGet(req, questionId, questionDataId);
}

export async function PUT(req: NextRequest) {
    const urlParts = req.nextUrl.pathname.split('/');
    const questionId = urlParts[urlParts.length - 2];
    const questionDataId = urlParts[urlParts.length - 1];
    return handlePut(req, questionId, questionDataId);
}

export async function DELETE(req: NextRequest) {
    const urlParts = req.nextUrl.pathname.split('/');
    const questionId = urlParts[urlParts.length - 2];
    const questionDataId = urlParts[urlParts.length - 1];
    return handleDelete(req, questionId, questionDataId);
}


async function handleGet(request: NextRequest, questionId: string, questionDataId: string) {
    const response = await fetch(`${process.env.BACKEND_API_ENDPOINT}/api/questions/${questionId}/${questionDataId}`, {
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

async function handlePut(request: NextRequest, questionId: string, questionDataId: string) {
    const body = await request.json();

    const response = await fetch(`${process.env.BACKEND_API_ENDPOINT}/api/questions/${questionId}/${questionDataId}`, {
        method: 'PUT',
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

async function handleDelete(request: NextRequest, questionId: string, questionDataId: string) {
    const response = await fetch(`${process.env.BACKEND_API_ENDPOINT}/api/questions/${questionId}/${questionDataId}`, {
        method: 'DELETE',
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