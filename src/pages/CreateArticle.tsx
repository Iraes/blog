import React from "react";
import { useSelector } from "react-redux";
import { SubmitHandler } from "react-hook-form";
import { Redirect } from "react-router-dom";

import ActionArticle from "../components/ActionArticle";
import { useCreateArticleMutation } from "../redux/Api/articlesApi";
import { IActionArticleForm } from "../@types";
import { selectUserInfo } from "../redux/slices/userSlice";

const CreateArticle = () => {
  const { isAuth, token } = useSelector(selectUserInfo);
  const [createArt, { data: responseData, error }] = useCreateArticleMutation();

  const createArticle: SubmitHandler<IActionArticleForm> = async (
    articleInfo
  ) => {
    await createArt({ articleInfo, token });
  };

  if (responseData) {
    return <Redirect to="/" />;
  }

  return (
    <div>
      {isAuth && (
        <ActionArticle
          title="Create new article"
          queryFn={(data) => createArticle(data)}
        />
      )}
    </div>
  );
};

export default CreateArticle;
