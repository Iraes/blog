import React from "react";
import { useSelector } from "react-redux";
import { SubmitHandler } from "react-hook-form";
import { Redirect, useParams } from "react-router-dom";

import { selectUserInfo } from "../redux/slices/userSlice";
import {
  useGetArticleWithSlugQuery,
  useEditArticlesMutation,
} from "../redux/Api/articlesApi";
import { IActionArticleForm } from "../@types";
import ActionArticle from "../components/ActionArticle";

const EditArticle = () => {
  const { isAuth, token } = useSelector(selectUserInfo);
  const { slug } = useParams<{ slug: string }>();

  const { data } = useGetArticleWithSlugQuery({ slug, token });
  const article = data && data.article;
  const [editArt, { data: responseData, error }] = useEditArticlesMutation();

  console.log(article);

  const createArticle: SubmitHandler<IActionArticleForm> = async (
    articleInfo
  ) => {
    await editArt({ articleInfo, token, slug });
  };

  if (responseData) {
    return <Redirect to="/" />;
  }

  return (
    <div>
      {isAuth && article && (
        <ActionArticle
          title="Edit article"
          queryFn={(data) => createArticle(data)}
          articleData={article}
        />
      )}
    </div>
  );
};

export default EditArticle;
