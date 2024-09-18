import {configureStore} from "@reduxjs/toolkit";
import storage from "redux-persist/lib/storage"; // defaults to localStorage for web
import appReducer from "./appSlice.js";
import userReducer from "./userSlice.js";
import {persistReducer, persistStore} from "redux-persist";

const userPersistConfig = {
    key: "user",
    storage,
};

const persistedUserReducer = persistReducer(userPersistConfig, userReducer);


const store = configureStore({
    reducer: {
        appStore: appReducer,
        userStore: persistedUserReducer,
    },
    
});

const persistor = persistStore(store);

export {store, persistor};