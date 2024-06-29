import { Component } from "react";
import Navbar from "../components/navbar";
import Footer from "../components/footer";
import Header from "../components/header";
import SignUpForm from "../components/sign-up-form";

class SignUpPage extends Component {
    render() {
        return (
            <>
                <Header />
                <Navbar />
                <SignUpForm />
                <Footer />
            </>
        )
    }
}

export default SignUpPage;
