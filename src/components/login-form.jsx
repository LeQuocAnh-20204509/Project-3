'use client'

// import {logIn} from '@/app/lib/actions'
import {useFormState, useFormStatus} from 'react-dom'
import {Button} from "./ui/button"
import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
} from "./ui/card"
import {Input} from "./ui/input"
import {Label} from "./ui/label"
// import Link from "next/link";

export default function Page() {
    // const [errorMessage, dispatch] = useFormState(logIn, undefined)

    return (

        <Card className="mx-auto max-w-sm">
            <CardHeader>
                <CardTitle className="text-2xl">Login</CardTitle>
                <CardDescription>
                    Enter your username below to login to your account
                </CardDescription>
            </CardHeader>
            <CardContent>
                <form>
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
                                <a href="#" className="ml-auto inline-block text-sm underline">
                                    Forgot your password?
                                </a>
                            </div>
                            <Input id="password" type="password" required name={'password'}/>
                        </div>
                        {/*{errorMessage && (*/}
                        {/*    <div className="text-destructive text-sm bg-red-100">{errorMessage}</div>*/}
                        {/*)}*/}
                        <LoginButton/>
                    </div>
                </form>

                <div className="mt-4 text-center text-sm">
                    Don&apos;t have an account?{" "}
                    <a href="/signup" className="underline">
                        Sign up
                    </a>
                </div>
            </CardContent>
        </Card>
    )
}

function LoginButton() {
    // const {pending} = useFormStatus()

    const handleClick = (event) => {
        // if (pending) {
        //     event.preventDefault()
        // }
    }

    return (
        <Button
            // aria-disabled={pending}
            type="submit"
            onClick={handleClick}
            className="w-full">
            Login
        </Button>
    )
}