import { createSlice } from "@reduxjs/toolkit";
//* Slice refers to a portion of redux state and its associated logic
//* It typically manages related data or a feature's state within a larger application
//* createSlice is a function that simplifies the process of creating Redux Slices. It takes an object containing the slice's name, initialState and reducers

//* initialState defines the initial structure of the state managed by the slice.
const initialState = {
    currentUser: null,
    error: null,
    loading: false,
};

//* userSlice manages parts of the application state related to user authentication
const userSlice = createSlice({
    //* name specifies the name of the slice, which will be used to identify this part of the state within the Redux store
    name: "user",
    //* initialState specifies the initial state structure for this slice
    initialState,
    //* reducers is an object containing functions that define how the state can be updated in response to actions
    //* signInStart is a reducer function which is intended to be an action creator that signals the start of the sign-in process
    //* signInStart function takes two arguments state and action
    //* state represents the current state managed by this slice
    //* action is an object that carries a type property and optionally a payload with additional data
    reducers: {
        
        //? each reducer handles specific actions related to the user sign-in process
        signInStart: (state) => {
            state.loading = true; //indicates that the sign-in process has started
        },

        //* action is the data that we receive from the database
        //* this reducer handles the action dispatched when the sign-in process is successful
        //* executed when the auth process succeeds allowing the application to update the current user data in the state
        signInSuccess: (state, action) => {
            console.log(action.payload);
            state.currentUser = action.payload; //updates state.currentUser with the user data received from the action payload
            state.loading = false; // indicates that the sign-in process has completed
            state.error = null; // resets error to null (if there was any previous error)
        },

        //* handles the action dispatched when the sign-in process encounters an error
        //* used in case of auth failure allowing the application to update the error state to display error messages or to handle failed sign-in attempts
        signInFailure: (state, action) => {
            state.error = action.payload; // updates state.error with the error data received from the action payload
            state.loading = false; // indicates that the sign-in process is complete (even though it has failed)
        },
    },
});


export const { signInStart, signInSuccess, signInFailure } = userSlice.actions;
export default userSlice.reducer;