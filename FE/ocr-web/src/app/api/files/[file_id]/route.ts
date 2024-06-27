import {NextRequest} from "next/server";
import {cookies} from "next/headers";

export async function GET(req: NextRequest) {
    const { searchParams } = req.nextUrl;
    const fileId = req.nextUrl.pathname.split('/').pop(); // Extract the file-id from the URL

    return await fetch(`${process.env.BACKEND_API_ENDPOINT}/api/files/${fileId}?${searchParams}`, {
        method: 'GET',
        headers: {
            'Authorization': req.headers.get("Authorization") ?? "Bearer " + (cookies().get('auth_token')?.value ?? ""),
        },
    });
}

export async function DELETE(req: NextRequest) {
    const fileId = req.nextUrl.pathname.split('/').pop(); // Extract the file-id from the URL

    return await fetch(`${process.env.BACKEND_API_ENDPOINT}/api/files/${fileId}`, {
        method: 'DELETE',
        headers: {
            'Authorization': req.headers.get("Authorization") ?? "Bearer " + (cookies().get('auth_token')?.value ?? ""),
        },
    });
}

export async function PUT(req: NextRequest) {
    const fileId = req.nextUrl.pathname.split('/').pop(); // Extract the file-id from the URL

    // Read the request body
    const body = await req.text();

    // Forward the PUT request to the backend API
    return await fetch(`${process.env.BACKEND_API_ENDPOINT}/api/files/${fileId}`, {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': req.headers.get("Authorization") ?? "Bearer " + (cookies().get('auth_token')?.value ?? ""),
        },
        body: body, // Send the request body
    });
}