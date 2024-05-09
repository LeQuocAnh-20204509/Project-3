import { Component } from "react";
import defaultImage from "./userAvatars/defaultImage.jpg";
import image1 from "./userAvatars/image1.jpg";
import image3 from "./userAvatars/image3.jpg";
import image4 from "./userAvatars/image4.png";
import image6 from "./userAvatars/image6.jpg";
import image7 from "./userAvatars/image7.jpg";
import image8 from "./userAvatars/image8.jpg";
import { Link } from "react-router-dom";

class CommentsContainer extends Component {
    constructor(props) {
        super(props);
        this.state = {
            comments: []
        }
        this.getComments = this.getComments.bind(this);
    }

    componentDidMount() {
        setTimeout(this.getComments, 1000);
    }

    getComments() {
        var userComments = [];
        userComments.push({
            userImg: image1,
            comment: "Câu hỏi tốt phù hợp với bức ảnh."
        });
        userComments.push({
            userImg: defaultImage,
            comment: "Mình rất thích câu hỏi này! Đánh giá 5 sao."
        });
        userComments.push({
            userImg: image3,
            comment: "Câu hỏi chưa thực sự nêu ra bộ phận A là gì"
        });
        userComments.push({
            userImg: image4,
            comment: "Câu hỏi không đúng, tệ."
        });
        userComments.push({
            userImg: defaultImage,
            comment: "Tốt, rất phù hợp cho 1 giáo viên như tôi, không cần phải mất công tự ra đề "
                    + "hay tìm tòi ở trên mạng mỗi khi đến giờ ra bài kiểm tra cho học sinh nữa.\n"
                    + "Rate 5 sao!"
        });
        userComments.push({
            userImg: image6,
            comment: "Câu hỏi chưa thực sự đúng với mong muốn của mình, "
                    + "mong hệ thống cải thiện việc cho chọn hướng mà người dùng muốn câu hỏi được sinh ra"
        });
        userComments.push({
            userImg: image7,
            comment: "Very good! Excellent system :)"
        });
        userComments.push({
            userImg: image8,
            comment: "Sao tôi không sinh được câu hỏi ????"
        });
        userComments.push({
            userImg: defaultImage,
            comment: "Chỉ có những bức ảnh có thông tin, ngữ cảnh rõ ràng về 1 cái gì đó thì "
                    + "hệ thống mới có thể phân tích rồi đưa ra câu hỏi đúng được các bạn ơi. "
                    + "Nên mới có những người thấy câu hỏi sinh ra không đúng, phù hợp :)))"
        });
        userComments.push({
            userImg: defaultImage,
            comment: "Quite good, I like this question."
        });

        this.setState({
            comments: userComments
        })
    };

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
                                        width: "30px",
                                        height: "30px",
                                        borderRadius: "50%"
                                    }}
                                />
                                <div>{value.comment}</div>
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
                >&nbsp;&nbsp;&nbsp;Bình luận</h3>
                {commentDivsArray}
                <button>
                    <Link to={"/login"}>
                        <i className="fa fa-user fa-fw" aria-hidden></i>
                        &nbsp;Đăng nhập để bình luận
                    </Link>
                </button>
            </div>
        )
    }
}

export default CommentsContainer;
