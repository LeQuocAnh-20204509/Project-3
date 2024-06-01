import { createSlice } from "@reduxjs/toolkit";

const questionGeneratingSlice = createSlice({
    name: "questionGenerating",
    initialState: {
        isGenerating: false,
        canType: false,
        question: [],
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
        }
    }
})

export const { setCanTypeOrNot, setIsGeneratingOrNot, setQuestion } = questionGeneratingSlice.actions;
export default questionGeneratingSlice.reducer;
