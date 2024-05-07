
"use client"

import { Button } from "@/components/ui/button"
import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
} from "@/components/ui/card"
import { Checkbox } from "@/components/ui/checkbox"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import Link from "next/link";

export default function SignUpAccount() {
    return (
        <div className="relative flex flex-col justify-center items-center min-h-screen overflow-hidden">
            <div className="w-full m-auto bg-white lg:max-w-lg">
                <Card>
                    <CardHeader className="space-y-1">
                        <CardTitle className="text-2xl text-center">Sign up</CardTitle>
                        <CardDescription className="text-center">
                            Create an account with your email and password
                        </CardDescription>
                    </CardHeader>
                    <CardContent className="grid gap-4">
                        <div className="grid gap-2">
                            <Label htmlFor="email">Email</Label>
                            <Input id="email" type="email" placeholder=""/>
                        </div>
                        <div className="grid gap-2">
                            <Label htmlFor="username">Username</Label>
                            <Input id="username" type="text" placeholder=""/>
                        </div>
                        <div className="grid gap-2">
                            <Label htmlFor="password">Password</Label>
                            <Input id="password" type="password"/>
                        </div>
                        <div className="flex items-center space-x-2">
                            <Checkbox id="terms"/>
                            <label
                                htmlFor="terms"
                                className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                            >
                                Remember me
                            </label>
                        </div>
                    </CardContent>
                    <CardFooter className="flex flex-col">
                        <Button className="w-full">Sign up</Button>
                        <p className="mt-2 text-xs text-center text-gray-700">
                        {" "}
                            Have an account?{" "}
                            <Link href={'/login'}><span className=" text-blue-600 hover:underline">Log in</span></Link>
                        </p>
                    </CardFooter>
                </Card>
            </div>
        </div>
    )
}