import { Component } from "react";
import { Link } from "react-router-dom";
import { setActive } from "../react-redux/navbar-slice";
import { connect } from "react-redux";
import userComments from "../user-comments";
import defaultImage from "../userAvatars/defaultImage.jpg";

class CommentsContainer extends Component {
    count = 0;

    constructor(props) {
        super(props);
        this.state = {
            comments: [],
            isAddCommentButtonActive: false
        }
        this.getComments = this.getComments.bind(this);
        this.handleTextareaChange = this.handleTextareaChange.bind(this);
        this.addComment = this.addComment.bind(this);
    }

    componentDidMount() {
        if (this.count === 0) this.getComments();
    }

    getComments() {
        this.count++;

        this.setState({
            comments: userComments
        })
    };

    processMultipleLinesComment(comment) {
        return comment.split("\n").map((value, index, array) => {
            return <div key={value}>{value}</div>
        })
    }

    handleTextareaChange(event) {
        if (event.target.value === "") {
            this.setState({
                isAddCommentButtonActive: false
            })
        } else {
            this.setState({
                isAddCommentButtonActive: true
            })
        }
    }

    addComment() {
        var commentBox = document.querySelector("#comment-box");
        var userComment = commentBox.value;
        var newComments = [...this.state.comments];
        newComments.push({
            userImg: this.props.userImg,
            name: sessionStorage.getItem("username"),
            comment: userComment
        });
        this.setState({
            isAddCommentButtonActive: false,
            comments: newComments
        });
        commentBox.value = "";
    }

    render() {
        var commentDivsArray = [];
        var length = this.state.comments.length;
        this.state.comments.forEach((value, index) => {
            var commentDiv = <div key={"userComment" + index+1}
                                style={{
                                    display: "flex",
                                    border: "0.25px solid gray",
                                    borderBottom: (index === length - 1) ? "0.25px solid gray" : "none",
                                    borderRadius: "3px",
                                    padding: "10px",
                                    gap: "10px",
                                    alignItems: "center",
                                    fontSize: "0.9rem"
                                }}
                            >
                                <img src={value.userImg} alt="User-image"
                                    style={{
                                        width: "40px",
                                        height: "40px",
                                        borderRadius: "50%"
                                    }}
                                />
                                <div
                                    style={{

                                    }}
                                >
                                    <b>{value.name}</b>
                                    <div>{this.processMultipleLinesComment(value.comment)}</div>
                                </div>
                            </div>;
            commentDivsArray.push(commentDiv);
        })
        return (
            <div
                style={{
                    width: "70%",
                    height: "fit-content",
                    margin: "0 auto",
                    padding: "20px",
                    boxShadow: "0 4px 20px -10px rgba(0, 0, 0, 0.2), 0 -4px 20px -10px rgba(0, 0, 0, 0.19)",
                    
                }}
            >
                <h3
                    style={{
                        marginBlockStart: 0
                    }}
                >&nbsp;&nbsp;&nbsp;Bình luận ({this.state.comments.length})</h3>
                {commentDivsArray}
                
                {
                    this.props.isUserLoggedIn ?
                    <div
                        style={{
                            display: "flex",
                            marginTop: "10px",
                        }}
                    >
                        <div
                            style={{
                                border: "1px solid gray",
                                padding: "1.5%"
                            }}
                        >
                            <img src=/*{this.props.userImg}*/{defaultImage} alt="user-image"
                                style={{
                                    width: "40px",
                                    height: "40px",
                                    borderRadius: "50%"
                                }}
                            />
                        </div>
                        <textarea id="comment-box" placeholder="Thêm bình luận..."
                            onInput={this.handleTextareaChange}
                            style={{
                                padding: "1%",
                                fontSize: "1rem",
                                width: "80%",
                                fontFamily: "inherit"
                            }}
                        />
                        <button
                            onClick={this.addComment}
                            style={{
                                border: "none",
                                cursor: this.state.isAddCommentButtonActive ? "pointer" : "not-allowed",
                                fontSize: "inherit",
                                color: this.state.isAddCommentButtonActive ? "white" : "grayText",
                                marginLeft: "1%",
                                backgroundColor: this.state.isAddCommentButtonActive? "#1974d3" : "#f0f0f0"
                            }}
                        >
                            Bình luận
                        </button>
                    </div> :
                    <button>
                        <Link to={"/login"}
                            onClick={this.props.submitAccountActive}
                            style={{
                                fontSize: "1rem"
                            }}
                        >
                            <i className="fa fa-user fa-lg fa-fw" aria-hidden></i>
                            &nbsp;Đăng nhập để bình luận
                        </Link>
                    </button>
                }
            </div>
        )
    }
}

const mapStateToProps = (state) => {
    return {
        isUserLoggedIn: state.userAccount.isLoggedIn,
        userImg: state.userAccount.info.image,
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        submitAccountActive: () => {
            dispatch(setActive({
                index: 3
            }))
        }
    }
}

const connectedCommentsContainer = connect(mapStateToProps, mapDispatchToProps)(CommentsContainer);

export default connectedCommentsContainer;
