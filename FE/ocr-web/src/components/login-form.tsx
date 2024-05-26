'use client'

import {authenticate} from '@/app/lib/actions'
import {useFormState, useFormStatus} from 'react-dom'
import {Button} from "@/components/ui/button"
import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
} from "@/components/ui/card"
import {Input} from "@/components/ui/input"
import {Label} from "@/components/ui/label"
import Link from "next/link";

export default function Page() {
    const [errorMessage, dispatch] = useFormState(authenticate, undefined)

    return (

        <Card className="mx-auto max-w-sm">
            <CardHeader>
                <CardTitle className="text-2xl">Login</CardTitle>
                <CardDescription>
                    Enter your username below to login to your account
                </CardDescription>
            </CardHeader>
            <CardContent>
                <form action={dispatch}>
                    <div className="grid gap-4">
                        <div className="grid gap-2">
                            <Label htmlFor="username">Username</Label>
                            <Input
                                id="username"
                                name={'username'}
                                type="text"
                                required
                            />
                        </div>
                        <div className="grid gap-2">
                            <div className="flex items-center">
                                <Label htmlFor="password">Password</Label>
                                <Link href="#" className="ml-auto inline-block text-sm underline">
                                    Forgot your password?
                                </Link>
                            </div>
                            <Input id="password" type="password" required name={'password'}/>
                        </div>
                        <LoginButton/>
                    </div>
                </form>

                <div className="mt-4 text-center text-sm">
                    Don&apos;t have an account?{" "}
                    <Link href="#" className="underline">
                        Sign up
                    </Link>
                </div>
            </CardContent>
        </Card>
    )
}

function LoginButton() {
    const {pending} = useFormStatus()

    const handleClick = (event: any) => {
        if (pending) {
            event.preventDefault()
        }
    }

    return (
        <Button aria-disabled={pending} type="submit" onClick={handleClick} className="w-full">
            Login
        </Button>
    )
}