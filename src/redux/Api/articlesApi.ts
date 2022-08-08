import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/dist/query/react";

import {
  IActionArticleForm,
  IActionArticleResponseType,
  IArticleList,
  IArticles,
} from "../../@types";
/* eslint-disable indent */
export const articlesApi = createApi({
  reducerPath: "articleApi",
  tagTypes: ["Articles"],
  baseQuery: fetchBaseQuery({
    baseUrl: "https://blog.kata.academy/api/",
  }),
  endpoints: (builder) => ({
    getArticles: builder.query<
      IArticleList,
      { offset: number; token?: string }
    >({
      query: ({ offset, token }) => ({
        url: `/articles`,
        headers: {
          "Content-Type": "application/json; charset=utf-8",
          Authorization: `Bearer ${token}`,
        },
        params: {
          offset,
        },
      }),
      providesTags: (result) =>
        result
          ? [
              ...result.articles.map(({ slug }) => ({
                type: "Articles" as const,
                slug,
              })),
              { type: "Articles", id: "LIST" },
            ]
          : [{ type: "Articles", id: "LIST" }],
    }),
    getArticleWithSlug: builder.query<
      { article: IArticles },
      { slug: string; token: string }
    >({
      query: ({ slug, token }) => ({
        url: `/articles/${slug}`,
        headers: {
          "Content-Type": "application/json; charset=utf-8",
          Authorization: `Bearer ${token}`,
        },
      }),
    }),
    like: builder.mutation<any, { slug: string; token: string }>({
      query: ({ slug, token }) => ({
        url: `/articles/${slug}/favorite`,
        method: "POST",
        headers: {
          "Content-Type": "application/json; charset=utf-8",
          Authorization: `Bearer ${token}`,
        },
      }),
      invalidatesTags: [{ type: "Articles", id: "LIST" }],
    }),
    deleteLike: builder.mutation<any, { slug: string; token: string }>({
      query: ({ slug, token }) => ({
        url: `/articles/${slug}/favorite`,
        method: "DELETE",
        headers: {
          "Content-Type": "application/json; charset=utf-8",
          Authorization: `Bearer ${token}`,
        },
      }),
      invalidatesTags: [{ type: "Articles", id: "LIST" }],
    }),
    createArticle: builder.mutation<
      IActionArticleResponseType,
      { articleInfo: IActionArticleForm; token: string }
    >({
      query: ({ articleInfo, token }) => ({
        url: `/articles`,
        method: "POST",
        headers: {
          "Content-Type": "application/json; charset=utf-8",
          Authorization: `Bearer ${token}`,
        },
        body: {
          article: {
            title: articleInfo.title,
            description: articleInfo.snippet,
            body: articleInfo.text,
            tagList: articleInfo.tags,
          },
        },
      }),
      invalidatesTags: [{ type: "Articles", id: "LIST" }],
    }),
    deleteArticle: builder.mutation<any, { slug: string; token: string }>({
      query: ({ slug, token }) => ({
        url: `/articles/${slug}`,
        method: "DELETE",
        headers: {
          "Content-Type": "application/json; charset=utf-8",
          Authorization: `Bearer ${token}`,
        },
      }),
      invalidatesTags: [{ type: "Articles", id: "LIST" }],
    }),
    editArticles: builder.mutation<
      IActionArticleResponseType,
      { articleInfo: IActionArticleForm; token: string; slug: string }
    >({
      query: ({ articleInfo, slug, token }) => ({
        url: `/articles/${slug}`,
        method: "PUT",
        headers: {
          "Content-Type": "application/json; charset=utf-8",
          Authorization: `Bearer ${token}`,
        },
        body: {
          article: {
            title: articleInfo.title,
            description: articleInfo.snippet,
            body: articleInfo.text,
            tagList: articleInfo.tags,
          },
        },
      }),
      invalidatesTags: [{ type: "Articles", id: "LIST" }],
    }),
  }),
});

export const {
  useGetArticlesQuery,
  useGetArticleWithSlugQuery,
  useLikeMutation,
  useDeleteLikeMutation,
  useCreateArticleMutation,
  useEditArticlesMutation,
  useDeleteArticleMutation,
} = articlesApi;
