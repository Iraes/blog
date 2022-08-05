import { useParams } from "react-router-dom";
import ReactMarkdown from "react-markdown";

import ArticleCard from "../ArticleCard";
import { useGetArticleWithSlugQuery } from "../../redux/Api/articlesApi";

import s from "./Article.module.scss";

const Article = (): JSX.Element => {
  const params: { slug: string } = useParams();

  const { data } = useGetArticleWithSlugQuery(params.slug);
  const article = data && data.article;
  return (
    <div className={s.wrapper}>
      {article && <ArticleCard article={article} />}
      {article && (
        <div className={s.content}>
          <ReactMarkdown>{article.body}</ReactMarkdown>
        </div>
      )}
    </div>
  );
};

export default Article;
