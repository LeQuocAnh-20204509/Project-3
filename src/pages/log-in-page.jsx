import { Component } from "react";
import Navbar from "../components/navbar";
import Footer from "../components/footer";
import Header from "../components/header";
import LogInForm from "../components/log-in-form";
// import "../global.css";

class LogInPage extends Component {
    render() {
        return (
            <>
                <Header />
                <Navbar />
                <LogInForm />
                <Footer />
            </>
        )
    }
}

export default LogInPage;
