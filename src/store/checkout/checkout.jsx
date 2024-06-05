import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  basket: [],
  popUp: false,

};

const checkoutSlice = createSlice({
  name: "checkout",
  initialState,
  reducers: {
    addToBasket(state, action) {
      state.basket.push(action.payload)
    },
    removeFromBasket(state, action) {
      const index = state.basket.findIndex(object => {
        return object.item_id === action.payload.item_id;
      });
      index >= 0 && state.basket.splice(index, 1)
    },
    setPop(state, action){
      state.popUp = action.payload
    },
    setEmpty(state){
      state.basket = []
    }

    
  },
});

export const checkoutActions = checkoutSlice.actions;

export default checkoutSlice;
