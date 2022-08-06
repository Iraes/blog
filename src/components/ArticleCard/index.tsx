import { Link, Redirect } from "react-router-dom";
import { Tag } from "antd";
import { FC, useState } from "react";
import { useSelector } from "react-redux";

import UserInfo from "../UI/UserInfo";
import MyLike from "../UI/MyLike";
import { IArticles } from "../../@types";
import { cuttingDescription } from "../../helpers";
import { selectUserInfo } from "../../redux/slices/userSlice";
import {
  useLikeMutation,
  useDeleteLikeMutation,
  useDeleteArticleMutation,
} from "../../redux/Api/articlesApi";

import s from "./ArticleCard.module.scss";

const ArticleCard: FC<{
  article: IArticles;
  shadow?: boolean;
  isFullArticle?: boolean;
}> = ({ article, shadow, isFullArticle }) => {
  const isShadow = shadow && s.wrapper__shadow;
  const {
    slug,
    title,
    createdAt,
    author,
    tagList,
    description,
    favorited,
    favoritesCount,
  } = article;
  const { username, image } = author;
  const tagsWithoutRepeats = Array.from(new Set(tagList));
  const { isAuth, token, username: user } = useSelector(selectUserInfo);
  const [isDelete, setIsDelete] = useState(false);
  const [like] = useLikeMutation();
  const [unLike] = useDeleteLikeMutation();
  const [deleteArticle, { data: responseDelete, error }] =
    useDeleteArticleMutation();

  const follow = async () => {
    favorited ? await unLike({ slug, token }) : await like({ slug, token });
  };

  const onDeleteArticle = () => {
    deleteArticle({ slug, token });
    setIsDelete(true);
  };

  const controlBtn = () => {
    if (isFullArticle && username === user) {
      return (
        <div className={s.article__btn__wrapper}>
          <button
            className={`btn--reset ${s.article__delete}`}
            onClick={onDeleteArticle}
          >
            Delete
          </button>
          <Link
            to={`/articles/${slug}/edit`}
            className={`btn--reset ${s.article__edit}`}
          >
            Edit
          </Link>
        </div>
      );
    }
  };

  if (isDelete) {
    return <Redirect to="/" />;
  }

  return (
    <div className={`${s.wrapper} ${isShadow}`}>
      <div className={s.article__info}>
        <Link to={`/article/${slug}`} className={s.title}>
          {cuttingDescription(title, 0, 5)}
        </Link>
        <MyLike
          count={favoritesCount}
          active={isAuth}
          onClick={follow}
          favorite={favorited}
        />
        <div className={s.tag__wrapper}>
          {tagsWithoutRepeats.map((tag, i) => {
            return (
              tag.replace(/\s/g, "") && (
                <Tag className={s.tag} key={`${slug}${i}`}>
                  {cuttingDescription(tag, 3, 0)}
                </Tag>
              )
            );
          })}
        </div>
        <p className={s.article__snippet}>
          {cuttingDescription(description, 0, 80)}
        </p>
      </div>
      <div className={s.article__user_info}>
        <UserInfo name={username} avatarUrl={image} date={createdAt} />
        {controlBtn()}
      </div>
    </div>
  );
};

export default ArticleCard;
