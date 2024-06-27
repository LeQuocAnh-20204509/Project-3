// components/SubmissionList.js
import React from 'react';
import Link from "next/link";

const SubmissionList = ({ data } : {data: any}) => {
    return (
        <div className="container mx-auto p-4">
            <h1 className="text-2xl font-bold mb-4">Submissions</h1>
            <div className="grid grid-cols-1 gap-4">
                {data.map((item: any) => (
                    <Link href={`/submissions/${item.id}`} key={item.id} className="block bg-white shadow-md rounded-lg p-4 hover:bg-gray-100">
                            <p><strong>ID:</strong> {item.id}</p>
                            <p><strong>Created At:</strong> {new Date(item.created_at).toLocaleString()}</p>
                            <p><strong>Updated At:</strong> {new Date(item.updated_at).toLocaleString()}</p>
                            <p><strong>Last OCR Time:</strong> {new Date(item.last_ocr_time).toLocaleString()}</p>
                            <p><strong>File Count:</strong> {item.file_count}</p>
                            <p><strong>User:</strong> {item.user}</p>
                            <p><strong>Files:</strong> {item.files.join(', ')}</p>
                    </Link>
                ))}
            </div>
        </div>
    );
};

export default SubmissionList;
