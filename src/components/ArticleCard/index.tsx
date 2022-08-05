import { Link } from "react-router-dom";
import { Tag } from "antd";
import { FC } from "react";

import UserInfo from "../UI/UserInfo";
import MyLike from "../UI/MyLike";
import { IArticles } from "../../@types";
import { cuttingDescription } from "../../helpers";

import s from "./ArticleCard.module.scss";

const ArticleCard: FC<{ article: IArticles; shadow?: boolean }> = ({
  article,
  shadow,
}) => {
  const isShadow = shadow && s.wrapper__shadow;
  const { slug, title, createdAt, author, tagList, description } = article;
  const { username, image } = author;
  const tagsWithoutRepeats = Array.from(new Set(tagList));
  return (
    <div className={`${s.wrapper} ${isShadow}`}>
      <div className={s.article__info}>
        <Link to={`/article/${slug}`} className={s.title}>
          {cuttingDescription(title, 3, 0)}
        </Link>
        <MyLike count={1} />
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
      </div>
    </div>
  );
};

export default ArticleCard;
