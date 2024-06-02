import { Component } from "react";
import Navbar from "./navbar";
import Footer from "./footer";
import Header from "./header";
import LoginForm from "./components/login-form";
import {Button} from "./components/ui/button";

class logInPage extends Component {
    render() {
        return (
            <>
                <Header />
                <Navbar />
                <LoginForm />
                <Button className={"w-2 accent-red-400"}>abc</Button>
                <Footer />
            </>
        )
    }
}

export default logInPage;
