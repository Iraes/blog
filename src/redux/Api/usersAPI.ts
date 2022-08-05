import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/dist/query/react";

import {
  IUpdateUser,
  ILogIn,
  IRegisterFormType,
  IUserResponse,
} from "../../@types";

export const usersAPI = createApi({
  reducerPath: "userAPI",
  tagTypes: ["Users"],
  baseQuery: fetchBaseQuery({
    baseUrl: "https://blog.kata.academy/api/",
  }),
  endpoints: (builder) => ({
    getUserInfo: builder.query({
      query: (token) => ({
        url: "/user",
        headers: {
          "Content-Type": "application/json; charset=utf-8",
          Authorization: "Bearer ${token}",
        },
        // params: { Authorization: token },
      }),
    }),
    registerNewUser: builder.mutation<
      IUserResponse,
      Partial<IRegisterFormType>
    >({
      query: (userInfo) => ({
        url: "/users",
        method: "POST",
        body: {
          user: {
            username: userInfo.username,
            email: userInfo.email,
            password: userInfo.password,
          },
        },
      }),
    }),
    userLogIn: builder.mutation<IUserResponse, ILogIn>({
      query: (userInfo) => ({
        url: "/users/login",
        method: "POST",
        body: {
          user: {
            email: userInfo.email,
            password: userInfo.password,
          },
        },
      }),
    }),
    updateUser: builder.mutation<any, IUpdateUser>({
      query: (userInfo) => ({
        url: "/user",
        method: "PUT",
        headers: {
          "Content-Type": "application/json; charset=utf-8",
          Authorization: `Bearer ${userInfo.token}`,
        },
        body: {
          user: {
            username: userInfo.username,
            email: userInfo.email,
            password: userInfo.password,
            image: userInfo.avatar,
            token: userInfo.token,
          },
        },
      }),
    }),
  }),
});

export const {
  useRegisterNewUserMutation,
  useUserLogInMutation,
  useUpdateUserMutation,
  useGetUserInfoQuery,
} = usersAPI;
