'use client'

// import {logIn} from '@/app/lib/actions'
import {useFormState, useFormStatus} from 'react-dom'
import {Button} from "./ui/button"
import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
} from "./ui/card"
import {Input} from "./ui/input"
import {Label} from "./ui/label"
import { Component } from 'react'
// import Link from "next/link";
import "../global.css"
import axios from 'axios'
import { setLoginOrNot } from '../react-redux/user-account-slice'
import { connect } from 'react-redux'
import { NavLink } from 'react-router-dom'

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
            usernameError = "Tên đăng nhập không được phép bỏ trống";
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
            newErrorMessages[0] = "Tên đăng nhập không được phép bỏ trống";
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
                var body = new FormData();
                body.append("username", usernameInput.value);
                body.append("password", passwordInput.value);
                axios.post("http://localhost:8000/api/login",
                    body
                ).then((response) => {
                    console.log(response);
                    this.props.submitUserLoggedIn();
                    localStorage.setItem("username", usernameInput.value);
                    localStorage.setItem("authToken", response.data.auth_token);
                    // alert("Đăng nhập thành công!"
                    //     + "\nBạn sẽ được điều hướng đến Trang chủ của hệ thống."
                    // );
    
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
                                alert("Bạn đã đăng nhập quá nhiều lần, vui lòng thử lại trong " + timeToWait + " giây nữa!");
                            } else if (error.response.data.message === "Invalid email or password") {
                                newErrorMessages[2] = "Tên đăng nhập hoặc mật khẩu không đúng";
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
            <Card className="mx-auto max-w-sm">
                <CardHeader>
                    <CardTitle className="text-2xl">Login</CardTitle>
                    <CardDescription>
                        Enter your username below to login to your account
                    </CardDescription>
                </CardHeader>
                <CardContent>
                    <div className="grid gap-4">
                        <div className="grid gap-2">
                            <Label htmlFor="username">Username</Label>
                            <Input
                                id="username"
                                onChange={this.handleUsernameInputChange}
                                name={'username'}
                                type="text"
                                required
                            />
                            {
                                (this.state.errorMessages[0] === "") ?
                                "" :
                                <div
                                    style={{
                                        color: "red",
                                        fontSize: "0.7rem",
                                        fontStyle: "italic"
                                    }}
                                >
                                    {this.state.errorMessages[0]}
                                </div>
                            }
                        </div>
                        <div className="grid gap-2">
                            <div className="flex items-center">
                                <Label htmlFor="password">Password</Label>
                                <a href="#" className="ml-auto inline-block text-sm underline">
                                    Forgot your password?
                                </a>
                            </div>
                            <Input id="password" type="password" required name={'password'}
                                onChange={this.handlePasswordInputChange}
                            />
                            {
                                (this.state.errorMessages[1] === "") ?
                                "" :
                                <div
                                    style={{
                                        color: "red",
                                        fontSize: "0.7rem",
                                        fontStyle: "italic"
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
                                    fontStyle: "italic"
                                }}
                            >
                                {this.state.errorMessages[2]}
                            </div>
                        }
                        <Button
                            onClick={this.handleLoginButtonClick}
                            className="w-full"
                        >
                            Login
                        </Button>
                    </div>

                    <div className="mt-4 text-center text-sm">
                        Don&apos;t have an account?{" "}
                        <NavLink
                            to={"/signup"}
                            style={{
                                textDecoration: "underline"
                            }}
                        >
                            Sign up
                        </NavLink>
                    </div>
                </CardContent>
            </Card>
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
