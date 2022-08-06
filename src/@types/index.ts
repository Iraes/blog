interface IArticles {
  slug: string;
  title: string;
  description: string;
  body: string;
  tagList: string[];
  createdAt: string;
  updatedAt: string;
  favorited: boolean;
  favoritesCount: number;
  author: {
    username: string;
    bio: string;
    image: string;
    following: boolean;
  };
}

interface IArticleList {
  articles: Array<IArticles>;
  articlesCount: number;
}

interface IRegisterFormType {
  username: string;
  email: string;
  password: string;
  repeat_pass: string;
  agreement: boolean;
}

interface IUserResponse {
  user: {
    email: string;
    token: string;
    username: string;
  };
}

interface ILogIn {
  email: string;
  password: string;
}

interface IUpdateUser {
  username: string;
  email: string;
  password?: string;
  avatar?: string;
  token: string;
}

interface ICreateFormType {
  title: string;
  snippet: string;
  text: string;
  tags: Array<{ tag: string }>;
}

interface IActionArticleForm {
  snippet: string;
  tags: Array<{ tag: string }> | string[];
  text: string;
  title: string;
}

interface IActionArticleResponseType {
  article: {
    author: {
      following: boolean;
      image: string;
      username: string;
    };
    body: string;
    createdAt: string;
    description: string;
    favorited: boolean;
    favoritesCount: number;
    slug: string;
    tagList: string[];
    title: string;
    updatedAt: string;
  };
}

export type {
  IArticleList,
  IArticles,
  IRegisterFormType,
  IUserResponse,
  ILogIn,
  IUpdateUser,
  ICreateFormType,
  IActionArticleForm,
  IActionArticleResponseType,
};
