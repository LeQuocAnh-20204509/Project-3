import React from 'react';
import {cookies} from "next/headers";
import SubmissionList from "@/components/submit-list";

const Page = async () => {
    const c = cookies();
    const token = c.get("auth_token")?.value;

    if (!token) {
        console.log('no token');
        return <p>Please log in.</p>;
    }

    const data =   await (await fetch(process.env.NEXT_PUBLIC_APP_API_ENDPOINT + '/submissions', {
        method: 'GET',
        headers: {
            "Authorization": "Bearer " + token,
        }
    })).json();
    return (
        <div>
            <SubmissionList data={data.results}/>
        </div>
    );
};

export default Page;