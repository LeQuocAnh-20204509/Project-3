import { configureStore } from "@reduxjs/toolkit";
import navbarReducer from "./navbar-slice.js";
import imageUploadReducer from "./image-upload-slice.js";
import rateShareCommentReducer from "./rate-share-comment-slice.js";
import questionGeneratingReducer from "./question-generating-slice.js";

export default configureStore({
    reducer: {
        navbar: navbarReducer,
        imageUpload: imageUploadReducer,
        rateShareComment: rateShareCommentReducer,
        questionGenerating: questionGeneratingReducer
    }
})
