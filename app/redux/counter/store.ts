import { configureStore } from "@reduxjs/toolkit";
import counterReducer from "../counter/counter-slice";

export const store = configureStore({
  reducer: {
    counter: counterReducer,
  },
});

export type AppDisPatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
