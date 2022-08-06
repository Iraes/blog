/*
  Для хранения стейта в локал сторедж и получения данных из него в стейт, используется библиотека Redux Persist
 */
import { combineReducers, configureStore } from "@reduxjs/toolkit";
import { useDispatch } from "react-redux";
import {
  persistStore,
  persistReducer,
  FLUSH,
  REHYDRATE,
  PAUSE,
  PERSIST,
  PURGE,
  REGISTER,
} from "redux-persist";
import storage from "redux-persist/lib/storage";

import { articlesApi } from "../Api/articlesApi";
import { usersAPI } from "../Api/usersAPI";
import articles from "../slices/articlesSlice";
import user from "../slices/userSlice";

const rootReducer = combineReducers({
  articles,
  user,
  [articlesApi.reducerPath]: articlesApi.reducer,
  [usersAPI.reducerPath]: usersAPI.reducer,
});

const persistConfig = {
  key: "root",
  storage,
  whitelist: ["user"],
};

const persistedReducer = persistReducer(persistConfig, rootReducer);

const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      },
    })
      .concat(articlesApi.middleware)
      .concat(usersAPI.middleware),
});

export const persistor = persistStore(store);
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
export const useAppDispatch = () => useDispatch<AppDispatch>();
export default store;
