import {createSlice} from "@reduxjs/toolkit";

export const appSlice = createSlice({
    name: 'app',
    initialState: {
        theme: 'light',
    },
    reducers: {
        getTheme: (state) => {
            return state.theme;
        },

        setTheme: (state, action) => {
            state.theme = action.payload;
        },
    },
});

export const {getTheme, setTheme} = appSlice.actions;
export default appSlice.reducer;