import { createSlice } from "@reduxjs/toolkit";

const questionGeneratingSlice = createSlice({
    name: "questionGenerating",
    initialState: {
        isGenerating: false,
        canType: false,
        question: [],
        questionId: "",
        questionImage: {}
    },
    reducers: {
        setIsGeneratingOrNot: (state, action) => {
            state.isGenerating = action.payload.isGenerating;
        },
        setCanTypeOrNot: (state, action) => {
            state.canType = action.payload.canType;
        },
        setQuestion: (state, action) => {
            state.question = action.payload.question;
        },
        setQuestionId: (state, action) => {
            state.questionId = action.payload.questionId;
        },
        setQuestionImage: (state, action) => {
            state.questionImage = action.payload.questionImage;
        }
    }
})

export const { setCanTypeOrNot, setIsGeneratingOrNot, setQuestion, setQuestionId, setQuestionImage } = questionGeneratingSlice.actions;
export default questionGeneratingSlice.reducer;
