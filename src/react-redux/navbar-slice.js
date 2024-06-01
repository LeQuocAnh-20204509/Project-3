import { createSlice } from "@reduxjs/toolkit";

export const navbarSlice = createSlice({
    name: "navbar",
    initialState: {
        active: [true, false, false, false],
        hovered: [false, false, false, false],
        accountFieldHovered: [false, false],
    },
    reducers: {
        setActive: (state, action) => {
            state.active[action.payload.index] = true;
            state.active.forEach((value, index, array) => {
                if (index !== action.payload.index) state.active[index] = false;
            });
        },
        setHoveredOrNot: (state, action) => {
            state.hovered[action.payload.index] = action.payload.isHovered;
        },
        setAccountFieldHoveredOrNot: (state, action) => {
            state.accountFieldHovered[action.payload.index] = action.payload.isHovered;
        }
    }
})

export const { setActive, setHoveredOrNot, setAccountFieldHoveredOrNot } = navbarSlice.actions;
export default navbarSlice.reducer;
