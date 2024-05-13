import { Component } from "react";
import "./result-container.css";
import ImageUploader from "./image-uploader";
import RatingStarsContainer from "./rating-stars-container";
import { TypeAnimation } from "react-type-animation";
import { Link, useNavigate } from "react-router-dom";

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
                        height: 60,
                        width: 160,
                        color: "white",
                        backgroundColor: this.state.backgroundColor,
                        fontSize: "large",
                        fontWeight: "500",
                        margin: "0 auto",
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
            canType: false,
            isImageUploaded: false,
            isImageChanged: false,
            question_arr: [],
            isGenerating: false,
            isTypingFinished: false
        };
        this.generateQuestion = this.generateQuestion.bind(this);
        this.setIsImageUploaded = this.setIsImageUploaded.bind(this);
        this.setIsImageChanged = this.setIsImageChanged.bind(this);
    }

    generateQuestion(event) {
        if (!this.state.isImageUploaded) {
            alert("Bạn chưa upload ảnh!");
        } else if (!this.state.isImageChanged) {
            alert("Ảnh chưa được thay đổi!");
        } else {
            this.setState({
                canType: false,
                isGenerating: true,
                isTypingFinished: false
            });
            var questionContainer = document.querySelector("#question_container");
            setTimeout(() => {
                var randomIndex = Math.floor(Math.random() * 10);
                this.setState({
                    canType: true,
                    isGenerating: false,
                    question_arr: "Example question, this is a random question: The book is: " + randomIndex + ":\nA. Toan " + randomIndex 
                                    + "\nB. Tieng Viet " + randomIndex + "\nC. Tieng Anh " + randomIndex 
                                    + "\nD. Luyen viet " + randomIndex
                }, () => {
                    questionContainer.scrollIntoView();
                    this.setState({
                        isImageChanged: false
                    })
                });
            }, 2000);
        }

    }

    setIsImageUploaded(isUploaded) {
        this.setState({
            isImageUploaded: isUploaded
        })
    }

    setIsImageChanged(isChanged) {
        this.setState({
            isImageChanged: isChanged
        });
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
                        gridTemplateColumns: "60% 9% 20%",
                        alignItems: "center",
                        justifyItems: "center",
                        width: "100%"
                    }}
                >
                    <ImageUploader setIsImageUploaded={this.setIsImageUploaded} setIsImageChanged={this.setIsImageChanged} />
                    {
                        this.state.isGenerating ?
                        <div>
                            <i className="fa fa-spinner fa-pulse fa-3x fa-fw"></i>
                            <div
                                style={{
                                    marginTop: "15px",
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
                            border: "1px solid gray",
                            padding: "10%"
                        }}
                    >
                        <b>Câu hỏi:</b>
                        <div>
                            {
                                (this.state.canType) ?
                                <TypeAnimation 
                                    sequence={[
                                        this.state.question_arr,
                                        () => {
                                            this.setState({
                                                isTypingFinished: true
                                            })
                                        }
                                    ]}
                                    speed={160}
                                    style={{
                                        whiteSpace: "pre-line",
                                    }}
                                    cursor={false}
                                    omitDeletionAnimation
                                    
                                /> : ""
                            }
                        </div>
                    </div>

                    <div
                        style={{
                            padding: "5%",
                            fontSize: "1.1rem",
                            color: this.state.isTypingFinished && this.state.isImageUploaded ? "black" : "GrayText"
                        }}
                    >
                        <div>
                            <i className="fa fa-thumbs-o-up fa-fw" aria-hidden></i>
                            &nbsp;Bạn đánh giá thế nào về câu hỏi được sinh ra này ?&nbsp;&nbsp;
                            <div
                                style={{
                                    display: "inline-block",
                                    cursor: "pointer"
                                }}
                            >
                                <RatingStarsContainer isImageUploaded={this.state.isImageUploaded} 
                                                    isTypingFinished={this.state.isTypingFinished} 
                                />
                            </div>
                        </div>
                        <div
                            style={{
                                fontSize: "1em",
                                cursor: "pointer"
                            }}
                        >
                            <i className="fa fa-share fa-fw" aria-hidden></i>
                            &nbsp;Chia sẻ
                        </div>
                        <Link to={"/login"}
                            style={{
                                fontSize: "1em",
                                cursor: "pointer"
                            }}
                        >
                            <i className="fa fa-user fa-fw" aria-hidden></i>
                            &nbsp;Đăng nhập để bình luận
                        </Link>
                    </div>
                </div>
            </div>
        )
    }
}

export default ResultContainer;
