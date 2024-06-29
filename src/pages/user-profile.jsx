import { Component } from "react";
import Navbar from "../components/navbar.jsx";
import Footer from "../components/footer.jsx";
import Header from "../components/header.jsx";

class UserProfile extends Component {
    render() {
        return (
            <>
                <Header />
                <Navbar />
                <h1>Trang thông tin tài khoản người dùng</h1>
                <Footer />
            </>
        )
    }
}

export default UserProfile;
