import { createSlice } from "@reduxjs/toolkit";

const cartSlice = createSlice({
    name: 'cart', 
    initialState:{
        items: [],
    },
    reducers: {
        addItem : (state, action) => {
            //mutate the state 
            state.items.push(action.payload)
        }, 
        removeItem: (state) => {
            state.items.pop()
        }, 
        clearCart: (state) => {
            state.items.length = 0 
        } 
    }
})

// This will return an object stored in cartSlice
/* {
    actions: {
          addItem, 
          removeItem, 
           clearCart
        }
    reducers: {
    }
*/

export const { addItem, removeItem, clearCart } = cartSlice.actions;
export default cartSlice.reducer;