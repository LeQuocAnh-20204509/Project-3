import { Component } from "react";
import ImageUploader from "./image-uploader";
import RatingStarsContainer from "./rating-stars-container";
import { TypeAnimation } from "react-type-animation";
import { Link } from "react-router-dom";
import { setUploadedOrNot, setChangedOrNot, setContainerBorderStyle } from "../react-redux/image-upload-slice";
import { setActiveOrNot } from "../react-redux/rate-share-comment-slice";
import { setIsGeneratingOrNot, setCanTypeOrNot, setQuestion } from "../react-redux/question-generating-slice";
import { connect } from "react-redux";
import { setActive } from "../react-redux/navbar-slice";
import axios from "axios";

class GenerateButton extends Component {
    constructor(props) {
        super(props);
        this.state = {
            backgroundColor: "cornflowerblue"
        }
        this.changeBackgroundColor = this.changeBackgroundColor.bind(this);
        this.changeBackBackgroundColor = this.changeBackBackgroundColor.bind(this);
    }

    changeBackgroundColor(event) {
        this.setState({
            backgroundColor: "darkblue"
        });
    };

    changeBackBackgroundColor(event) {
        this.setState({
            backgroundColor: "cornflowerblue"
        })
    }

    render() {
        return (
            <button id="generate-button" onClick={this.props.onClick} onMouseEnter={this.changeBackgroundColor} 
                    onMouseLeave={this.changeBackBackgroundColor}
                    style={{
                        height: "fit-content",
                        width: "fit-content",
                        color: "white",
                        backgroundColor: this.state.backgroundColor,
                        fontSize: "1.4rem",
                        fontWeight: "500",
                        margin: "0 auto",
                        padding: "10%",
                        border: "none",
                        borderRadius: "8px",
                        cursor: "pointer"
                    }}
            >
                <i className="fa fa-arrow-down" aria-hidden
                    style={{
                        fontSize: "1.5rem",
                    }}
                ></i>
                &nbsp;Sinh câu hỏi
            </button>
        )
    }
}

class ResultContainer extends Component {
    correctAnswerIndex = 1;

    constructor(props) {
        super(props);
        this.state = {
            question: "",
            functionalityHovered: [false, false, false]
        };
        this.generateQuestion = this.generateQuestion.bind(this);
        this.changeFunctionalityBgColor = this.changeFunctionalityBgColor.bind(this);
        this.changeBackFunctionalityBgColor = this.changeBackFunctionalityBgColor.bind(this);
        this.onFunctionalitiesClick = this.onFunctionalitiesClick.bind(this);
    }

