import { createSlice } from "@reduxjs/toolkit";
import defautImage from "../userAvatars/defaultImage.jpg";

const UserAccountSlice = createSlice({
    name: "userAccount",
    initialState: {
        isLoggedIn: false,
        authToken: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ0b2tlbl90eXBlIjoic2xpZGluZyIsImV4cCI6MTcyNjU3MTMzMSwiaWF0IjoxNzE3OTMxMzMxLCJqdGkiOiI3NzMwMjE1NDBlZTg0OTI4YTBkNTFkMzc3NDhlZTkxZSIsInVzZXJfaWQiOjF9.MHYZMPkVv-W2ufFKgY1E1WqyHvf-DC0VGCM4JdoNL-c",
        info: {
            image: defautImage,
            name: "User's name",
        }
    },
    reducers: {
        submitLoginOrNot: (state, action) => {
            state.isLoggedIn = action.payload.isLoggedIn;
        }
    }
})

export const { submitLoginOrNot } = UserAccountSlice.actions;
export default UserAccountSlice.reducer;
