import { Component } from "react";
import { Link, NavLink } from "react-router-dom";
import { connect } from "react-redux";
import { setAccountFieldHoveredOrNot, setActive, setHoveredOrNot } from "../react-redux/navbar-slice";

class Navbar extends Component {

    constructor(props) {
        super(props);
        this.state = {
            
        };
        this.changeActive = this.changeActive.bind(this);
        this.changeIsHovered = this.changeIsHovered.bind(this);
        this.changeIsNotHovered = this.changeIsNotHovered.bind(this);
        this.changeItemDropdownBgColor = this.changeItemDropdownBgColor.bind(this);
        this.changeBackItemDropdownBgColor = this.changeBackItemDropdownBgColor.bind(this);
    }

    changeActive(index) {
        this.props.submitActive(index);
    }

    changeIsHovered(index) {
        this.props.submitHoveredOrNot(index, true);
    }

    changeIsNotHovered(index) {
        this.props.submitHoveredOrNot(index, false);
    }

    changeItemDropdownBgColor(index) {
        this.props.submitAccountFieldHoveredOrNot(index, true);
    }

    changeBackItemDropdownBgColor(index) {
        this.props.submitAccountFieldHoveredOrNot(index, false);
    }

    render() {
        return (
            <div
                style={{
                    width: "100%",
                    height: "60px",
                    fontSize: "1.4rem",
                    fontWeight: "500",
                    color: "white",
                    textAlign: "center",
                    backgroundColor: "#555"
                }}
            >
                <NavLink className="navbar-link" to={"/"}
                    onClick={(event) => {
                        this.changeActive(0);
                        this.changeIsNotHovered(0);
                    }}
                    onMouseEnter={(event) => this.changeIsHovered(0)} onMouseLeave={(event) => this.changeIsNotHovered(0)}
                    style={({ isActive, isPending, isTransitioning }) => {
                        return {
                            float: "left",
                            display: "flex",
                            alignItems: "center",
                            justifyContent: "center",
                            width: "25%",
                            height: "100%",
                            backgroundColor: this.props.navbarState.hovered[0] ? "black" : (this.props.navbarState.active[0] ? "#1974D3" : "#555"),
                            padding: "auto 0",
                        }
                    }}
                >
                    <i className="fa fa-home fa-fw" aria-hidden></i>
                    &nbsp;Trang chủ
                </NavLink>
                <a className="navbar-link" href="#"
                    onClick={(event) => {
                        this.changeActive(1);
                        this.changeIsNotHovered(1);
                    }}
                    onMouseEnter={(event) => this.changeIsHovered(1)} onMouseLeave={(event) => this.changeIsNotHovered(1)}
                    style={{
                        float: "left",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        width: "25%",
                        height: "100%",
                        backgroundColor: this.props.navbarState.hovered[1] ? "black" : (this.props.navbarState.active[1] ? "#1974D3" : "#555")
                    }}
                >
                    <i className="fa fa-search fa-fw" aria-hidden></i>
                    &nbsp;Về chúng tôi
                </a>
                <a className="navbar-link" href="#contacts"
                    onClick={(event) => {
                        this.changeActive(2);
                        this.changeIsNotHovered(2);
                    }}
                    onMouseEnter={(event) => this.changeIsHovered(2)} onMouseLeave={(event) => this.changeIsNotHovered(2)}
                    style={{
                        float: "left",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        width: "25%",
                        height: "100%",
                        backgroundColor: this.props.navbarState.hovered[2] ? "black" : (this.props.navbarState.active[2] ? "#1974D3" : "#555")
                    }}
                >
                    <i className="fa fa-envelope fa-fw" aria-hidden></i>
                    &nbsp;Liên hệ
                </a>
                <div className="navbar-link"
                    onMouseEnter={(event) => this.changeIsHovered(3)} onMouseLeave={(event) => this.changeIsNotHovered(3)}
                    style={{
                        float: "left",
                        display: "block",
                        position: "relative",
                        alignItems: "center",
                        justifyContent: "center",
                        width: "25%",
                        height: "100%",
                        cursor: "pointer",
                        backgroundColor: this.props.navbarState.hovered[3] ? "black" : (this.props.navbarState.active[3] ? "#1974D3" : "#555")
                    }}
                >
                    <div
                        style={{
                            display: "flex",
                            alignItems: "center",
                            justifyContent: "center",
                            height: "100%"
                        }}
                    >
                        <i className="fa fa-user fa-fw" aria-hidden></i>
                        &nbsp;Tài khoản&nbsp;
                        <i className="fa fa-angle-down" aria-hidden></i>
                    </div>
                    <div
                        style={{
                            display: this.props.navbarState.hovered[3] ? "block" : "none",
                            position: "absolute",
                            color: "black",
                            width: "100%",
                            fontSize: "1.2rem",
                            fontWeight: "450"
                        }}
                    >
                        <NavLink to={"/user-profile"} 
                            onClick={(event) => {
                                this.changeActive(3);
                                this.changeIsNotHovered(3);
                                this.changeBackItemDropdownBgColor(0);
                            }}
                            onMouseEnter={(event) => this.changeItemDropdownBgColor(0)} 
                            onMouseLeave={(event) => this.changeBackItemDropdownBgColor(0)}
                            style={{
                                display: "block",
                                backgroundColor: this.props.navbarState.accountFieldHovered[0] ? "#ffdac0" : "#f1f1f1",
                                padding: "6px 0 3px 0"
                            }}
                        >
                            <i className="fa fa-address-card-o fa-fw" aria-hidden></i>
                            &nbsp;Thông tin tài khoản
                        </NavLink>
                        <NavLink to={this.props.isUserLoggedIn ? "/logout" : "/login"} 
                            onClick={(event) => {
                                this.changeActive(3);
                                this.changeIsNotHovered(3);
                                this.changeBackItemDropdownBgColor(1);
                            }}
                            onMouseEnter={(event) => this.changeItemDropdownBgColor(1)} 
                            onMouseLeave={(event) => this.changeBackItemDropdownBgColor(1)}
                            style={{
                                display: "block",
                                backgroundColor: this.props.navbarState.accountFieldHovered[1] ? "#ffdac0" : "#f1f1f1",
                                padding: "3px 0 6px 0"
                            }}
                        >
                            {this.props.isUserLoggedIn ?
                                <>
                                    <i className="fa fa-sign-out fa-fw" aria-hidden></i> Đăng xuất
                                </> :
                                <>
                                    <i className="fa fa-sign-in fa-fw" aria-hidden></i> Đăng nhập / Đăng ký                                
                                </> 
                            }
                        </NavLink>
                    </div>
                </div>
            </div>
        )
    }
}

const mapStateToProps = (state) => {
    return {
        navbarState: state.navbar,
        isUserLoggedIn: state.userAccount.isLoggedIn
    }
};

const mapDispatchToProps = (dispatch) => {
    return {
        submitActive: (index) => {
            dispatch(setActive({
                index: index
            }))
        },
        submitHoveredOrNot: (index, isHovered) => {
            dispatch(setHoveredOrNot({
                index: index,
                isHovered: isHovered
            }))
        },
        submitAccountFieldHoveredOrNot: (index, isHovered) => {
            dispatch(setAccountFieldHoveredOrNot({
                index: index,
                isHovered: isHovered
            }))
        }
    }
}

const connectedNavbar = connect(mapStateToProps, mapDispatchToProps)(Navbar);

export default connectedNavbar;
