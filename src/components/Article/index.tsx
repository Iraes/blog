import { useParams } from "react-router-dom";
import ReactMarkdown from "react-markdown";
import { useSelector } from "react-redux";

import ArticleCard from "../ArticleCard";
import { useGetArticleWithSlugQuery } from "../../redux/Api/articlesApi";
import { selectUserInfo } from "../../redux/slices/userSlice";

import s from "./Article.module.scss";

const Article = (): JSX.Element => {
  const params: { slug: string } = useParams();
  const { token } = useSelector(selectUserInfo);
  const { data } = useGetArticleWithSlugQuery({ slug: params.slug, token });

  const article = data && data.article;
  console.log(article);
  return (
    <div className={s.wrapper}>
      {article && <ArticleCard article={article} isFullArticle />}
      {article && (
        <div className={s.content}>
          <ReactMarkdown>{article.body}</ReactMarkdown>
        </div>
      )}
    </div>
  );
};

export default Article;
