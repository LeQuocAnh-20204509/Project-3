import { createSlice } from "@reduxjs/toolkit";

const rateShareCommentSlice = createSlice({
    name: "rateShareComment",
    initialState: {
        isActive: false,
        rate: {
            isHovered: [false, false, false, false, false],
            isSelected: [false, false, false, false, false]
        }
    },
    reducers: {
        setActiveOrNot: (state, action) => {
            state.isActive = action.payload.isActive;
        },
        setRateHoveredOrNot: (state, action) => {
            if (action.payload.isHovered) {
                state.rate.isHovered.forEach((value, index, array) => {
                    if (index <= action.payload.index) state.rate.isHovered[index] = true;
                    else state.rate.isHovered[index] = false;
                })
            } else {
                state.rate.isHovered = [false, false, false, false, false];
            }
        },
        setRateSelectedOrNot: (state, action) => {
            if (action.payload.isSelected) {
                state.rate.isSelected.forEach((value, index, array) => {
                    if (index <= action.payload.index) state.rate.isSelected[index] = true;
                    else state.rate.isSelected[index] = false;
                })
            } else {
                state.rate.isSelected = [false, false, false, false, false];
            }
        }
    }
})

export const { setActiveOrNot, setRateHoveredOrNot, setRateSelectedOrNot } = rateShareCommentSlice.actions;
export default rateShareCommentSlice.reducer;
