import React from 'react';
import { Card, CardContent } from '@/components/ui/card';


const QuestionDisplay = ({ data }: {data : any}) => {
    const questionText = data.question.questions[0];
    const correctAnswer = data.question.correct_answer[0];
    const answers = data.question.answer;

    return (
        <Card>
            <CardContent>
                <h1 className="mb-4">
                    display name: {data.display_name}
                </h1>
                <p  className="mb-2">
                    Question:
                </p>
                <p  className="mb-4">
                    {questionText}
                </p>
                <p className="mb-2">
                    Answers:
                </p>
                <ul>
                    {answers.map((ans: any, index: React.Key | null | undefined) => (
                        <li key={index}>
                            {ans}
                        </li>
                    ))}
                </ul>
                <p className="mt-4">
                    Correct Answer:
                </p>
                <p >
                    {correctAnswer}
                </p>
            </CardContent>
        </Card>
    );
};

export default QuestionDisplay;