    generateQuestion(event) {
        if (!this.props.isImageUploaded) {
            alert("Bạn chưa upload ảnh!");
        } else if (!this.props.isImageChanged) {
            alert("Ảnh chưa được thay đổi!");
        } else {
            this.props.submitContainerBorderStyle(true);
            this.props.submitGeneratingOrNot(true);
            var questionContainer = document.querySelector("#question_container");
            // setTimeout(() => {
            //     var randomIndex = Math.floor(Math.random() * 10);
            //     this.props.submitGeneratingOrNot(false);
            //     var generatedQuestion = "Example question, this is a random question: The book is: " + "\nA. Toan " + randomIndex 
            //                             + "\nB. Tieng Viet " + randomIndex + "\nC. Tieng Anh " + randomIndex 
            //                             + "\nD. Luyen viet " + randomIndex;
            //     this.setState({
            //         question: generatedQuestion
            //     }, () => {
            //         this.props.submitCanTypeOrNot(true);
            //     });
            //     this.props.submitQuestion(generatedQuestion.split("\n"));
            //     questionContainer.scrollIntoView();
            //     this.props.submitChangedOrNot(false);
            // }, 2000);
            var data = new FormData();
            var config = {
                headers: {
                    Authorization: "Bearer " + this.props.authToken
                }
            }
            data.append("files", this.props.imgFile);
            axios.post("http://localhost:8000/api/submissions", 
                data,
                config)
            .then((response1) => {
                console.log(response1);
                axios.post(
                    "http://localhost:8000/api/files/" + response1.data.file_ids + "/generate",
                    undefined,
                    config
                ).then((response2) => {
                    console.log(response2);
                    this.props.submitGeneratingOrNot(false);
                    var generatedQuestion = response2.data.question;
                    var numberAnswers = generatedQuestion.answer.length + generatedQuestion.correct_answer.length;
                    this.correctAnswerIndex = Math.ceil(Math.random() * numberAnswers);
                    this.setState({
                        question: this.processGeneratedQuestion(generatedQuestion, this.correctAnswerIndex, "typing")
                    }, () => {
                        this.props.submitCanTypeOrNot(true);
                    });
                    this.props.submitQuestion(
                        this.processGeneratedQuestion(generatedQuestion, this.correctAnswerIndex, "showing")
                    );
                    questionContainer.scrollIntoView();
                    this.props.submitChangedOrNot(false);
                }).catch((error2) => {
                    console.log(error2);
                    if (error2.response) {
                        switch (error2.response.status) {
                            case 400: alert("Không thể sinh câu hỏi vì ảnh bạn tải lên không có ngữ cảnh rõ ràng."
                                            + "\nXin vui lòng chọn ảnh khác!");
                                    break;
                            case 403: alert("Phiên đăng nhập của bạn đã hết hạn, vui lòng đăng nhập lại!");
                                    break;
                            case 500: alert("Server đang gặp lỗi, bạn vui lòng thử lại sau!");
                                    break;
                            default: alert("Đã có lỗi xảy ra trong việc sinh câu hỏi, xin vui lòng thử lại!");
                        }
                    } else if (error2.request) {
                        alert("Server không phản hồi!");
                    }
                    this.props.submitGeneratingOrNot(false);
                })
            }).catch((error1) => {
                console.log(error1);
                if (error1.response) {
                    switch (error1.response.status) {
                        case 403: alert("Phiên đăng nhập của bạn đã hết hạn, vui lòng đăng nhập lại!");
                                    break;
                        case 500: alert("Server đang gặp lỗi, bạn vui lòng thử lại sau!");
                                    break;
                        default: alert("Đã có lỗi xảy ra trong lúc gửi ảnh về server");
                    }
                } else if (error1.request) {
                    alert("Server không phản hồi!");
                }
            });

        }

    }

    changeToAnswerOrder(number) {
        switch (number) {
            case 1: return "A. ";
            case 2: return "B. ";
            case 3: return "C. ";
            case 4: return "D. ";
            case 5: return "E. ";
            default: return "Lỗi!"
        }
    }

    processGeneratedQuestion(generatedQuestion, correctAnswerIndex, state) {
        if (state === "showing") {
            var question = [];
            question.push(generatedQuestion.questions[0]);
            var answerIndex = 0;
            var correctAnswerAdded = false;
            generatedQuestion.answer.forEach((value, index, array) => {
                if (correctAnswerIndex === index+1) {
                    question.push(this.changeToAnswerOrder(correctAnswerIndex) + generatedQuestion.correct_answer[0]);
                    correctAnswerAdded = true;
                    answerIndex++;
                }
                answerIndex++;
                question.push(this.changeToAnswerOrder(answerIndex) + value);
            });
            if (!correctAnswerAdded) {
                question.push(this.changeToAnswerOrder(correctAnswerIndex) + generatedQuestion.correct_answer[0]);
            };

            var mappedDivQuestion = question.map((value, index, array) => {
                return <div key={value}>{value}</div>;
            });
            var answerDiv = <div>
                <i>Đáp án: </i>
                <br/>
                <b>{this.changeToAnswerOrder(correctAnswerIndex) + generatedQuestion.correct_answer[0]}</b>
            </div>
            return <>
                {mappedDivQuestion}
                <br/>
                <br/>
                {answerDiv}
            </>
        } else if (state === "typing") {
            var question = "";
            question += generatedQuestion.questions[0] + "\n";
            var answerIndex = 0;
            var correctAnswerAdded = false;
            generatedQuestion.answer.forEach((value, index, array) => {
                if (correctAnswerIndex === index+1) {
                    question += this.changeToAnswerOrder(correctAnswerIndex) + generatedQuestion.correct_answer[0] + "\n";
                    correctAnswerAdded = true;
                    answerIndex++;
                }
                answerIndex++;
                question += this.changeToAnswerOrder(answerIndex) + value + "\n";
            });
            if (!correctAnswerAdded) {
                question += this.changeToAnswerOrder(correctAnswerIndex) + generatedQuestion.correct_answer[0] + "\n";
            }
            question += "\n\nĐáp án:\n";
            question += this.changeToAnswerOrder(correctAnswerIndex) + generatedQuestion.correct_answer[0];
            return question;
        }
    }

