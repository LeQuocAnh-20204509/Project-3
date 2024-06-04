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


export async function changePassword(_currentState: unknown, formData: FormData) {
    if (formData.get("new_password") !== formData.get('confirm_password')) {
        return "new and comfirm password not match"
    }
    const res = await fetch(baseURL + "/api/me/change-password", {
        method: 'PUT',
        body: formData,
        headers: {
            'Authorization': 'Bearer ' + cookies().get('auth_token')?.value,
        }
    });
    const body = await res.json();
    if (res.ok) {
        console.log(body);
        // Handle successful password change, e.g., show a success message or redirect
        redirect('/'); // Redirect to the profile or another relevant page
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