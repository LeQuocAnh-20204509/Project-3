import {cookies} from "next/headers";

export async function PUT(req: Request) {
    console.log(req.headers.get('Authorization'))
    const formData = await req.formData();
    return await fetch('http://localhost:8000/api/me/change_password', {
        method: 'PUT',
        body: formData,
        headers: {
            'Authorization': req.headers.get('Authorization')??"",

        }
    });
}