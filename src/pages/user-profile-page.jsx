import { Component } from "react";
import Navbar from "../components/navbar.jsx";
import Footer from "../components/footer.jsx";
import Header from "../components/header.jsx";
import UserProfile from "../components/user-profile.jsx";
import axios from "axios";
import { connect } from "react-redux";
import QuestionsContainer from "../components/questions-container.jsx";

class UserProfilePage extends Component {
    constructor(props) {
        super(props);
        
    }

    render() {
        return (
            <>
                <Header />
                <Navbar />
                <div>
                    <h1
                        style={{
                            width: "100%",
                            textAlign: this.props.isUserLoggedIn ? "center" : "start"
                        }}
                    >Trang thông tin tài khoản người dùng</h1>
                    {
                        this.props.isUserLoggedIn ?
                        <>
                        <UserProfile />
                        <QuestionsContainer />
                        </> : 
                        <h2>Bạn chưa đăng nhập!</h2>
                    }
                </div>
                <Footer />
            </>
        )
    }
}

const mapStateToProps = (state) => {
    return {
        isUserLoggedIn: state.userAccount.isLoggedIn,
    }
}

const connectedUserProfilePage = connect(mapStateToProps, null)(UserProfilePage);

export default connectedUserProfilePage;
