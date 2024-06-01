import { Component } from "react";
import ImageUploader from "./image-uploader";
import RatingStarsContainer from "./rating-stars-container";
import { TypeAnimation } from "react-type-animation";
import { Link } from "react-router-dom";
import { setUploadedOrNot, setChangedOrNot, setContainerBorderStyle } from "./react-redux/image-upload-slice";
import { setActiveOrNot } from "./react-redux/rate-share-comment-slice";
import { setIsGeneratingOrNot, setCanTypeOrNot, setQuestion } from "./react-redux/question-generating-slice";
import { connect } from "react-redux";
import { setActive } from "./react-redux/navbar-slice";

const axios = require("axios");

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
    constructor(props) {
        super(props);
        this.state = {
            question: ""
        };
        this.generateQuestion = this.generateQuestion.bind(this);
    }

    generateQuestion(event) {
        if (!this.props.isImageUploaded) {
            alert("Bạn chưa upload ảnh!");
        } else if (!this.props.isImageChanged) {
            alert("Ảnh chưa được thay đổi!");
        } else {
            this.props.submitContainerBorderStyle(true);
            this.props.submitGeneratingOrNot(true);
            console.log(this.props.canType);
            var questionContainer = document.querySelector("#question_container");
            setTimeout(() => {
                var randomIndex = Math.floor(Math.random() * 10);
                this.props.submitGeneratingOrNot(false);
                var generatedQuestion = "Example question, this is a random question: The book is: " + "\nA. Toan " + randomIndex 
                                        + "\nB. Tieng Viet " + randomIndex + "\nC. Tieng Anh " + randomIndex 
                                        + "\nD. Luyen viet " + randomIndex;
                this.setState({
                    question: generatedQuestion
                }, () => {
                    this.props.submitCanTypeOrNot(true);
                });
                this.props.submitQuestion(generatedQuestion.split("\n"));
                questionContainer.scrollIntoView();
                this.props.submitChangedOrNot(false);
            }, 2000);
            // axios.post("http://localhost:8000/api/submissions", {
            //     FILES: [imgSrc]
            // }).then((response1) => {
            //     console.log(response1);
            //     axios.post(
            //         "http://localhost:8000/api/file/" + response1.data.file_ids + "/generate"
            //     ).then((response2) => {
            //         console.log(response2);
            //     }).catch((error2) => {
            //         console.log(error2);
            //     })
            // }).catch((error) => {
            //     console.log(error);
            // });
        }

    }

    processGeneratedQuestion(generatedQuestion) {
        var mappedDivQuestion = generatedQuestion.map((value, index, array) => {
            return <div key={value}>{value}</div>;
        });
        return mappedDivQuestion;
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
                            padding: "10%",
                            boxShadow: "5px 0 15px rgba(0, 0, 0, 0.2), -5px 0 15px rgba(0, 0, 0, 0.2)"
                        }}
                    >
                        <b>Câu hỏi:</b>
                        <div>
                            {
                                this.props.isFunctionalitiesActive ?            // neu da sinh cau hoi roi thi hien thi luon, su dung isFunctionalitiesActive vi khi da sinh cau hoi ra xong thi cung la luc active
                                this.processGeneratedQuestion(this.props.generatedQuestion) :
                                ((this.props.canType) ?
                                    <TypeAnimation 
                                        sequence={[
                                            this.state.question,
                                            () => {
                                                this.props.submitFunctionalitiesActiveOrNot(true);
                                                console.log("test: " + this.state.question);
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
                            fontSize: "1.15rem",
                            color: this.props.isFunctionalitiesActive ? "black" : "GrayText"
                        }}
                    >
                        <div>
                            {
                                this.props.isFunctionalitiesActive ?
                                <img src={require("./images/like-icon.png")} className="fa fa-fw"
                                    style={{
                                        width: "22px",
                                        marginRight: "8px",
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
                        <div
                            style={{
                                fontSize: "1em",
                                cursor: "pointer"
                            }}
                        >
                            <i className="fa fa-share fa-lg fa-fw" aria-hidden
                                style={{
                                    color: this.props.isFunctionalitiesActive ? "Highlight" : "GrayText"
                                }}
                            ></i>
                            &nbsp;Chia sẻ
                        </div>
                        <Link to={"/login"}
                            onClick={this.props.submitAccountActive}
                            style={{
                                fontSize: "1em",
                                cursor: "pointer"
                            }}
                        >
                            <i className="fa fa-user fa-lg fa-fw" aria-hidden
                                style={{
                                    color: this.props.isFunctionalitiesActive ? "#4b4b4b" : "GrayText"
                                }}
                            ></i>
                            &nbsp;Đăng nhập để bình luận
                        </Link>
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
        isGenerating: state.questionGenerating.isGenerating,
        canType: state.questionGenerating.canType,
        generatedQuestion: state.questionGenerating.question,
        isFunctionalitiesActive: state.rateShareComment.isActive
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
