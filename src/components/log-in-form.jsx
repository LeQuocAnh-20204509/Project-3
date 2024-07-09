import { Component } from 'react'
import axios from 'axios'
import { setLoginOrNot } from '../react-redux/user-account-slice'
import { connect } from 'react-redux'
import { NavLink } from 'react-router-dom'

class LogInButton extends Component {
    constructor(props) {
        super(props);
        this.state = {
            isHovered: false
        }
        this.handleButtonHoveredOrNot = this.handleButtonHoveredOrNot.bind(this);
    }

    handleButtonHoveredOrNot(isHovered) {
        this.setState({
            isHovered: isHovered
        })
    }

    render() {
        return (
            <button
                onMouseEnter={(event) => this.handleButtonHoveredOrNot(true)}
                onMouseLeave={(event) => this.handleButtonHoveredOrNot(false)}
                onClick={(event) => this.props.onClickHandler()}
                style={{
                    width: "100%",
                    margin: "5% 0",
                    padding: "5%",
                    fontSize: "1.1rem",
                    border: "none",
                    cursor: "pointer",
                    backgroundColor: this.state.isHovered ? "#1974D3" : "ButtonFace",
                    color: this.state.isHovered ? "white" : "black"
                }}
            >
                Đăng nhập
            </button>
        )
    }
}

class LogInForm extends Component {
    constructor(props) {
        super(props);
        this.state = {
            username: "",
            password: "",
            errorMessages: ["", "", ""]
        };
        this.handleUsernameInputChange = this.handleUsernameInputChange.bind(this);
        this.handlePasswordInputChange = this.handlePasswordInputChange.bind(this);
        this.handleLoginButtonClick = this.handleLoginButtonClick.bind(this);
    }

    handleUsernameInputChange(event) {
        var username = event.target.value;
        var usernameError = "";
        
        if (username === "") {
            usernameError = "Tên người dùng không được phép bỏ trống";
        } else {
            usernameError = "";
        }
        var newErrorMessages = [...this.state.errorMessages];
        newErrorMessages[0] = usernameError;
        newErrorMessages[2] = "";
        this.setState({
            username: username,
            errorMessages: newErrorMessages
        })
    }

    handlePasswordInputChange(event) {
        var password = event.target.value;
        var passwordError = "";
        let pattern = new RegExp(
            "^(?=.*[a-z])(?=.*[A-Z])(?=.*\\d)(?=.*[-+_!@#$%^&*.,?]).+$"
        );
        
        if (password === "") {
            passwordError = "Mật khẩu không được phép bỏ trống";
        } else if (password.length < 6) {
            passwordError = "Mật khẩu phải có độ dài lớn hơn hoặc bằng 6";
        // } else if (!pattern.test(password)) {
        //     passwordError = "Mật khẩu phải chứa các ký tự in hoa, in thường, chữ số và ít nhất 1 ký tự đặc biệt";
        } else {
            passwordError = "";
        }
        var newErrorMessages = [...this.state.errorMessages];
        newErrorMessages[1] = passwordError;
        newErrorMessages[2] = "";
        this.setState({
            password: password,
            errorMessages: newErrorMessages
        })
    }

    handleLoginButtonClick() {
        var usernameInput = document.querySelector("#username");
        var passwordInput = document.querySelector("#password");

        var newErrorMessages = [...this.state.errorMessages];
        if (usernameInput.value === "") {
            newErrorMessages[0] = "Tên người dùng không được phép bỏ trống";
        }
        if (passwordInput.value === "") {
            newErrorMessages[1] = "Mật khẩu không được phép bỏ trống";
        }

        this.setState({
            errorMessages: newErrorMessages
        }, () => {                                  // sau khi kiem tra va cap nhat cac loi neu co thi moi thuc hien phan chinh
            if (this.state.errorMessages[0]) {
                usernameInput.focus();
            } else if (this.state.errorMessages[1]) {
                passwordInput.focus();
            } else {
                newErrorMessages[2] = "";
                this.setState({
                    errorMessages: newErrorMessages
                })
                var body = new FormData();
                body.append("username", usernameInput.value);
                body.append("password", passwordInput.value);
                axios.post("http://localhost:8000/api/login",
                    body
                ).then((response) => {
                    console.log(response);
                    this.props.submitUserLoggedIn();
                    sessionStorage.setItem("username", usernameInput.value);
                    sessionStorage.setItem("authToken", response.data.auth_token);
                    
                    var config = {
                        headers: {
                            Authorization: "Bearer " + sessionStorage.getItem("authToken")
                        }
                    }
                    axios.get("http://localhost:8000/api/me/profile-img",
                        config
                    ).then((response2) => {
                        console.log(response2)
                        if (response2.data.image) {
                            sessionStorage.setItem("userImage", response2.data.image);
                        }
                    }).catch((error2) => {
                        console.log(error2);
                        alert("Đã có lỗi xảy ra trong việc truy xuất ảnh đại diện tài khoản của bạn từ server!");
                    })
                }).catch((error) => {
                    console.log(error);
                    var newErrorMessages = [...this.state.errorMessages];
                    if (error.response) {
                        if (error.response.status === 400) {
                            if (error.response.data.Exception.includes("Request was throttled.")) {
                                var errMessage = error.response.data.Exception;
                                var startIndex = errMessage.indexOf("in") + 3;
                                var endIndex = errMessage.indexOf("seconds") - 1;
                                var timeToWait = Number(errMessage.substring(startIndex, endIndex));
                                alert("Bạn đã thử đăng nhập quá nhiều lần, vui lòng thử lại trong " + timeToWait + " giây nữa!");
                            } else if (error.response.data.message === "Invalid email or password") {
                                newErrorMessages[2] = "Tên người dùng hoặc mật khẩu không đúng";
                                this.setState({
                                    errorMessages: newErrorMessages
                                })
                            }
                        } else if (error.response.status === 500) {
                            alert("Server gặp lỗi trong quá trình đăng nhập cho bạn, xin vui lòng thử lại!");
                        }
                    } else if (error.request) {
                        alert("Server không phản hồi!");
                    }
                })
            }
        });

        
    }

