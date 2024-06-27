import { NextRequest, NextResponse } from "next/server";
import { cookies } from "next/headers";

// Helper function to get the image content
async function handleGet(request: NextRequest, postId: number) {
    const response = await fetch(`${process.env.BACKEND_API_ENDPOINT}/api/posts/${postId}/image`, {
        method: 'GET',
        headers: {
            'Authorization': request.headers.get("Authorization") ?? "Bearer " + (cookies().get('auth_token')?.value ?? ""),
        },
    });

    if (!response.ok) {
        return new Response(response.statusText, { status: response.status });
    }

    const blob = await response.blob();
    if (!blob) {
        return new Response("Image not found", { status: 404 });
    }

    return new Response(blob, {
        headers: {
            'Content-Type': blob.type, // Automatically set the correct content type
        },
    });
}

// Helper function to update the image content
async function handlePut(request: NextRequest, postId: number) {
    const formData = new FormData();
    const file = request.body as unknown as Blob; // Assuming the request body contains the file

    if (!file) {
        return new Response("No file provided", { status: 400 });
    }

    formData.append('file', file);

    const response = await fetch(`${process.env.BACKEND_API_ENDPOINT}/api/posts/${postId}/image`, {
        method: 'PUT',
        headers: {
            'Authorization': request.headers.get("Authorization") ?? "Bearer " + (cookies().get('auth_token')?.value ?? ""),
        },
        body: formData,
    });

    if (!response.ok) {
        return new Response(response.statusText, { status: response.status });
    }

    const responseData = await response.json();
    return new Response(JSON.stringify(responseData), {
        headers: {
            'Content-Type': 'application/json',
        },
    });
}

export async function GET(request: NextRequest, { params }: { params: { post_id: string } }) {
    const postId = parseInt(params.post_id);
    if (isNaN(postId)) {
        return new Response("Invalid post_id", { status: 400 });
    }
    return handleGet(request, postId);
}

export async function PUT(request: NextRequest, { params }: { params: { post_id: string } }) {
    const postId = parseInt(params.post_id);
    if (isNaN(postId)) {
        return new Response("Invalid post_id", { status: 400 });
    }
    return handlePut(request, postId);
}
