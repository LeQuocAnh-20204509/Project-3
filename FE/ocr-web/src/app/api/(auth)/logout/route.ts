import {cookies} from "next/headers";
import {redirect} from "next/navigation";

export async function POST(req: Request) {
    const c = cookies();
    const authorization = cookies().get('auth_token');
    c.delete('auth_token');

    const myHeaders = new Headers();
    myHeaders.append("Authorization", authorization?.value || '');

    await fetch(process.env.BACKEND_API_ENDPOINT+'/api/logout', {
        method: 'GET',
        headers: myHeaders
    });

    redirect('/login');

}