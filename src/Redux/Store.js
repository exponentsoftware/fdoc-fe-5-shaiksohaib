import { configureStore } from "@reduxjs/toolkit";
import GeneralReducer from "./GeneralSlice";

export default configureStore({
  reducer: {
    global: GeneralReducer,
  },
});