    changeFunctionalityBgColor(index) {
        var newFunctionalityHovered = [...this.state.functionalityHovered];
        newFunctionalityHovered.forEach((value, ind, array) => {
            if (ind === index) array[ind] = true;
            else array[ind] = false
        });
        this.setState({
            functionalityHovered: newFunctionalityHovered
        });
    }

    changeBackFunctionalityBgColor(index) {
        this.setState({
            functionalityHovered: [false, false, false]
        });
    }

    onFunctionalitiesClick(event, index) {
        var functionalityName, functionToExecute;
        switch (index) {
            case 1: {
                functionalityName = "chia sẻ";
                functionToExecute = () => {};
                break;
            };
            case 2: {
                functionalityName = "bình luận";
                functionToExecute = this.props.submitAccountActive;
                break;
            }
        }
        if (!this.props.isImageUploaded) {
            alert("Bạn chưa upload ảnh!");
            event.preventDefault();
        } else if (!this.props.isFunctionalitiesActive) {
            alert("Bạn chưa thể " + functionalityName + " vì câu hỏi chưa được sinh ra hoặc đang được sinh ra!");
            event.preventDefault();
        } else {
            functionToExecute();
        }
    }

    render() {
        return (
            <div
                style={{
                    borderBottom: "1px solid gray"
                }}
            >
                <div
                    style={{
                        display: "grid",
                        gridTemplateColumns: "60% 11% 20%",
                        alignItems: "center",
                        justifyItems: "center",
                        width: "100%"
                    }}
                >
                    <ImageUploader />
                    {
                        this.props.isGenerating ?
                        <div
                            style={{
                                display: "flex",
                                flexDirection: "column",
                                alignItems: "center"
                            }}
                        >
                            <i className="fa fa-spinner fa-pulse fa-3x fa-fw"
                                style={{
                                    margin: "0 auto"
                                }}
                            ></i>
                            <div
                                style={{
                                    marginTop: "15px",
                                    fontSize: "1.2rem",
                                    fontWeight: "500"
                                }}
                            >Đang xử lý...</div>
                        </div> :
                        <div></div>
                    }
                    <GenerateButton onClick={this.generateQuestion} />
                </div>
                <div
                    style={{
                        display: "grid",
                        gridTemplateColumns: "60% 40%",
                        margin: "5% 0",
                        padding: "0 0 0 5%",
                        alignItems: "center"
                    }}
                >
                    <div id="question_container"
                        style={{
                            // width: "80%",
                            height: 300,
                            fontSize: "1.1rem",
                            // overflow: "scroll",
                            padding: "10%",
                            boxShadow: "5px 0 15px rgba(0, 0, 0, 0.2), -5px 0 15px rgba(0, 0, 0, 0.2)"
                        }}
                    >
                        <b>Câu hỏi:</b>
                        <div>
                            {
                                this.props.isFunctionalitiesActive ?            // neu da sinh cau hoi roi thi hien thi luon, su dung isFunctionalitiesActive vi khi da sinh cau hoi ra xong thi cung la luc active
                                this.props.generatedQuestion :
                                ((this.props.canType) ?
                                    <TypeAnimation 
                                        sequence={[
                                            this.state.question,
                                            () => {
                                                this.props.submitFunctionalitiesActiveOrNot(true);
                                            }
                                        ]}
                                        speed={160}
                                        style={{
                                            whiteSpace: "pre-line",
                                        }}
                                        cursor={false}
                                        omitDeletionAnimation
                                    /> : ""
                                )
                            }
                        </div>
                    </div>

                    <div
                        style={{
                            padding: "5%",
                            fontSize: "1.rem",
                            color: this.props.isFunctionalitiesActive ? "black" : "GrayText"
                        }}
                    >
                        <div onMouseEnter={(event) => this.changeFunctionalityBgColor(0)}
                            onMouseLeave={(event) => this.changeBackFunctionalityBgColor(0)}
                            style={{
                                width: "100%",
                                padding: "2.5%",
                                backgroundColor: this.state.functionalityHovered[0] ? "#e4e6e8" : "white"
                            }}
                        >
                            {
                                this.props.isFunctionalitiesActive ?
                                <img src={require("../images/like-icon.png")} alt="like-icon"
                                    className="fa fa-fw"
                                    style={{
                                        width: "22px",
                                        marginRight: "4px",
                                    }}
                                /> :
                                <i className="fa fa-thumbs-o-up fa-lg fa-fw" aria-hidden></i>
                            }                            
                            &nbsp;Bạn đánh giá thế nào về câu hỏi được sinh ra này ?&nbsp;&nbsp;
                            <div
                                style={{
                                    display: "inline-block",
                                    cursor: "pointer"
                                }}
                            >
                                <RatingStarsContainer />
                            </div>
                        </div>
                        <Link to={"/share"}
                            onMouseEnter={(event) => this.changeFunctionalityBgColor(1)}
                            onMouseLeave={(event) => this.changeBackFunctionalityBgColor(1)}
                            onClick={(event) => this.onFunctionalitiesClick(event, 1)}
                            style={{
                                width: "100%",
                                display: "block",
                                cursor: "pointer",
                                padding: "2.5%",
                                backgroundColor: this.state.functionalityHovered[1] ? "#e4e6e8" : "white"
                            }}
                        >
                            <i className="fa fa-share fa-lg fa-fw" aria-hidden
                                style={{
                                    color: this.props.isFunctionalitiesActive ? "Highlight" : "GrayText"
                                }}
                            ></i>
                            &nbsp;Chia sẻ
                        </Link>
                        {
                            this.props.isUserLoggedIn ?
                            <a href="#comment-box"
                                onMouseEnter={(event) => this.changeFunctionalityBgColor(2)}
                                onMouseLeave={(event) => this.changeBackFunctionalityBgColor(2)}
                                onClick={(event) => this.onFunctionalitiesClick(event, 2)}
                                style={{
                                    display: "block",
                                    width: "100%",
                                    padding: "2.5%",
                                    cursor: "pointer",
                                    backgroundColor: this.state.functionalityHovered[2] ? "#e4e6e8" : "white"
                                }}
                            >
                                <i className="fa fa-pencil-square-o fa-lg fa-fw" aria-hidden></i>
                                &nbsp;Bình luận
                            </a> :
                            <Link to={"/login"}
                                onMouseEnter={(event) => this.changeFunctionalityBgColor(2)}
                                onMouseLeave={(event) => this.changeBackFunctionalityBgColor(2)}
                                onClick={this.props.submitAccountActive}
                                style={{
                                    display: "block",
                                    width: "100%",
                                    padding: "2.5%",
                                    cursor: "pointer",
                                    backgroundColor: this.state.functionalityHovered[2] ? "#e4e6e8" : "white"
                                }}
                            >
                                <i className="fa fa-user fa-lg fa-fw" aria-hidden
                                    style={{
                                        color: this.props.isFunctionalitiesActive ? "#4b4b4b" : "GrayText"
                                    }}
                                ></i>
                                &nbsp;Đăng nhập để bình luận
                            </Link>
                        }
                    </div>
                </div>
            </div>
        )
    }
}

