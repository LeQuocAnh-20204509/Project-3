import {NextRequest} from "next/server";
import {cookies} from "next/headers";

export async function GET(req: NextRequest) {
    const questionId = req.nextUrl.pathname.split('/').slice(-1)[0]; // Extract the questions-id from the URL

    // Forward the GET request to the backend API
    const response = await fetch(`${process.env.BACKEND_API_ENDPOINT}/api/question_image/${questionId}`, {
        method: 'GET',
        headers: {
            'Authorization': req.headers.get("Authorization") ?? "Bearer " + (cookies().get('auth_token')?.value ?? ""),
        },
    });

    // Check if the response is OK and handle accordingly
    if (!response.ok) {
        return new Response(response.statusText, { status: response.status });
    }

    // Return the backend response
    const data = await response.json();
    return new Response(JSON.stringify(data), {
        headers: {
            'Content-Type': 'application/json',
        },
    });
}
