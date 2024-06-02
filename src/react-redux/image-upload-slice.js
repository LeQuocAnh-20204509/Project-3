import { createSlice } from "@reduxjs/toolkit";

const imageUploadSlice = createSlice({
    name: "imageUpload",
    initialState: {
        isUploaded: false,
        isChanged: false,
        imgSrc: "",
        containerBorderStyle: "dashed"
    },
    reducers: {
        setUploadedOrNot: (state, action) => {
            state.isUploaded = action.payload.isUploaded;
        },
        setChangedOrNot: (state, action) => {
            state.isChanged = action.payload.isChanged;
        },
        setImageSource: (state, action) => {
            state.imgSrc = action.payload.imgSrc;
        },
        setContainerBorderStyle: (state, action) => {
            if (action.payload.isActive) state.containerBorderStyle = "solid";
            else state.containerBorderStyle = "dashed";
        }
    }
})

export const { setUploadedOrNot, setChangedOrNot, setImageSource, setContainerBorderStyle } = imageUploadSlice.actions;
export default imageUploadSlice.reducer;
