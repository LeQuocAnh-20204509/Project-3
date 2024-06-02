'use server'

import {cookies} from "next/headers";
import {redirect} from "next/navigation";

const baseURL = "http://localhost:3000";

export async function logIn(_currentState: unknown, formData: FormData) {

    const res = await fetch(baseURL + "/api/login", {
        method: 'POST',
        body: formData,
    });
    const body = await res.json();
    if (res.ok) {
        console.log(body)
        // @ts-ignore
        cookies().delete('auth_token');
        cookies().set('auth_token', body.auth_token);
        redirect('/');
    } else {
        return body.message;
    }
}

export async function signUp(_currentState: unknown, formData: FormData) {
    const res = await fetch(baseURL + "/api/register", {
        method: 'POST',
        body: JSON.stringify({
            email: formData.get('email'),
            username: formData.get('username'),
            password: formData.get('password'),

        }),
        headers: {
            'Content-Type': 'application/json'
        }
    })
    const body = await res.json();
    if (res.ok) {
        console.log(body)
        redirect('login')
    } else {
        return body.message;
    }
}