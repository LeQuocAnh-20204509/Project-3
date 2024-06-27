'use client';

import React, { useState } from "react";

const ImageUploader = ({
                           isImageUploaded,
                           isImageChanged,
                           imgSrc,
                           containerBorderStyle,
                           onImageUpload,
                           onReset
                       }) => {
    const [isImageDragOver, setIsImageDragOver] = useState(false);

    const readAndUpdateImg = (file) => {
        const reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onload = (event) => {
            onImageUpload(event.target.result);
        };
    };

    const readFile = () => {
        const fileInput = document.querySelector("#fileInput");
        fileInput.click();
        fileInput.onchange = () => {
            const files = fileInput.files;
            if (files && files[0]) {
                readAndUpdateImg(files[0]);
            }
        };
    };

    const onDragOver = (event) => {
        event.preventDefault();
        setIsImageDragOver(true);
    };

    const onDragLeave = (event) => {
        event.preventDefault();
        setIsImageDragOver(false);
    };

    const onDrop = (event) => {
        event.preventDefault();
        const file = event.dataTransfer.files[0];
        const fileType = file.type;
        const validType = ["image/png", "image/jpg", "image/jpeg"];
        if (validType.includes(fileType)) {
            const fileInput = document.querySelector("#fileInput");

            if (event.dataTransfer.files !== fileInput.files) {
                fileInput.files = event.dataTransfer.files;
                readAndUpdateImg(file);
            } else {
                const confirmUpdate = confirm("Bạn đang cập nhật lại ảnh cũ vừa tải lên, bạn vẫn muốn tiếp tục chứ ?");
                if (confirmUpdate) {
                    readAndUpdateImg(file);
                }
            }
        } else {
            setIsImageDragOver(false);
            alert("Không đúng định dạng hình ảnh!");
        }
    };

    const imageUploadDiv = (
        <div className="flex flex-col items-center justify-center">
        <img
            src="/images/file_upload.png"
    alt="File-upload-icon"
    className="w-2/5 h-auto"
        />
        <div>
            {isImageDragOver ? (
                    <b>Thả ảnh</b>
) : (
        <div className="flex flex-col items-center">
            <div>
                <b>Kéo và thả</b>&nbsp;ảnh vào đây
    </div>
    <div>Hoặc</div>
    <div>
    <b>Nhấp</b>&nbsp;để chọn ảnh
    </div>
    </div>
)}
    </div>
    </div>
);

    const img = (
        <img
            src={imgSrc}
    alt="Uploaded Image"
    className="rounded-2xl max-h-[430px] max-w-full"
        />
);

    return (
        <div
            id="image-upload-container"
    onDragOver={onDragOver}
    onDragLeave={onDragLeave}
    onDrop={onDrop}
    onClick={readFile}
    className={`flex items-center justify-center max-w-4/5 max-h-[450px] ${isImageUploaded ? 'h-auto' : 'h-[400px]'} w-${isImageUploaded ? 'auto' : '4/5'} my-5 mx-5 p-${isImageUploaded ? 2 : 0} border-4 border-${containerBorderStyle} border-blue-500 rounded-2xl cursor-pointer`}
>
    <input id="fileInput" type="file" accept=".jpg, .png, .jpeg" hidden />
    {isImageUploaded ? img : imageUploadDiv}
    </div>
);
};

export default ImageUploader;
