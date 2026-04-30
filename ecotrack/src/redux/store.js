import { configureStore } from "@reduxjs/toolkit";
import airReducer from "./airSlice";

export default configureStore({
  reducer: {
    air: airReducer
  }
});