const mapStateToProps = (state) => {
    return {
        isImageUploaded: state.imageUpload.isUploaded,
        isImageChanged: state.imageUpload.isChanged,
        imgFile: state.imageUpload.imgFile,
        isGenerating: state.questionGenerating.isGenerating,
        canType: state.questionGenerating.canType,
        generatedQuestion: state.questionGenerating.question,
        isFunctionalitiesActive: state.rateShareComment.isActive,
        isUserLoggedIn: state.userAccount.isLoggedIn,
        authToken: state.userAccount.authToken
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        submitAccountActive: () => {
            dispatch(setActive({
                index: 3
            }))
        },
        submitUploadedOrNot: (isUploaded) => {
            dispatch(setUploadedOrNot({
                isUploaded: isUploaded
            }));
        },
        submitChangedOrNot: (isChanged) => {
            dispatch(setChangedOrNot({
                isChanged: isChanged
            }));
        },
        submitContainerBorderStyle: (isActive) => {
            dispatch(setContainerBorderStyle({
                isActive: isActive
            }))
        },
        submitGeneratingOrNot: (isGenerating) => {
            dispatch(setIsGeneratingOrNot({
                isGenerating: isGenerating
            }))
        },
        submitCanTypeOrNot: (canType) => {
            dispatch(setCanTypeOrNot({
                canType: canType
            }))
        },
        submitQuestion: (question) => {
            dispatch(setQuestion({
                question: question
            }))
        },
        submitFunctionalitiesActiveOrNot: (isActive) => {
            dispatch(setActiveOrNot({
                isActive: isActive
            }))
        },
    }
}

const connectedResultContainer = connect(mapStateToProps, mapDispatchToProps)(ResultContainer);

export default connectedResultContainer;
