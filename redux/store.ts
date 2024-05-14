import { configureStore } from "@reduxjs/toolkit";
import bookReducer from "./features/book.slice";
import { apiSlice } from "./features/books.slice";

export const store = configureStore({
  reducer: {
    // book: bookReducer,
    [apiSlice.reducerPath]: apiSlice.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(apiSlice.middleware),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
