import { SubmitHandler, useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import { Redirect } from "react-router-dom";
import { useEffect, useState } from "react";

import s from "../RegisterForm/RegisterForm.module.scss";
import { IUpdateUser } from "../../@types";
import {
  useUpdateUserMutation,
  useGetUserInfoQuery,
} from "../../redux/Api/usersAPI";
import { selectUserInfo, setUserInfo } from "../../redux/slices/userSlice";

const EditProfile = () => {
  const [isUpdate, setIsUpdate] = useState(false);
  const dispatch = useDispatch();
  const { isAuth, token } = useSelector(selectUserInfo);
  const [updateInfo, { data: responseData, error }] = useUpdateUserMutation();
  const { data, error: getError, isFetching } = useGetUserInfoQuery(token);
  const {
    register,
    formState: { errors },
    handleSubmit,
    setError,
  } = useForm<IUpdateUser>();

  useEffect(() => {
    if (responseData) {
      dispatch(setUserInfo(responseData));
    }
  }, [responseData]);

  const onsubmit: SubmitHandler<IUpdateUser> = async (data) => {
    await updateInfo({ ...data, token }).unwrap();
    setIsUpdate(true);
  };

  useEffect(() => {
    /*
    Так как error имеет 2 типа, нужно провести "сужение типов", проверить, есть ли
     свойство в объекте, через оператор сужения in. Таким образом, мы исключаем
     проблему выбора типа объекта ошибки для TS.
     */
    if (error) {
      if ("status" in error) {
        const errMsg: string =
          "error" in error ? error.error : JSON.stringify(error.data);
        const { errors } = JSON.parse(errMsg);

        if (errors.email) {
          setError("email", {
            message: "Почта занята",
          });
        }
        if (errors.username) {
          setError("username", {
            message: "Ник занят",
          });
        }
      }
    }
  }, [error]);

  if (!isAuth) {
    return <Redirect to="/articles" />;
  }

  return (
    <form className={s.wrapper} onSubmit={handleSubmit(onsubmit)}>
      <h2 className={s.title}>Edit Profile</h2>
      <label htmlFor="username" className={s.label}>
        <span className={s.label__title}>Username</span>
        <input
          type="text"
          {...register("username", {
            required: "Не может быть пустым",
          })}
          className={`${s.input} ${errors?.username && s.error__input}`}
          placeholder="Username"
        />
        {errors?.username && (
          <p className={s.error__text}>{`${errors?.username?.message}`}</p>
        )}
      </label>
      <label htmlFor="email" className={s.label}>
        <span className={s.label__title}>Email address</span>
        <input
          type="email"
          {...register("email", {
            required: "Не может быть пустым",
            pattern: {
              value: /^([A-Za-z0-9_\-.])+@([A-Za-z0-9_\-.])+\.([A-Za-z]{2,4})$/,
              message: "Введите валидную почту",
            },
          })}
          className={`${s.input} ${errors?.email && s.error__input}`}
          placeholder="Email address"
        />
        {errors?.email && (
          <p className={s.error__text}>{`${errors?.email?.message}`}</p>
        )}
      </label>
      <label htmlFor="password" className={s.label}>
        <span className={s.label__title}>New password</span>
        <input
          type="password"
          {...register("password", {
            minLength: {
              value: 6,
              message: "Пароль должен быть не меньше 6 символов",
            },
            maxLength: {
              value: 40,
              message: "Пароль должен быть не больше 40 символов",
            },
          })}
          className={`${s.input} ${errors?.password ? s.error__input : ""}`}
          placeholder="New password"
        />
        {errors?.password && (
          <p className={s.error__text}>{`${errors?.password?.message}`}</p>
        )}
      </label>
      <label htmlFor="avatar" className={s.label}>
        <span className={s.label__title}>Avatar image (url)</span>
        <input
          type="text"
          {...register("avatar", {
            pattern: {
              value:
                /^(https?:\/\/)(?:[a-z0-9-]+\.)+[a-z]{2,6}(?:\/[^/#?]+)+\.(?:jpg|gif|png)$/,
              message: "Неверная ссылка",
            },
          })}
          className={`${s.input} ${errors?.avatar && s.error__input}`}
          placeholder="Avatar image"
        />
        {errors?.avatar && (
          <p className={s.error__text}>{`${errors?.avatar?.message}`}</p>
        )}
      </label>
      <button className={`btn--reset ${s.form__btn} `}>Save</button>
    </form>
  );
};

export default EditProfile;
