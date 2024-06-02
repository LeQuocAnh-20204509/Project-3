"use client"
import React from "react";
import { NavLink } from "react-router-dom";
import Image from "next/image";

const Header = () => {


    return (
        <NavLink to={"/"}>
            <header
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
                    <Image src={"public/images/ocr-image.jpg"} alt="ocr-image"
                         style={{
                             width: "2.5rem"
                         }}
                    />
                    OCR
                </div>
                Hệ thống sinh câu hỏi trắc nghiệm từ hình ảnh
            </header>
        </NavLink>
    );
};

export default Header;
