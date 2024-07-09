import { Component } from "react";
import Header from "../components/header.jsx";
import Navbar from "../components/navbar.jsx";
import Footer from "../components/footer";
import DetailGeneratedQuestion from "../components/detail-generated-question.jsx";

class GeneratedQuestionPage extends Component {
    render() {
        return (
            <>
            <Header />
            <Navbar />
            <DetailGeneratedQuestion />
            <Footer />
            </>
        )
    }
}

export default GeneratedQuestionPage;
