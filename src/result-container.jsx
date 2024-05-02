import { Component } from "react";
import "./result-container.css";
import ImageUploader from "./image-uploader";
import RatingStarsContainer from "./rating-stars-container";
import { TypeAnimation } from "react-type-animation";

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
        }, () => {console.log("test1")});
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
                        backgroundColor: "cornflowerblue",
                        fontSize: "large",
                        fontWeight: "500",
                        margin: "0 auto",
                        border: "none",
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
            canGenerate: false,
            question_arr: [],
            isGeneratingFinished: false
        };
        this.generateQuestion = this.generateQuestion.bind(this);
    }

    generateQuestion(event) {
        this.setState({
            canGenerate: true,
            question_arr: "Example question: The book is:\nA. Toan 2\nB. Tieng Viet 2\nC. Tieng Anh 2\nD. Luyen viet 2"
        }, () => {console.log("test1")});
    }

    setIsFinishedGenerating() {
        this.setState({
            isGeneratingFinished: true
        })
    }

    render() {
        return (
            <>
                <div
                    style={{
                        display: "grid",
                        gridTemplateColumns: "60% 25%",
                        alignItems: "center",
                        justifyItems: "center",
                        width: "100%"
                    }}
                >
                    <ImageUploader />
                    <GenerateButton onClick={this.generateQuestion}/>
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
                    <div
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
                                this.state.canGenerate ?
                                <TypeAnimation 
                                    sequence={[this.state.question_arr, 1000]}
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
                            fontSize: "1.1rem"
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
                                <RatingStarsContainer />
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
                        <div
                            style={{
                                fontSize: "1em",
                                cursor: "pointer"
                            }}
                        >
                            <i className="fa fa-user fa-fw" aria-hidden></i>
                            &nbsp;Đăng nhập để bình luận
                        </div>
                    </div>
                </div>
            </>
        )
    }
}

export default ResultContainer;
