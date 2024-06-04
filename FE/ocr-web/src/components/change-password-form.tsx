'use client';

import {changePassword} from '@/app/lib/actions';
import {useFormState, useFormStatus} from 'react-dom';
import {Button} from '@/components/ui/button';
import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
} from '@/components/ui/card';
import {Input} from '@/components/ui/input';
import {Label} from '@/components/ui/label';


export default function ChangePasswordForm() {
    const [errorMessage, dispatch] = useFormState(changePassword, undefined);

    return (
        <Card className="mx-auto max-w-sm">
            <CardHeader>
                <CardTitle className="text-2xl">Change Password</CardTitle>
                <CardDescription>
                    Enter your current password and a new password below to change your password.
                </CardDescription>
            </CardHeader>
            <CardContent>
                <form action={dispatch}>
                    <div className="grid gap-4">
                        <div className="grid gap-2">
                            <Label htmlFor="old_password">Current Password</Label>
                            <Input
                                id="old_password"
                                name="old_password"
                                type="password"
                                required
                            />
                        </div>
                        <div className="grid gap-2">
                            <Label htmlFor="new_password">New Password</Label>
                            <Input
                                id="new_password"
                                name="new_password"
                                type="password"
                                required
                            />
                        </div>
                        <div className="grid gap-2">
                            <Label htmlFor="confirm_password">Confirm New Password</Label>
                            <Input
                                id="confirm_password"
                                name="confirm_password"
                                type="password"
                                required
                            />
                        </div>
                        {errorMessage && (
                            <div className="text-destructive text-sm bg-red-100">
                                {errorMessage}
                            </div>
                        )}
                        <ChangePasswordButton/>
                    </div>
                </form>
            </CardContent>
        </Card>
    );
}

function ChangePasswordButton() {
    const {pending} = useFormStatus();

    const handleClick = (event: any) => {
        if (pending) {
            event.preventDefault();
        }
    };

    return (
        <Button aria-disabled={pending} type="submit" onClick={handleClick} className="w-full">
            Change Password
        </Button>
    );
}
