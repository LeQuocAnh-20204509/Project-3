// /pages/api/profile-img.js
import {NextRequest, NextResponse} from "next/server";
import {cookies} from "next/headers";
import {revalidatePath} from "next/cache";

export async function GET(req: NextRequest) {
    const c = cookies();
    const token = c.get("auth_token")?.value;
    // console.log(token)
    if (!token) {
        console.log('no token')
    }

    return await fetch('http://localhost:8000/api/me/profile-img', {
        method: 'GET',
        headers: {
            'Authorization': `Bearer ${token}`,
        },
    });
}

export async function POST(req: NextRequest) {
    const c = cookies();
    const token = c.get("auth_token")?.value;

    if (!token) {
        console.log('no token');
        return NextResponse.json({error: 'Unauthorized'}, {status: 401});
    }

    try {
        const formData = await req.formData();
        const file = formData.get('file');

        const res = await fetch('http://localhost:8000/api/me/profile-img', {
            method: 'POST',
            headers: {
                'Authorization': `Bearer ${token}`,
            },
            body: formData,
            // duplex: 'half', // Ensure duplex option for Node.js
        });

        if (!res.ok) {
            const errorData = await res.json();
            console.error('Backend error:', errorData);
            return NextResponse.json({error: 'Backend error'}, {status: res.status});
        }
        //
        // const responseData = await res.json();
        // return NextResponse.json(responseData, { status: 200 });
        return NextResponse.redirect(new URL('/me', req.nextUrl).toString());
    } catch (error) {

        console.error('Fetch error:', error);
        return NextResponse.json({error: 'Internal Server Error'}, {status: 500});
    }
}