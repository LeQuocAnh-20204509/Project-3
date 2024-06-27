// Import necessary modules from Next.js
import { NextRequest, NextResponse } from "next/server";
import { cookies } from "next/headers";

// Define the function to handle GET requests
async function handleGet(request: NextRequest) {
    // Fetch data from the backend API endpoint
    const response = await fetch(`${process.env.BACKEND_API_ENDPOINT}/api/posts`, {
        method: 'GET',
        headers: {
            // Set the Authorization header using either the request header or the auth_token cookie
            'Authorization': request.headers.get("Authorization") ?? "Bearer " + (cookies().get('auth_token')?.value ?? ""),
        },
    });

    // Check if the response is not OK and return an error response if necessary
    if (!response.ok) {
        return new Response(response.statusText, { status: response.status });
    }

    // Parse the response data as JSON
    const data = await response.json();

    // Return the data in a new response with JSON content type
    return new Response(JSON.stringify(data), {
        headers: {
            'Content-Type': 'application/json',
        },
    });
}

// Export the GET function to handle GET requests to this route
export async function GET(req: NextRequest) {
    return handleGet(req);
}
