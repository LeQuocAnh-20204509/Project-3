import { Component } from "react"
import axios from "axios"
import { NavLink } from "react-router-dom"

class SignUpButton extends Component {
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
                Đăng ký
            </button>
        )
    }
}

class SignUpForm extends Component {
    constructor(props) {
        super(props);
        this.state = {
            email: "",
            username: "",
            password: "",
            errorMessages: ["", "", "", ""]
        }
        this.handleEmailInputChange = this.handleEmailInputChange.bind(this);
        this.handleUsernameInputChange = this.handleUsernameInputChange.bind(this);
        this.handlePasswordInputChange = this.handlePasswordInputChange.bind(this);
        this.handleSignUpButtonClick = this.handleSignUpButtonClick.bind(this);
    }

    handleEmailInputChange(event) {
        var email = event.target.value;
        var emailError = "";
        const emailPattern = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;

        if (email === "") {
            emailError = "Email không được để trống"
        } else if (!emailPattern.test(email)) {
            emailError = "Không đúng định dạng email";
        } else {
            emailError = "";
        }
        var newErrorMessages = [...this.state.errorMessages];
        newErrorMessages[0] = emailError;
        newErrorMessages[3] = "";
        this.setState({
            email: email,
            errorMessages: newErrorMessages
        })
    }

