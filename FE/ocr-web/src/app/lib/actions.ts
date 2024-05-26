'use server'

export async function authenticate(_currentState: unknown, formData: FormData) {
    try {
        console.dir(formData)
        const res = await fetch("http://localhost:8000/api/login", {
            method: 'POST',
            body: formData,
        })
    } catch (error: any) {
        console.log(error)

        if (error) {
            switch (error.type) {
                case 'CredentialsSignin':
                    return 'Invalid credentials.'
                default:
                    return 'Something went wrong.'
            }
        }
        throw error
    }
}

export async function signUp(_currentState: unknown, formData: FormData) {
    try {
        console.dir(formData)
        const res = await fetch("http://localhost:8000/api/register", {
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
        console.log(await res.json())
    } catch (error: any) {
        if (error) {
            return 'Something went wrong.';
        }
        throw error
    }
}