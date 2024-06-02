import { Component } from "react";
import { setUploadedOrNot, setChangedOrNot, setImageSource, setContainerBorderStyle } from "./react-redux/image-upload-slice.js";
import { connect } from "react-redux";
import axios from "axios";
import { setActiveOrNot, setRateHoveredOrNot, setRateSelectedOrNot } from "./react-redux/rate-share-comment-slice.js";
import { setCanTypeOrNot } from "./react-redux/question-generating-slice.js";

class ImageUploader extends Component {
    constructor(props) {
        super(props);
        this.state = {
            isImageDragOver: false,
        };
        this.readAndUpdateImg = this.readAndUpdateImg.bind(this);
        this.readFile = this.readFile.bind(this);
        this.onDragOver = this.onDragOver.bind(this);
        this.onDragLeave = this.onDragLeave.bind(this);
        this.onDrop = this.onDrop.bind(this);
    }

    readAndUpdateImg(file) {
        const reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onload = (event) => {
            this.props.submitImageSource(event.target.result);
            this.props.submitUploadedOrNot(true);
            this.props.submitCannotTypeYet();
            this.props.submitFunctionalitesUnactive();
            this.props.submitRateNotSelected();
            this.props.submitRateNotHovered();
        }
    }

    readFile(event) {
        const fileInput = document.querySelector("#fileInput");
        fileInput.click();
        fileInput.onchange = () => {
            const files = fileInput.files;
            if (files && files[0]) {
                this.props.submitContainerBorderStyle(true);
                this.props.submitChangedOrNot(true);
                this.readAndUpdateImg(files[0]);
            }
        }
    }

    onDragOver(event) {
        event.preventDefault();
        this.setState({
            isImageDragOver: true,
        });
        this.props.submitContainerBorderStyle(true);
    }

    onDragLeave(event) {
        event.preventDefault();
        this.setState({
            isImageDragOver: false,
        });
        this.props.submitContainerBorderStyle(false);
    }

    onDrop(event) {
        event.preventDefault();
        const file = event.dataTransfer.files[0];
        const fileType = file.type;
        const validType = ["image/png", "image/jpg", "image/jpeg"];
        if (validType.includes(fileType)) {       // kiem tra xem co dung dinh dang hinh anh ko
            const fileInput = document.querySelector("#fileInput");
            
            if (event.dataTransfer.files !== fileInput.files) {       // kiem tra xem co thay doi hinh anh hay ko
                fileInput.files = event.dataTransfer.files;
                this.props.submitContainerBorderStyle(true);
                this.props.submitChangedOrNot(true);
                this.readAndUpdateImg(file);
            } else {                                        // anh vua tai len giong anh hien co
                var confirm = confirm("Bạn đang cập nhật lại ảnh cũ vừa tải lên, bạn vẫn muốn tiếp tục chứ ?");
                if (confirm) {
                    this.setState({
                        containerDivBorderStyle: "solid"
                    });
                    this.props.submitChangedOrNot(true);
                    this.readAndUpdateImg(file);
                }
            }
        } else {
            this.setState({
                isImageDragOver: false,
            });
            this.props.submitContainerBorderStyle(false);
            alert("Không đúng định dạng hình ảnh!");
        };
    }

    render() {
        const imageUploadDiv = <div
                                    style={{
                                        display: "flex",
                                        flexDirection: "column",
                                        alignItems: "center",
                                        justifyContent: "center",
                                    }}
                                >
                                    <img src={require("./images/file_upload.png")} alt="File-upload-icon"
                                        style={{
                                            width: "40%",
                                            height: "auto",
                                        }}
                                    />
                                    <div>
                                        {
                                            this.state.isImageDragOver ?
                                            <b>Thả ảnh</b> :
                                            <div
                                                style={{
                                                    display: "flex",
                                                    flexDirection: "column",
                                                    alignItems: "center"
                                                }}
                                            >
                                                <div><b>Kéo và thả</b>&nbsp;ảnh vào đây</div>
                                                <div>Hoặc</div>
                                                <div><b>Nhấp</b>&nbsp;để chọn ảnh</div>
                                            </div>
                                        }
                                    </div>
                                </div>;

        var img = <img src={this.props.imgSrc} alt="Uploaded Image"
                        style={{
                            borderRadius: "20px",
                            maxHeight: 430,
                            maxWidth: "100%"
                        }}
                />;

        return (
            <div id="image-upload-container" onDragOver={this.onDragOver} onDragLeave={this.onDragLeave} onDrop={this.onDrop}
                onClick={this.readFile}
                style={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    maxWidth: "80%",
                    maxHeight: 450,
                    height: this.props.isImageUploaded ? "fit-content" : 400,
                    width: this.props.isImageUploaded ? "fit-content" : "80%",
                    margin: "5% 5% 0 5%",
                    padding: this.props.isImageUploaded ? "2%" : 0,
                    border: "4px " + this.props.containerBorderStyle + " blue",
                    borderRadius: "20px",
                    cursor: "pointer",
                }}
            >
                <input id="fileInput" type="file" accept=".jpg, .png, .jpeg" hidden/>
                {this.props.isImageUploaded ? img : imageUploadDiv}
            </div>
        )
    }
}

const mapStateToProps = (state) => {
    return {
        isImageUploaded: state.imageUpload.isUploaded,
        isImageChanged: state.imageUpload.isChanged,
        imgSrc: state.imageUpload.imgSrc,
        containerBorderStyle: state.imageUpload.containerBorderStyle
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        submitUploadedOrNot: (isUploaded) => {
            dispatch(setUploadedOrNot({
                isUploaded: isUploaded
            }));
        },
        submitChangedOrNot: (isChanged) => {
            dispatch(setChangedOrNot({
                isChanged: isChanged
            }));
        },
        submitImageSource: (imgSrc) => {
            dispatch(setImageSource({
                imgSrc: imgSrc
            }))
        },
        submitContainerBorderStyle: (isActive) => {
            dispatch(setContainerBorderStyle({
                isActive: isActive
            }))
        },
        submitCannotTypeYet: () => {
            dispatch(setCanTypeOrNot({
                canType: false
            }))
        },
        submitFunctionalitesUnactive: () => {
            dispatch(setActiveOrNot({
                isActive: false
            }))
        },
        submitRateNotHovered: () => {
            dispatch(setRateHoveredOrNot({
                isHovered: false
            }))
        },
        submitRateNotSelected: () => {
            dispatch(setRateSelectedOrNot({
                isSelected: false
            }))
        }
    }
}

const connectedImageUploader = connect(mapStateToProps, mapDispatchToProps)(ImageUploader);

export default connectedImageUploader;
