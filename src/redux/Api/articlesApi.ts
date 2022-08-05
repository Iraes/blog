import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/dist/query/react";

import { IArticleList, IArticles } from "../../@types";

export const articlesApi = createApi({
  reducerPath: "articleApi",
  baseQuery: fetchBaseQuery({
    baseUrl: "https://blog.kata.academy/api/",
  }),
  endpoints: (builder) => ({
    getArticles: builder.query<IArticleList, number>({
      query: (offset: number) => ({
        url: `/articles`,
        params: {
          offset,
        },
      }),
    }),
    getArticleWithSlug: builder.query<{ article: IArticles }, string>({
      query: (slug: string) => ({
        url: `/articles/${slug}`,
      }),
    }),
  }),
});

export const { useGetArticlesQuery, useGetArticleWithSlugQuery } = articlesApi;
