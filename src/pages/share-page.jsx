import { Component } from "react";
import Navbar from "../components/navbar.jsx";
import Footer from "../components/footer.jsx";
import Header from "../components/header.jsx";

class SharePage extends Component {
    render() {
        return (
            <>
                <Header />
                <Navbar />
                <h2>Trang chia sẻ</h2>
                <Footer />
            </>
        )
    }
}

export default SharePage;
