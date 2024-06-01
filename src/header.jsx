import { Component } from "react";
import { NavLink } from "react-router-dom";
import { setActive } from "./react-redux/navbar-slice";
import { connect } from "react-redux";

class Header extends Component {
    constructor(props) {
        super(props);
        this.changeActive = this.changeActive.bind(this);
    }

    changeActive() {
        this.props.submitActive();
    }

    render() {
        return(
            <NavLink to={"/"}>
                <header
                    onClick={this.changeActive}
                    style={{
                        height: "100px",
                        width: "100%",
                        padding: "30px 0",
                        fontSize: "2rem",
                        fontWeight: "500",
                        textAlign: "center",
                        backgroundColor: "whitesmoke"
                    }}
                >
                    <div
                        style={{
                            display: "flex",
                            margin: "0 auto",
                            justifyContent: "center",
                        }}
                    >
                        <img src={require('./images/ocr-image.png')} alt="ocr-image"
                            style={{
                                width: "2.5rem"
                            }}
                        />
                        OCR
                    </div>
                    Hệ thống sinh câu hỏi trắc nghiệm từ hình ảnh
                </header>
            </NavLink>
        )
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        submitActive: () => {
            dispatch(setActive({
                index: 0
            }))
        }
    }
}

const connectedHeader = connect(null, mapDispatchToProps)(Header);

export default connectedHeader;
