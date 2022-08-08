import { Link, Redirect } from "react-router-dom";
import { Tag, Popover } from "antd";
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
  const [visible, setVisible] = useState(false);
  const [like] = useLikeMutation();
  const [unLike] = useDeleteLikeMutation();
  const [deleteArticle] = useDeleteArticleMutation();

  const hide = () => {
    setVisible(false);
  };

  const handleVisibleChange = (newVisible: boolean) => {
    setVisible(newVisible);
  };

  const follow = async () => {
    favorited ? await unLike({ slug, token }) : await like({ slug, token });
  };

  const onDeleteArticle = () => {
    deleteArticle({ slug, token });
    setIsDelete(true);
  };

  const popoverContent = (
    <>
      <svg
        width="20"
        height="20"
        viewBox="0 0 20 20"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className={s.popover__svg}
      >
        <path
          d="M8 1C4.13438 1 1 4.13438 1 8C1 11.8656 4.13438 15 8 15C11.8656 15 15 11.8656 15 8C15 4.13438 11.8656 1 8 1ZM7.5 4.625C7.5 4.55625 7.55625 4.5 7.625 4.5H8.375C8.44375 4.5 8.5 4.55625 8.5 4.625V8.875C8.5 8.94375 8.44375 9 8.375 9H7.625C7.55625 9 7.5 8.94375 7.5 8.875V4.625ZM8 11.5C7.80374 11.496 7.61687 11.4152 7.47948 11.275C7.3421 11.1348 7.26515 10.9463 7.26515 10.75C7.26515 10.5537 7.3421 10.3652 7.47948 10.225C7.61687 10.0848 7.80374 10.004 8 10C8.19626 10.004 8.38313 10.0848 8.52052 10.225C8.6579 10.3652 8.73485 10.5537 8.73485 10.75C8.73485 10.9463 8.6579 11.1348 8.52052 11.275C8.38313 11.4152 8.19626 11.496 8 11.5Z"
          fill="#FAAD14"
        />
      </svg>
    </>
  );

  const controlBtn = () => {
    if (isFullArticle && username === user) {
      return (
        <div className={s.article__btn__wrapper}>
          <Popover
            content={
              <div className={s.popover__btn_wrapper}>
                <button
                  onClick={hide}
                  className={`btn--reset ${s.popover__btn} ${s.popover__btn_no}`}
                >
                  No
                </button>
                <button
                  onClick={onDeleteArticle}
                  className={`btn--reset ${s.popover__btn} ${s.popover__btn_yes}`}
                >
                  Yes
                </button>
              </div>
            }
            title={
              <div className={s.popover__title}>
                {popoverContent} Вы уверены что хотите удалить статью?
              </div>
            }
            trigger="click"
            visible={visible}
            onVisibleChange={handleVisibleChange}
          >
            <button className={`btn--reset ${s.article__delete}`}>
              Delete
            </button>
          </Popover>
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
          {cuttingDescription(title, 45, 5)}
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
