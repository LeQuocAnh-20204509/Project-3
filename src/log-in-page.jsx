import { Component } from "react";
import Navbar from "./navbar";
import Footer from "./footer";
import Header from "./header";

class logInPage extends Component {
    render() {
        return (
            <>
                <Header />
                <Navbar />
                <h1>Trang đăng nhập</h1>
                <Footer />
            </>
        )
    }
}

export default logInPage;
