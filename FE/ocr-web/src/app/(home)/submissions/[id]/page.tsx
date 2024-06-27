// app/submissions/[id]/page.tsx
import React from 'react';
import {headers} from 'next/headers';
import Link from "next/link";

interface Submission {
    id: number;
    created_at: string;
    updated_at: string;
    last_ocr_time: string;
    file_count: number;
    user: number;
    files: number[];
}

interface SubmissionDetailProps {
    params: { id: string };
}

interface FileDetail {
    id: number;
    created_at: string;
    updated_at: string;
    deleted_at: string | null;
    name: string;
    display_name: string;
    extension: string;
    path: string;
    size: number;
    submission: number;
    tags: string[];
    data_Set: string[];
    questions: {
        question_id: number;
        question_name: string;
    }[];
}

const SubmissionDetail = async ({params}: SubmissionDetailProps) => {
    const headersList = headers();
    const token = headersList.get('cookie')?.match(/auth_token=([^;]*)/)?.[1];

    if (!token) {
        return <p>Authentication token not found</p>;
    }

    const response = await fetch(`${process.env.NEXT_PUBLIC_APP_API_ENDPOINT}/submissions`, {
        method: 'GET',
        headers: {
            'Authorization': `Bearer ${token}`,
        },
    });

    if (!response.ok) {
        return <p>Submission not found</p>;
    }

    const data = await response.json();
    const results: Submission[] = data.results;
    const result = results.find(submission => submission.id.toString() === params.id);

    if (!result) {
        return <p>Submission not found</p>;
    }
    const filesPromise = result.files.map(async (file) => {
        return (await fetch(`${process.env.NEXT_PUBLIC_APP_API_ENDPOINT}/files/${file.toString()}`, {
            method: 'GET',
            headers: {
                'Authorization': `Bearer ${token}`,
            }
        })).json();
    });
    const files = await Promise.all(filesPromise);


        return (
            <>
                <div className="container mx-auto p-4">
                    <h1 className="text-2xl font-bold mb-4">Submission Details for ID: {result.id}</h1>
                    <div className="bg-white shadow-md rounded-lg p-4">
                        <pre>{JSON.stringify(result, null, 2)}</pre>
                    </div>
                </div>
                { files.map( (file) => {
                    return (
                        <div className="container mx-auto p-10">
                            <h1 className="text-2xl font-bold mb-4">
                                <Link href={`/files/${file.id}`}>
                                    File Details for ID: {file.id}

                                </Link>
                            </h1>
                            <div className="bg-white shadow-md rounded-lg p-4">
                                <pre>{JSON.stringify(file, null, 2)}</pre>
                            </div>
                        </div>
                    )
                })}

            </>


        );
};

export default SubmissionDetail;
