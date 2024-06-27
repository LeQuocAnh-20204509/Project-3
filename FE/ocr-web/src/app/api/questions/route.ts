import {NextRequest} from "next/server";
import {cookies} from "next/headers";

export async function GET(req: NextRequest) {
    const searchParams = req.nextUrl.searchParams.toString(); // Get the query parameters

    // Forward the GET request to the backend API
    const response = await fetch(`${process.env.BACKEND_API_ENDPOINT}/api/questions?${searchParams}`, {
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
