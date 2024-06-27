import React from 'react';
import {cookies} from "next/headers";
import {Button} from "@/components/ui/button";

const Page =async ({params}: { params: { id: string}}) => {
    const dataFetch = await fetch(`${process.env.NEXT_PUBLIC_APP_API_ENDPOINT}/questions/${params.id}`, {
        method: 'GET',
        headers: {
            'Authorization': `Bearer ${cookies().get('auth_token')?.value}`,
        },
    })
    const data = await dataFetch.json();
    return (
        <div>
            <pre>
                {JSON.stringify(data, null, 2)}
            </pre>
            <form action={`/api/files/${params.id}/`} method="post">
                <Button>Gen</Button>
            </form>
        </div>
    );
};

export default Page;