import React from 'react';
import {cookies} from "next/headers";
import {DropdownMenuItem} from "@/components/ui/dropdown-menu";
import {Button} from "@/components/ui/button";
import {Input} from "@/components/ui/input";
import {Label} from '@/components/ui/label';

const ProfilePage = async () => {
    const c = cookies();
    const token = c.get("auth_token")?.value;

    if (!token) {
        console.log('no token');
        return <p>Please log in.</p>;
    }

    const data = await (await fetch(process.env.NEXT_PUBLIC_APP_API_ENDPOINT + '/me', {
        method: 'GET',
        headers: {
            "Authorization": "Bearer " + token,
        }
    })).json();

    return (
        <>
            <div className="flex flex-col gap-4 mx-5">
                <details>
                    <summary><h1 className="text-lg font-semibold">Raw info</h1></summary>
                    <pre className="overflow-auto">
                     {JSON.stringify(data, null, 2)}
                    </pre>
                </details>
                <hr/>
                {/*<iframe name="hiddenFrame" width="0" height="0" className="hidden"></iframe>*/}
                <form action="/api/me/profile-img" method="post" encType="multipart/form-data"
                      className="flex flex-col gap-4 w-80"
                    // target="hiddenFrame"
                >
                    <Label htmlFor="file">Upload picture</Label>
                    <Input type="file" name="file" id="file" required/>
                    <Button type="submit">Change avatar</Button>
                </form>
            </div>
        </>
    );
};

export default ProfilePage;
