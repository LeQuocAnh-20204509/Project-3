import React from 'react';
import { cookies } from "next/headers";
import { Button } from "@/components/ui/button";

import QuestionDisplay from "@/components/question-display";

const convertToMoodleXML = (data: any) => {
    return `
        <question type="multichoice">
            <name>
                <text>${data.display_name}</text>
            </name>
            <questiontext format="html">
                <text><![CDATA[${data.question.questions[0]}]]></text>
            </questiontext>
            <answer fraction="100">
                <text><![CDATA[${data.question.correct_answer[0]}]]></text>
            </answer>
            ${data.question.answer.map((ans: any, index: any) => `
                <answer fraction="0">
                    <text><![CDATA[${ans}]]></text>
                </answer>
            `).join('')}
        </question>
    `;
};

const Page = async ({ params }: { params: { id : string}}) => {
    const dataFetch = await fetch(`${process.env.NEXT_PUBLIC_APP_API_ENDPOINT}/questions/${params.id}`, {
        method: 'GET',
        headers: {
            'Authorization': `Bearer ${cookies().get('auth_token')?.value}`,
        },
    });
    const data = await dataFetch.json();
    const moodleXML = convertToMoodleXML(data);
    console.log(data)
    return (
        <div>
            <QuestionDisplay data={data} />
            <form action={`/api/files/${params.id}/generate`} method="post">
                <Button>Gen</Button>
            </form>
        </div>
    );
};

export default Page;
