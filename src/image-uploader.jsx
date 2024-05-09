import { Component } from "react";
import "./image-uploader.css";

class ImageUploader extends Component {
    constructor(props) {
        super(props);
        this.state = {
            isImageDragOver: false,
            isImageUploaded: false,
            containerDivBorderStyle: "dashed",
            imgSrc: "",
            imgWidth: 0,
            imgHeight: 0
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
            this.setState({
                imgSrc: event.target.result
            });
        }
    }

    readFile(event) {
        const fileInput = document.querySelector("#fileInput");
        fileInput.click();
        this.props.setIsImageChanged(false);
        fileInput.onchange = () => {
            const files = fileInput.files;
            if (files && files[0]) {
                this.setState({
                    isImageUploaded: true,
                    containerDivBorderStyle: "solid"
                });
                this.props.setIsImageUploaded(true);
                this.props.setIsImageChanged(true);
                this.readAndUpdateImg(files[0]);
            }
        }
    }

    onDragOver(event) {
        event.preventDefault();
        this.setState({
            isImageDragOver: true,
            containerDivBorderStyle: "solid"
        });
    }

    onDragLeave(event) {
        event.preventDefault();
        this.setState({
            isImageDragOver: false,
            containerDivBorderStyle: "dashed"
        });
    }

    onDrop(event) {
        event.preventDefault();
        const fileInput = document.querySelector("#fileInput");
        if (fileInput.files[0] !== event.dataTransfer.files[0]) {       // kiem tra xem co thay doi hinh anh hay ko
            fileInput.files = event.dataTransfer.files;
            const file = event.dataTransfer.files[0];
            const fileType = file.type;
            const validType = ["image/png", "image/jpg", "image/jpeg"];
            if (validType.includes(fileType)) {
                this.setState({
                    isImageUploaded: true
                });
                this.props.setIsImageUploaded(true);
                this.props.setIsImageChanged(true);
                this.readAndUpdateImg(file);
            } else {
                this.setState({
                    isImageDragOver: false,
                    containerDivBorderStyle: "dashed"
                });
                this.props.setIsImageChanged(false);
                alert("Không đúng định dạng hình ảnh!");
            }
        } else {
            this.props.setIsImageChanged(false);
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
                                    <img src={require("./images.png")} alt="File-upload-icon"
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

        var img = <img src={this.state.imgSrc} alt="Uploaded Image"
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
                    height: this.state.isImageUploaded ? "fit-content" : 400,
                    width: this.state.isImageUploaded ? "fit-content" : "80%",
                    margin: "5% 5% 0 5%",
                    padding: this.state.isImageUploaded ? "2%" : 0,
                    border: "4px " + this.state.containerDivBorderStyle + " blue",
                    borderRadius: "20px",
                    cursor: "pointer",
                }}
            >
                <input id="fileInput" type="file" accept=".jpg, .png, .jpeg" hidden/>
                {this.state.isImageUploaded ? img : imageUploadDiv}
            </div>
        )
    }
}

export default ImageUploader;
