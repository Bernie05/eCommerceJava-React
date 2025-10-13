import { thunk } from "redux-thunk";
import { combineReducers, configureStore } from "@reduxjs/toolkit";
import App from "../App";
import { TypedUseSelectorHook, useDispatch, useSelector } from "react-redux";

const rootReducer = combineReducers({
    // Add your slice reducers here
});


const store = configureStore({
    reducer: rootReducer,
    middleware:(getDefaultMiddleware) => getDefaultMiddleware().concat(thunk),
});

export type AppDispatch = typeof store.dispatch                            // to get the dispatch type from the store itself
export type RootState = ReturnType<typeof rootReducer>;                     // to get the state type from the root reducer

// command to use the dispatch and selector in the component
export const useAppDispatch = () => useDispatch<AppDispatch>();             // custom hook to use the dispatch with the correct type
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector; // custom hook to use the selector with the correct type

export default store;