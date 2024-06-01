import { Component } from "react";
import Navbar from "./navbar.jsx";
import Footer from "./footer.jsx";
import Header from "./header.jsx";

class UserProfile extends Component {
    render() {
        return (
            <>
                <Header />
                <Navbar />
                <h2>Trang thông tin tài khoản người dùng</h2>
                <Footer />
            </>
        )
    }
}

export default UserProfile;