    handleUsernameInputChange(event) {
        var username = event.target.value;
        var usernameError = "";
        
        if (username === "") {
            usernameError = "Tên người dùng không được để trống";
        } else {
            usernameError = "";
        }
        var newErrorMessages = [...this.state.errorMessages];
        newErrorMessages[1] = usernameError;
        newErrorMessages[3] = "";
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
            passwordError = "Mật khẩu không được để trống";
        } else if (password.length < 6) {
            passwordError = "Mật khẩu phải có độ dài lớn hơn hoặc bằng 6";
        // } else if (!pattern.test(password)) {
        //     passwordError = "Mật khẩu phải chứa các ký tự in hoa, in thường, chữ số và ít nhất 1 ký tự đặc biệt";
        } else {
            passwordError = "";
        }
        var newErrorMessages = [...this.state.errorMessages];
        newErrorMessages[2] = passwordError;
        newErrorMessages[3] = "";
        this.setState({
            password: password,
            errorMessages: newErrorMessages
        })
    }

    handleSignUpButtonClick(event) {
        var emailInput = document.querySelector("#email");
        var usernameInput = document.querySelector("#username");
        var passwordInput = document.querySelector("#password");

        var newErrorMessages = [...this.state.errorMessages];
        if (emailInput.value === "") {
            newErrorMessages[0] = "Email không được để trống";
        }
        if (usernameInput.value === "") {
            newErrorMessages[1] = "Tên người dùng không được để trống";
        }
        if (passwordInput.value === "") {
            newErrorMessages[2] = "Mật khẩu không được để trống";
        }

        this.setState({
            errorMessages: newErrorMessages
        }, () => {                                      // sau khi kiem tra xem co loi ko va cap nhat errorMessages thi moi thuc hien phan chinh
            if (this.state.errorMessages[0]) {
                emailInput.focus();
            } else if (this.state.errorMessages[1]) {
                usernameInput.focus();
            } else if (this.state.errorMessages[2]) {
                passwordInput.focus();
            } else {
                newErrorMessages[3] = "";
                this.setState({
                    errorMessages: newErrorMessages
                })
                var data = {
                    email: emailInput.value,
                    username: usernameInput.value,
                    password: passwordInput.value
                };
                var jsonData = JSON.stringify(data);
                axios.post("http://localhost:8000/api/register",
                    jsonData
                ).then((response) => {
                    alert("Đăng ký tài khoản thành công!"
                        + "\nBạn sẽ được điều hướng đến trang Đăng nhập."
                    );
                    window.location.href = "http://localhost:3000/login";
                }).catch((error) => {
                    console.log(error);
                    if (error.response) {
                        console.log(error.response.data.Exception);
                        console.log(error.response.data.Exception.includes("Duplicate entry"))
                        if (error.response.status === 400) {
                            var newErrorMessages = [...this.state.errorMessages];
                            if (error.response.data.message === "Email already exists") {
                                newErrorMessages[3] = "Email đã được đăng ký bởi tài khoản khác trong hệ thống";
                            } else if (error.response.data.Exception.includes("Duplicate entry")) {
                                newErrorMessages[3] = "Tên người dùng " + usernameInput.value + " đã tồn tại trong hệ thống";
                            } else if (error.response.data.Exception.includes("Request was throttled.")) {
                                var errMessage = error.response.data.Exception;
                                var startIndex = errMessage.indexOf("in") + 3;
                                var endIndex = errMessage.indexOf("seconds") - 1;
                                var timeToWait = Number(errMessage.substring(startIndex, endIndex));
                                alert("Bạn đã thử đăng ký quá nhiều lần, vui lòng thử lại trong " + timeToWait + " giây nữa!");
                            }
                            else {
                                alert("Lỗi xảy ra bởi vì yêu cầu từ máy bạn sai!");
                            };
                            this.setState({
                                errorMessages: newErrorMessages
                            })
                        } else if (error.response.status === 500) {
                            alert("Server gặp lỗi trong lúc đăng ký tài khoản cho bạn, xin vui lòng thử lại!");
                        } else {
                            alert("Đã có lỗi xảy ra trong quá trình gửi đăng ký, xin vui lòng thử lại!");
                        }
                    } else if (error.request) {
                        alert("Server không phản hồi!");
                    }
                })
            }
        });

        
    }

    render() {
        return (
            <div
                style={{
                    width: "25vw",
                    margin: "0 auto",
                    padding: "0 5% 2%",
                    boxShadow: "2px 0 2px rgba(0, 0, 0, 0.19), -2px 0 2px rgba(0, 0, 0, 0.19)"
                }}
            >
                <h1>Đăng ký</h1>
                <div>
                    Vui lòng điền đầy đủ thông tin bên dưới để đăng ký tài khoản
                </div>
                <br/>
                <div>
                    <label
                        style={{
                            fontSize: "1.2rem",
                            fontWeight: "600"
                        }}
                    >
                        Email
                    </label>
                    <div
                        style={{
                            display: "flex",
                            alignItems: "center",
                        }}
                    >
                        <i className='fa fa-envelope-o' aria-hidden
                            style={{
                                height: "25px",
                                fontSize: "1.2rem",
                                padding: "3%",
                                border: "1px solid black",
                                borderTopLeftRadius: "5px",
                                borderBottomLeftRadius: "5px"
                            }}
                        ></i>
                        <input type='email' id="email" required placeholder="a@example.com"
                            onChange={this.handleEmailInputChange}
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
                        <input type='text' id="username" required placeholder="username"
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
                        (this.state.errorMessages[1] === "") ?
                        "" :
                        <div
                            style={{
                                color: "red",
                                fontSize: "0.7rem",
                                fontStyle: "italic",
                                marginBottom: "3%"
                            }}
                        >
                            {this.state.errorMessages[1]}
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
                        <input type='password' id="password" required placeholder="password"
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
                        (this.state.errorMessages[2] === "") ?
                        "" :
                        <div
                            style={{
                                color: "red",
                                fontSize: "0.7rem",
                                fontStyle: "italic",
                                marginBottom: "2%"
                            }}
                        >
                            {this.state.errorMessages[2]}
                        </div>
                    }
                </div>
                {
                    (this.state.errorMessages[3] === "") ?
                    "" :
                    <div
                        style={{
                            color: "red",
                            fontSize: "0.7rem",
                            fontStyle: "italic",
                            margin: "3% 0 2%"
                        }}
                    >
                        {this.state.errorMessages[3]}
                    </div>
                }
                <SignUpButton onClickHandler={this.handleSignUpButtonClick} />
                <div
                    style={{
                        marginTop: "2%"
                    }}
                >
                    Đã có tài khoản?&nbsp;
                    <NavLink to={"/login"}
                        style={{
                            fontStyle: "italic",
                            textDecoration: "underline"
                        }}
                    >Đăng nhập</NavLink>
                </div>
            </div>
        )
    }
}

export default SignUpForm;
