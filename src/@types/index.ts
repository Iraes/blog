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

export type {
  IArticleList,
  IArticles,
  IRegisterFormType,
  IUserResponse,
  ILogIn,
  IUpdateUser,
};