    render() {
        var resultDiv = <div
            style={{
                // height: "30vh",
                width: "30%",
                margin: "0 auto",
                fontSize: "1.5rem",
                fontWeight: "500",
                padding: "7% 5%",
                boxShadow: "5px 0 5px rgba(0, 0, 0, 0.19), -5px 0 5px rgba(0, 0, 0, 0.19)"
            }}
        >
            <i className='fa fa-check-circle-o' aria-hidden
                style={{
                    color: "green"
                }}
            ></i>
            &nbsp;Đăng nhập thành công!<br/>
            Bạn vui lòng chuyển hướng đến trang chủ để tiếp tục sử dụng hệ thống.
        </div>
        return (
            this.props.isUserLoggedIn ?
            resultDiv :
            <>
            <div
                style={{
                    width: "25vw",
                    margin: "0 auto",
                    padding: "0 5% 2%",
                    boxShadow: "2px 0 2px rgba(0, 0, 0, 0.19), -2px 0 2px rgba(0, 0, 0, 0.19)"
                }}
            >
                <h1>Đăng nhập</h1>
                <div>
                    Vui lòng điền tên người dùng và mật khẩu bên dưới để đăng nhập
                </div>
                <br/>
                <div>
                    <label
                        style={{
                            fontSize: "1.2rem",
                            fontWeight: "600"
                        }}
                    >
                        Tên người dùng
                    </label>
                    <div
                        style={{
                            display: "flex",
                            alignItems: "center",
                        }}
                    >
                        <i className='fa fa-user-o' aria-hidden
                            style={{
                                height: "25px",
                                fontSize: "1.2rem",
                                padding: "3%",
                                border: "1px solid black",
                                borderTopLeftRadius: "5px",
                                borderBottomLeftRadius: "5px"
                            }}
                        ></i>
                        <input type='text' id="username" required
                            onChange={this.handleUsernameInputChange}
                            style={{
                                width: "94%",
                                height: "25px",
                                padding: "3%",
                                margin: "3% 0",
                                fontSize: "1.2rem",
                                borderTopRightRadius: "5px",
                                borderBottomRightRadius: "5px",
                                borderStyle: "solid",
                                borderWidth: "1px"
                            }}
                        />
                    </div>
                    {
                        (this.state.errorMessages[0] === "") ?
                        "" :
                        <div
                            style={{
                                color: "red",
                                fontSize: "0.7rem",
                                fontStyle: "italic",
                                marginBottom: "3%"
                            }}
                        >
                            {this.state.errorMessages[0]}
                        </div>
                    }
                </div>
                <div>
                    <div
                        style={{
                            display: "flex",
                            justifyContent: "space-between",
                        }}
                    >
                        <label
                            style={{
                                fontSize: "1.2rem",
                                fontWeight: "600"
                            }}
                        >
                            Mật khẩu
                        </label>
                        <a href=""
                            style={{
                                fontSize: "1rem",
                                fontStyle: "italic",
                                textDecoration: "underline"
                            }}
                        >Quên mật khẩu</a>
                    </div>
                    <div
                        style={{
                            display: "flex",
                            alignItems: "center"
                        }}
                    >
                        <i className='fa fa-key' aria-hidden
                            style={{
                                height: "25px",
                                fontSize: "1.2rem",
                                padding: "3%",
                                border: "1px solid black",
                                borderTopLeftRadius: "5px",
                                borderBottomLeftRadius: "5px"
                            }}
                        ></i>
                        <input type='password' id="password" required
                            onChange={this.handlePasswordInputChange}
                            style={{
                                    width: "94%",
                                    height: "25px",
                                    padding: "3%",
                                    margin: "3% 0",
                                    fontSize: "1.2rem",
                                    borderTopRightRadius: "5px",
                                    borderBottomRightRadius: "5px",
                                    borderStyle: "solid",
                                    borderWidth: "1px"
                                }}
                        />
                    </div>
                    {
                        (this.state.errorMessages[1] === "") ?
                        "" :
                        <div
                            style={{
                                color: "red",
                                fontSize: "0.7rem",
                                fontStyle: "italic",
                                marginBottom: "2%"
                            }}
                        >
                            {this.state.errorMessages[1]}
                        </div>
                    }
                </div>
                {
                    (this.state.errorMessages[2] === "") ?
                    "" :
                    <div
                        style={{
                            color: "red",
                            fontSize: "0.7rem",
                            fontStyle: "italic",
                            margin: "3% 0 2%"
                        }}
                    >
                        {this.state.errorMessages[2]}
                    </div>
                }
                <LogInButton onClickHandler={this.handleLoginButtonClick} />
                <div
                    style={{
                        marginTop: "2%"
                    }}
                >
                    Chưa có tài khoản?&nbsp;
                    <NavLink to={"/signup"}
                        style={{
                            fontStyle: "italic",
                            textDecoration: "underline"
                        }}
                    >Đăng ký ngay</NavLink>
                </div>
            </div>
            </>
        )
    }
}

const mapStateToProps = (state) => {
    return {
        isUserLoggedIn: state.userAccount.isLoggedIn
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        submitUserLoggedIn: () => {
            dispatch(setLoginOrNot({
                isLoggedIn: true
            }))
        },
        
    }
}

const connectedLoginForm = connect(mapStateToProps, mapDispatchToProps)(LogInForm);

export default connectedLoginForm;
