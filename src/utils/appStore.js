import { configureStore } from "@reduxjs/toolkit"
import cartReducer from "./cartSlice";

const appStore = configureStore({
    //Forms one big reducer
    reducer:{
        cart: cartReducer,
        // user: userReducer, // we can have small small slices reducer here
    }
});

export default appStore;