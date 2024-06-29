"use client"

import { NavLink } from "react-router-dom"
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
import { Component } from "react"
import axios from "axios"
import "../global.css"

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
            usernameError = "Tên đăng nhập không được để trống";
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
            newErrorMessages[1] = "Tên đăng nhập không được để trống";
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
                                newErrorMessages[3] = "Tên đăng nhập " + usernameInput.value + " đã tồn tại trong hệ thống";
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
            // <form>
                <Card className="mx-auto max-w-sm">
                    <CardHeader>
                        <CardTitle className="text-xl">Sign Up</CardTitle>
                        <CardDescription>
                            Enter your information to create an account
                        </CardDescription>
                    </CardHeader>
                    <CardContent>
                        <div className="grid gap-4">
                            <div className="grid gap-2">
                                <Label htmlFor="email">Email</Label>
                                <Input
                                    onChange={this.handleEmailInputChange}
                                    id="email"
                                    type="email"
                                    placeholder="m@example.com"
                                    required
                                    name="email"
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
                                <Label htmlFor="username">Username</Label>
                                <Input id="username" type="username" name="username" required
                                    onChange={this.handleUsernameInputChange}
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
                            <div className="grid gap-2">
                                <Label htmlFor="password">Password</Label>
                                <Input id="password" type="password" name="password" required
                                    onChange={this.handlePasswordInputChange}
                                />
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
                            </div>

                            {
                                (this.state.errorMessages[3] === "") ?
                                "" :
                                <div
                                    style={{
                                        color: "red",
                                        fontSize: "0.7rem",
                                        fontStyle: "italic"
                                    }}
                                >
                                    {this.state.errorMessages[3]}
                                </div>
                            }
                            
                            <Button onClick={this.handleSignUpButtonClick}
                                className="w-full"
                            >
                                Create an account
                            </Button>
                        </div>
                        <div className="mt-4 text-center text-sm">
                            Already have an account?{" "}
                            <NavLink 
                                to={"/login"}
                                className="underline"
                            >
                                Sign in
                            </NavLink>
                        </div>
                    </CardContent>
                </Card>
            // </form>
        )
    }
}

export default SignUpForm;
