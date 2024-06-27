import {cookies} from "next/headers";

export async function PUT(req: Request) {
    console.log(req.headers.get('Authorization'))
    const formData = await req.formData();
    return await fetch(process.env.BACKEND_API_ENDPOINT+'/api/me/change_password', {
        method: 'PUT',
        body: formData,
        headers: {
            'Authorization': req.headers.get('Authorization')??"",

        }
    });
}