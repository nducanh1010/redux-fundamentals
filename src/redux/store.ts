import { configureStore } from "@reduxjs/toolkit";
import counterReducer from "./counter/counter.slide";

import userReducer from "./user/user.slide";
import appReducer from "./app/app.slide";
// nạp data vào redux
export const store = configureStore({
  reducer: {
    count: counterReducer,
    user: userReducer,
    app: appReducer
  }
});

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>;
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch;
