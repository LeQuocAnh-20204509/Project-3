import { Component } from "react";

class Introduction extends Component {
    render() {
        return (
            <div
                style={{
                    padding: "5% 5% 0 5%",
                    // backgroundColor: "#e2f1a0"
                }}
            >
                <h2>Giới thiệu</h2>
                <p
                    style={{
                        fontSize: "1.3rem",
                        fontWeight: "500"
                    }}
                >
                    OCR - Hệ thống sinh câu hỏi trắc nghiệm từ hình ảnh là 1 hệ thống nhận vào hình ảnh từ người dùng, sau đó phân tích
                    ngữ cảnh của hình ảnh đó gồm có những sự vật gì, các ràng buộc của những sự vật này với nhau để từ đó sinh ra
                    câu hỏi trắc nghiệm phù hợp.
                </p>
            </div>
        )
    }
}

export default Introduction;
