import React from "react";
import { Link, NavLink } from "react-router-dom";
const Navbar = () => {

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
                     onClick={() => {
                         // changeActive(0);
                         // changeIsNotHovered(0);
                     }}
                     // onMouseEnter={() => changeIsHovered(0)} onMouseLeave={() => changeIsNotHovered(0)}
                     style={({ isActive }) => ({
                         float: "left",
                         display: "flex",
                         alignItems: "center",
                         justifyContent: "center",
                         width: "25%",
                         height: "100%",
                         // backgroundColor: navbarState.hovered[0] ? "black" : (navbarState.active[0] ? "#1974D3" : "#555"),
                         padding: "auto 0",
                     })}
            >
                <i className="fa fa-home fa-fw" aria-hidden></i>
                &nbsp;Trang chủ
            </NavLink>
            <a className="navbar-link" href="#"
               // onClick={() => {
               //     changeActive(1);
               //     changeIsNotHovered(1);
               // }}
               // onMouseEnter={() => changeIsHovered(1)} onMouseLeave={() => changeIsNotHovered(1)}
               style={{
                   float: "left",
                   display: "flex",
                   alignItems: "center",
                   justifyContent: "center",
                   width: "25%",
                   height: "100%",
                   // backgroundColor: navbarState.hovered[1] ? "black" : (navbarState.active[1] ? "#1974D3" : "#555")
               }}
            >
                <i className="fa fa-search fa-fw" aria-hidden></i>
                &nbsp;Về chúng tôi
            </a>
            <a className="navbar-link" href="#contacts"
               // onClick={() => {
               //     changeActive(2);
               //     changeIsNotHovered(2);
               // }}
               // onMouseEnter={() => changeIsHovered(2)} onMouseLeave={() => changeIsNotHovered(2)}
               style={{
                   float: "left",
                   display: "flex",
                   alignItems: "center",
                   justifyContent: "center",
                   width: "25%",
                   height: "100%",
                   // backgroundColor: navbarState.hovered[2] ? "black" : (navbarState.active[2] ? "#1974D3" : "#555")
               }}
            >
                <i className="fa fa-envelope fa-fw" aria-hidden></i>
                &nbsp;Liên hệ
            </a>
            <div className="navbar-link"
                 // onMouseEnter={() => changeIsHovered(3)} onMouseLeave={() => changeIsNotHovered(3)}
                 style={{
                     float: "left",
                     display: "block",
                     position: "relative",
                     alignItems: "center",
                     justifyContent: "center",
                     width: "25%",
                     height: "100%",
                     cursor: "pointer",
                     // backgroundColor: navbarState.hovered[3] ? "black" : (navbarState.active[3] ? "#1974D3" : "#555")
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
                        // display: navbarState.hovered[3] ? "block" : "none",
                        position: "absolute",
                        color: "black",
                        width: "100%",
                        fontWeight: "450"
                    }}
                >
                    <NavLink to={"/user-profile"}
                             // onClick={() => {
                             //     changeActive(3);
                             //     changeIsNotHovered(3);
                             //     changeBackItemDropdownBgColor(0);
                             // }}
                             // onMouseEnter={() => changeItemDropdownBgColor(0)}
                             // onMouseLeave={() => changeBackItemDropdownBgColor(0)}
                             style={{
                                 display: "block",
                                 // backgroundColor: navbarState.accountFieldHovered[0] ? "#ffdac0" : "#f1f1f1",
                                 // padding: "6px 0 3px 0"
                             }}
                    >
                        Thông tin tài khoản
                    </NavLink>
                    <NavLink to={"/login"}
                             // onClick={() => {
                             //     changeActive(3);
                             //     changeIsNotHovered(3);
                             //     changeBackItemDropdownBgColor(1);
                             // }}
                             // onMouseEnter={() => changeItemDropdownBgColor(1)}
                             // onMouseLeave={() => changeBackItemDropdownBgColor(1)}
                             style={{
                                 display: "block",
                                 // backgroundColor: navbarState.accountFieldHovered[1] ? "#ffdac0" : "#f1f1f1",
                                 padding: "3px 0 6px 0"
                             }}
                    >
                        Đăng nhập / Đăng ký
                    </NavLink>
                </div>
            </div>
        </div>
    );
};

export default Navbar;
