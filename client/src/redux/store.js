//? Major functions in redux
//* Store: the central place that holds the state, created using centralStore function using Redux
//* Actions: Plain js objects that represent an intention to change the state. They are created using 'dispatch' function and are consumed by reducers.
//* Reducers: Functions that specify how the application's state changes response to actions.
//* Dispatch: The method used to dispatch actions to the redux store. It's the only way to trigger a state change.
//* Selectors: Functions that extract specific pieces of the state from the Redux store. They help in accessing and computing the derived state data efficiently.
//* Middleware: Functions that provide a third-party extension point between dispatching an action and the moment it reaches the reducer. Middleware is commonly used for logging, asynchronous actions, routing, etc.

//? Basic Workflow in Redux
//* Action Creation: creates action to describe what happened
//* Action Dispatch: Dispatch actions using `store.dispatch(action)`
//* Reducer Handling: Reducers take the current state and action returning a new state based on the action type.
//* State Update: The store holds the new state and notifies any subscribed components of the state change.

import { configureStore } from "@reduxjs/toolkit";
import userReducer from './user/userSlice';

//* store is being created using configureStore
export const store = configureStore({
    //* reducer is where we combine multiple reducers using combineReducers.
    reducer: {user: userReducer},
    //* middleware allows us to customize the middleware that is applied to the store.
    //* getDefaultMiddleware is the function that retrieves the default set of middleware
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware({
            // adding this doesn't give error for not serializing our variables
            serializableCheck: false,
        }),
});
