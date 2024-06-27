import {cookies} from "next/headers";
import {redirect} from "next/navigation";
import {NextRequest} from "next/server";

export async function POST(req: Request) {
    const c = cookies();
    const authorization = cookies().get('auth_token');
    console.log(authorization)
    const myHeaders = new Headers();
    myHeaders.append("Authorization", `Bearer ${authorization?.value || ''}`);

    const res = await fetch(process.env.BACKEND_API_ENDPOINT+'/api/submissions', {
        method: 'POST',
        headers: myHeaders,
        body: await req.formData(),
    });

    console.dir(await res.json())
    redirect('/submissions')
}

export async function GET(req: NextRequest) {


    return await fetch(process.env.BACKEND_API_ENDPOINT+'/api/submissions', {
        method: 'GET',
        headers: {
            'Authorization':  req.headers.get("Authorization")??"Bearer "+ cookies().get('auth_token')?.value?? "",

        },
    });
}