import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  auction: false,
  rate: false,
  shipping: false,
  pay: false,
  connection: false,
  owner: false,
  auctionData: {}
};

const popSlice = createSlice({
  name: "pop",
  initialState,
  reducers: {

    setAuction(state, action) {
      state.auction = action.payload
    },
    setRate(state, action) {
      state.rate = action.payload
    },
    setShipping(state, action) {
      state.shipping = action.payload
    },
    setAuctionData(state, action){
      state.auctionData = action.payload
    },
    setPay(state, action) {
      state.pay = action.payload
    },
    setConnection(state, action) {
      state.connection = action.payload
    },
    setOwner(state, action) {
      state.owner = action.payload
    }

  },
});

export const popActions = popSlice.actions;

export default popSlice;
