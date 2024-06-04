import {NextRequest} from "next/server";
import {cookies} from "next/headers";

export async function GET( req: NextRequest,{ params }: { params: { user_id: string } }) {
    const c = cookies();
    const token = c.get("auth_token")?.value;
    if (!token) {
        console.log('no token')
    }

    return await fetch(`http://localhost:8000/api/users/${params.user_id}/profile-img`, {
        method: 'GET',
        headers: {
            'Authorization': `Bearer ${token}`,
        },
    });
}