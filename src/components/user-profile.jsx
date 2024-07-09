import { Component } from "react";
import { connect } from "react-redux";
import axios from "axios";

class UserProfile extends Component {
    constructor(props) {
        super(props);
        this.state = {
            email: "",
            username: "",
            dateJoined: ""
        }

        // if (this.props.isUserLoggedIn) {
            var config = {
                headers: {
                    Authorization: "Bearer " + sessionStorage.getItem("authToken")
                }
            }
            axios.get("http://localhost:8000/api/me",
                config
            ).then((response) => {
                this.updateState(response);
            }).catch((error) => {
                console.log(error);
            })
        // }
    }

    updateState(response) {
        var dateJoinedString = response.data.date_joined;
        var dateJoined = new Date(dateJoinedString);
        var day = String(dateJoined.getDate()).padStart(2, "0");
        var month = String(dateJoined.getMonth() + 1).padStart(2, "0");
        var year = String(dateJoined.getFullYear());
        dateJoinedString = day + "/" + month + "/" + year;
        this.setState({
            email: response.data.email,
            username: response.data.username,
            dateJoined: dateJoinedString
        })
    }

    render() {
        return (
            <div
                style={{
                    display: "flex",
                    width: "100%",
                    justifyContent: "center",
                    gap: "5%"
                }}
            >
                <img src={this.props.userImage} alt="User-image"/>
                <div
                    style={{
                        display: "flex",
                        flexDirection: "column",
                        justifyContent: "center",
                        // alignContent: "center",
                        gap: "5%",
                        fontSize: "1.2rem"
                    }}
                >
                    <div>
                        <b><i>Tên người dùng:</i></b>&nbsp;&nbsp;{this.state.username}
                    </div>
                    <div>
                        <b><i>Email:</i></b>&nbsp;&nbsp;{this.state.email}
                    </div>
                    <div>
                        <b><i>Ngày tham gia:</i></b>&nbsp;&nbsp;{this.state.dateJoined}
                    </div>
                </div>
            </div>
        )
    }
}

const mapStateToProps = (state) => {
    return {
        isUserLoggedIn: state.userAccount.isLoggedIn,
        userImage: state.userAccount.info.image
    }
}

const connectedUserProfile = connect(mapStateToProps, null)(UserProfile);

export default connectedUserProfile;
