import { Alert, Pagination } from "antd";
import { useDispatch, useSelector } from "react-redux";
import { FC } from "react";

import ArticleCard from "../ArticleCard";
import { useGetArticlesQuery } from "../../redux/Api/articlesApi";
import { IArticles } from "../../@types";
import {
  selectArticles,
  setArticlesOffset,
} from "../../redux/slices/articlesSlice";
import MyLoader from "../UI/MyLoader";
import { selectUserInfo } from "../../redux/slices/userSlice";

import s from "./ArticleList.module.scss";

const ArticleList: FC = () => {
  const { token } = useSelector(selectUserInfo);
  const { articles_offset } = useSelector(selectArticles);
  const dispatch = useDispatch();
  const { data, error, isFetching } = useGetArticlesQuery({
    offset: articles_offset,
    token,
  });
  const articlesList = data && data.articles;

  const onChangePage = (offset: number) => {
    dispatch(setArticlesOffset(offset * 20));
    window.scroll(0, 0);
  };

  return (
    <div className={s.wrapper + " wrapper_test"}>
      {isFetching && [...new Array(5)].map((_, i) => <MyLoader key={i} />)}
      {error && (
        <Alert
          message="Проблемы с получением статей"
          description="К сожалению, сервер не отвечает или вы сделали не правильный запрос. Вернитесь на главную страницу и повторите запрос"
          type="error"
        />
      )}
      {articlesList &&
        articlesList.map((article: IArticles) => {
          return (
            <ArticleCard
              key={`${article.slug}${article.author.username}${article.createdAt}`}
              article={article}
              shadow
            />
          );
        })}
      <Pagination
        hideOnSinglePage
        size={"small"}
        current={articles_offset ? articles_offset / 20 : 1}
        total={data && data.articlesCount}
        pageSize={20}
        showSizeChanger={false}
        onChange={(pageNum) => onChangePage(pageNum)}
      />
    </div>
  );
};

export default ArticleList;
