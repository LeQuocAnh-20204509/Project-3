import {NextRequest} from "next/server";
import {cookies} from "next/headers";

export async function POST(req: NextRequest) {
    const fileId = req.nextUrl.pathname.split('/').slice(-2)[0]; // Extract the file-id from the URL

    // Read the request body
    const body = await req.text();

    // Forward the POST request to the backend API
    const response = await fetch(`${process.env.BACKEND_API_ENDPOINT}/api/files/${fileId}/generate`, {
        method: 'POST',
        headers: {
            // 'Content-Type': 'application/json',
            'Authorization': req.headers.get("Authorization") ?? "Bearer " + (cookies().get('auth_token')?.value ?? ""),
        },
        // body: body, // Send the request body
    });

    // Check if the response is OK and handle accordingly
    if (!response.ok) {
        // return new Response(response.statusText, { status: response.status });
        return response
    }

    // Return the backend response
    const data = await response.json();
    return new Response(JSON.stringify(data), {
        headers: {
            'Content-Type': 'application/json',
        },
    });
}
