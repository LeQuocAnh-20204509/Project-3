import axios from "axios";
import { Component, useState } from "react";
import { useLocation } from "react-router-dom";

const DetailGeneratedQuestion = (props) => {
    // const [question, setQuestion] = useState({});
    // const [questionImage, setQuestionImage] = useState("");
    const location = useLocation();
    const id = location.state.id;
    const question = location.state.question;
    const questionImage = location.state.questionImage;
    const createdAt = location.state.createdAt;
    const avgRating = location.state.avgRating;

    const changeToAnswerOrder = (number) => {
        switch (number) {
            case 1: return "A. ";
            case 2: return "B. ";
            case 3: return "C. ";
            case 4: return "D. ";
            case 5: return "E. ";
            default: return "Lỗi!"
        }
    }

    const processQuestion = (generatedQuestion) => {
        var question = [];
        question.push(generatedQuestion.questions[0]);
        var numberAnswers = generatedQuestion.answer.length + generatedQuestion.correct_answer.length;
        var correctAnswerIndex = Math.ceil(Math.random() * numberAnswers);
        var answerIndex = 0;
        var correctAnswerAdded = false;
        generatedQuestion.answer.forEach((value, index, array) => {
            if (correctAnswerIndex === index+1) {
                question.push(changeToAnswerOrder(correctAnswerIndex) + generatedQuestion.correct_answer[0]);
                correctAnswerAdded = true;
                answerIndex++;
            }
            answerIndex++;
            question.push(changeToAnswerOrder(answerIndex) + value);
        });
        if (!correctAnswerAdded) {
            question.push(changeToAnswerOrder(correctAnswerIndex) + generatedQuestion.correct_answer[0]);
        };

        var mappedDivQuestion = question.map((value, index, array) => {
            if (index == 0) return <div key={value}><b>{value}</b></div>
            else return <div key={value}>{value}</div>;
        });
        var answerDiv = <div>
            <i>Đáp án: </i>
            <br/>
            <b>{changeToAnswerOrder(correctAnswerIndex) + generatedQuestion.correct_answer[0]}</b>
        </div>
        return <div>
            {mappedDivQuestion}
            <br/>
            <br/>
            {answerDiv}
        </div>
    }

    const changeDateFormat = (date) => {
        var dateCreated = new Date(date);
        var day = String(dateCreated.getDate()).padStart(2, "0");
        var month = String(dateCreated.getMonth() + 1).padStart(2, "0");
        var year = String(dateCreated.getFullYear());
        return day + "/" + month + "/" + year;
    }

    return (
        <div
            style={{
                display: "grid",
                gridTemplateColumns: "20% 60% 20%",
            }}
        >
            <aside></aside>
            <div
                style={{
                    padding: "5% 10% 8%",
                    boxShadow: "4px 0 4px rgba(0, 0, 0, 0.19), -4px 0 4px rgba(0, 0, 0, 0.19)"
                }}
            >
                <h2>Câu hỏi {id}:</h2>
                <img src={questionImage} alt="question-image"
                    style={{
                        maxWidth: "90%",
                        
                    }}
                />
                <br/><br/>
                <div
                    style={{
                        fontSize: "1.1rem"
                    }}
                >
                    {processQuestion(question)}
                    <br/><br/>
                    <b>Ngày tạo:</b>&nbsp;&nbsp; 
                    <i>{changeDateFormat(createdAt)}</i>
                    <br/>
                    <b>Trung bình đánh giá của bạn:</b>&nbsp;&nbsp;
                    <i>
                        {
                            avgRating ?
                            <AverageRatingStar rating={avgRating} /> :
                            "Bạn chưa đánh giá về câu hỏi này!"
                        }
                    </i>
                </div>
            </div>
            <aside
                style={{
                    boxShadow: "inset 4px 0 4px rgba(0, 0, 0, 0.19)"
                }}
            ></aside>
        </div>
    )
}

const AverageRatingStar = (props) => {
    return (
        <span>
            {props.rating} / 5&nbsp;
            <i className="fa fa-star" aria-hidden
                style={{
                    color: "yellow",
                    fontSize: "1.4rem"
                }}
            ></i>
        </span>
    )
}

export default DetailGeneratedQuestion;
