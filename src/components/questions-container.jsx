import axios from "axios";
import { Component } from "react";
import { NavLink } from "react-router-dom";

class GeneralGeneratedQuestion extends Component {
    constructor(props) {
        super(props);
        this.state = {
            questionImage: "",
            isHovered: false
        }
        this.changeHoveredOrNot = this.changeHoveredOrNot.bind(this);
        
        var config = {
            headers: {
                Authorization: "Bearer " + sessionStorage.getItem("authToken")
            }
        }
        axios.get("http://localhost:8000/api/question_image/" + this.props.questionId,
            config
        ).then((response) => {
            this.setState({
                questionImage: "data:image;base64," + response.data.image
            })
        }).catch((error) => {
            console.log("Có lỗi đã xảy ra trong việc lấy ảnh của câu hỏi đã sinh từ server!");
            console.log(error);
        })
    }

    changeHoveredOrNot(isHovered) {
        this.setState({
            isHovered: isHovered
        })
    }

    render() {
        var question = this.props.question;
        var routeState = {
            id: this.props.id,
            question: question,
            questionImage: this.state.questionImage,
            createdAt: this.props.createdAt,
            avgRating: this.props.avgRating
        }
        
        return (
            <NavLink to={"/user-profile/generated-question/" + this.props.id} 
                state={routeState}
                key={this.props.elementKey}
                onMouseEnter={(event) => this.changeHoveredOrNot(true)}
                onMouseLeave={(event) => this.changeHoveredOrNot(false)}
                style={{
                    display: "flex",
                    width: "80%",
                    padding: "1%",
                    gap: "2%",
                    cursor: "pointer",
                    boxShadow: this.state.isHovered ? "4px 0 4px rgba(0, 0, 0, 0.19), -4px 0 4px rgba(0, 0, 0, 0.19)" : "none",
                    fontSize: "1.2rem"
                }}
            >
                <div>{this.props.id}.</div>
                <img src={this.state.questionImage} alt="question-image"
                    style={{
                        width: "10%"
                    }}
                />
                <div>
                    {question.questions}
                </div>
            </NavLink>
        )
    }
}

class QuestionsContainer extends Component {
    constructor(props) {
        super(props);
        this.state = {
            questionsCount: 0,
            questions: []
        }

        var config = {
            headers: {
                Authorization: "Bearer " + sessionStorage.getItem("authToken")
            }
        }
        axios.get("http://localhost:8000/api/questions",
            config
        ).then((response) => {
            this.setState({
                questionsCount: response.data.count,
                questions: response.data.results
            })
        })
    }


    render() {
        console.log(this.state.questions)
        return (
            <div
                style={{
                    width: "100%",
                    padding: "2% 0 2% 10%"
                }}
            >
                <h2>Danh sách câu hỏi đã sinh ({this.state.questionsCount}):</h2>
                <div>
                    {this.state.questions.map((value, index, array) => {
                        return <GeneralGeneratedQuestion
                                    id={index + 1}
                                    elementKey={value} 
                                    questionId={value.id}
                                    question={value.question}
                                    createdAt={value.created_at}
                                    avgRating={value.avg_rating}
                                />
                    })}
                </div>
            </div>
        )
    }
}

export default QuestionsContainer;
