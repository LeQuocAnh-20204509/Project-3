import { Component } from "react";
import Navbar from "../components/navbar";
import Footer from "../components/footer";
import Header from "../components/header";

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
