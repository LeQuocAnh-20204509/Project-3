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
                <h2>Trang thông tin tài khoản người dùng</h2>
                <Footer />
            </>
        )
    }
}

export default UserProfile;
