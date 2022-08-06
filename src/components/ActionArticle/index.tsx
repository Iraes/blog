import React, { FC, useEffect, useState } from "react";
import { useForm } from "react-hook-form";

import { IActionArticleForm, IArticles, ICreateFormType } from "../../@types";

import s from "./CreateArticle.module.scss";

interface IActionArticleProps {
  title: string;
  queryFn: (data: IActionArticleForm) => void;
  articleData?: IArticles;
}
const ActionArticle: FC<IActionArticleProps> = ({
  title,
  queryFn,
  articleData,
}) => {
  const {
    register,
    formState: { errors },
    handleSubmit,
    setValue,
  } = useForm<ICreateFormType>();

  const [tags, setTags] = useState<Array<string>>([]);

  useEffect(() => {
    if (articleData) {
      setTags([...articleData.tagList]);
      setValue("title", articleData.title);
      setValue("text", articleData.body);
      setValue("snippet", articleData.description);
    } else {
      setTags([""]);
    }
  }, []);

  const onsubmit = (data: IActionArticleForm) => {
    queryFn(data);
  };

  const changeData: (value: string, index: number) => Array<string> = (
    value: string,
    index: number
  ) => {
    return tags.map((tag, idx) => {
      if (idx === index) return value;
      return tag;
    });
  };

  const deleteTag = (e: React.MouseEvent<HTMLButtonElement>, index: number) => {
    e.preventDefault();
    const filteredTags = tags.filter((tag, idx) => {
      return idx !== index;
    });
    setTags(filteredTags);
  };

  return (
    <form className={s.wrapper} onSubmit={handleSubmit(onsubmit)}>
      <h2 className={s.title}>{title}</h2>
      <label htmlFor="title" className={s.label}>
        <span className={s.label__title}>Title</span>
        <input
          {...register("title", {
            required: "Поле обязательно к заполнению",
          })}
          className={`${s.input} ${errors?.title && s.error__input}`}
          placeholder="Title"
        />
        {errors?.title && (
          <p className={s.error__text}>
            {`${errors?.title?.message}` || `Error!`}
          </p>
        )}
      </label>
      <label htmlFor="snippet" className={s.label}>
        <span className={s.label__title}>Short description</span>
        <input
          type="text"
          {...register("snippet", {
            required: "Поле обязательно к заполнению",
          })}
          className={`${s.input} ${errors?.snippet && s.error__input}`}
          placeholder="Short description"
        />
        {errors?.snippet && (
          <p className={s.error__text}>
            {`${errors?.snippet?.message}` || `Error!`}
          </p>
        )}
      </label>
      <label htmlFor="text" className={s.label}>
        <span className={s.label__title}>Text</span>
        <textarea
          {...register("text", {
            required: "Поле обязательно к заполнению",
          })}
          className={`${s.text__area} ${errors?.text ? s.error__input : ""}`}
          placeholder="Text"
          rows={10}
        />
        {errors?.text && (
          <p className={s.error__text}>{`${errors?.text?.message}`}</p>
        )}
      </label>
      <label className={`${s.label}`}>
        <span className={s.label__title}>Tags</span>
        {tags.map((tag, index) => {
          return (
            <div key={index + "divTag"}>
              <input
                key={index + "inputTag"}
                type="text"
                {...register(`tags.${index}`)}
                className={`${s.input} ${s.input__tag} ${
                  errors?.tags ? s.error__input : ""
                }`}
                placeholder="Tag"
                value={tags[index]}
                onChange={(e) => setTags(changeData(e.target.value, index))}
              />
              {tags.length > 1 && (
                <button
                  className={`btn--reset ${s.tag__delete}`}
                  onClick={(e) => {
                    deleteTag(e, index);
                  }}
                >
                  Delete
                </button>
              )}
              {index + 1 === tags.length && (
                <button
                  type="button"
                  className={`btn--reset ${s.tag__add}`}
                  onClick={() => setTags([...tags, ""])}
                >
                  Add tag
                </button>
              )}
            </div>
          );
        })}
      </label>
      <button className={`btn--reset ${s.form__btn}`} type="submit">
        Sand
      </button>
    </form>
  );
};

export default ActionArticle;
