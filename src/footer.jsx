import { Component } from "react";

class Footer extends Component {
    render() {
        return (
            <footer>
                <div
                    style={{
                        display: "grid",
                        gridTemplateColumns: "50% 50%",
                        justifyItems: "center",
                        alignItems: "center",
                        height: "150px",
                        color: "white",
                        backgroundColor: "#161c28"
                    }}
                >
                    <div id="contacts"
                        style={{
                            display: "flex",
                            flexDirection: "column",
                            justifyContent: "space-around",
                            gap: "7px",
                            color: "GrayText",
                        }}
                    >
                        <div
                            style={{
                                color: "white"
                            }}
                        >Contact us:</div>
                        <a href="https://www.facebook.com/lequocanh.1208"
                            style={{
                                fontSize: "0.9rem",
                                color: "GrayText",
                                textDecoration: "none"
                            }}
                        >
                            <i className="fa fa-facebook" aria-hidden></i>
                            &nbsp;&nbsp;Facebook
                        </a>
                        <a href="https://www.youtube.com/watch?v=boO4QDHnn_w"
                            style={{
                                fontSize: "0.9rem",
                                color: "GrayText",
                                textDecoration: "none"
                            }}
                        >
                            <i className="fa fa-youtube" aria-hidden></i>
                            &nbsp;&nbsp;Youtube
                        </a>
                    </div>

                    <div>
                        <div>Bản quyền thuộc về nhóm sinh viên Trường Đại học Bách khoa Hà Nội</div>
                        <div
                            style={{
                                marginTop: "10px"
                            }}
                        >Số 1 Đại Cồ Việt, Hai Bà Trưng, Hà Nội</div>
                    </div>
                </div>
            </footer>
        )
    }
}

export default Footer;
