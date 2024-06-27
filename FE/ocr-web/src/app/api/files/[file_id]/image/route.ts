import {NextRequest} from "next/server";
import {cookies} from "next/headers";

export async function GET(req: NextRequest) {
    const fileId = req.nextUrl.pathname.split('/').slice(-2)[0]; // Extract the file-id from the URL

    // Forward the GET request to the backend API
    const response = await fetch(`${process.env.BACKEND_API_ENDPOINT}/api/files/${fileId}/image`, {
        method: 'GET',
        headers: {
            'Authorization': req.headers.get("Authorization") ?? "Bearer " + (cookies().get('auth_token')?.value ?? ""),
        },
    });

    // Check if the response is OK and handle accordingly
    if (!response.ok) {
        return new Response(response.statusText, { status: response.status });
    }

    // Convert the response to a Blob to preserve the image content type
    const imageBlob = await response.blob();

    // Create a new response with the Blob and the correct content type
    return new Response(imageBlob, {
        headers: {
            'Content-Type': response.headers.get('Content-Type') ?? 'image/jpeg',
        },
    });
}
