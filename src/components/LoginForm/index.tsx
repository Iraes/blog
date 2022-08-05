import { Link, Redirect } from "react-router-dom";
import { SubmitHandler, useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";

import s from "../RegisterForm/RegisterForm.module.scss";
import {
  selectUserInfo,
  setAuth,
  setUserInfo,
} from "../../redux/slices/userSlice";
import { ILogIn } from "../../@types";
import { useUserLogInMutation } from "../../redux/Api/usersAPI";

const LoginForm = () => {
  const { isAuth } = useSelector(selectUserInfo);
  const dispatch = useDispatch();
  const [logIn, { data: responseData, error }] = useUserLogInMutation();

  const {
    register,
    formState: { errors },
    handleSubmit,
    setError,
  } = useForm<ILogIn>();

  useEffect(() => {
    if (responseData) {
      dispatch(setUserInfo(responseData));
      dispatch(setAuth(true));
    }
  }, [responseData]);

  useEffect(() => {
    /*
    Так как error имеет 2 типа, нужно провести "сужение типов", проверить, есть ли
     свойство в объекте, через оператор сужения in. Таким образом, мы исключаем
     проблему выбора типа объекта ошибки для TS
     */
    if (error) {
      if ("status" in error) {
        const errMsg: string =
          "error" in error ? error.error : JSON.stringify(error.data);
        const { errors } = JSON.parse(errMsg);

        if (errors["email or password"]) {
          setError("email", {
            message: "",
          });
          setError("password", {
            message: "Не верные данные",
          });
        }
      }
    }
  }, [error]);

  const onsubmit: SubmitHandler<ILogIn> = async (data) => {
    await logIn(data).unwrap();
  };

  if (isAuth) {
    // return <Redirect to="/articles" />;
    return (
      <form className={s.wrapper}>
        <h2 className={s.title}>Вы успешно авторизовались!</h2>
      </form>
    );
  }

  return (
    <form className={s.wrapper} onSubmit={handleSubmit(onsubmit)}>
      <h2 className={s.title}>Sign In</h2>
      <label htmlFor="email" className={s.label}>
        <span className={s.label__title}>Email address</span>
        <input
          type="email"
          {...register("email", {
            required: "Поле обязательно к заполнению",
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
        <span className={s.label__title}>Password</span>
        <input
          type="password"
          {...register("password", {
            required: "Введите пароль",
          })}
          className={`${s.input} ${errors?.password ? s.error__input : ""}`}
          placeholder="Password"
        />
        {errors?.password && (
          <p className={s.error__text}>{`${errors?.password?.message}`}</p>
        )}
      </label>
      <button className={`btn--reset ${s.form__btn} `}>Login</button>
      <p className={s.text}>
        Already have an account?{" "}
        <Link to="/sign-up" className={s.link}>
          Sign Up.
        </Link>
      </p>
    </form>
  );
};

export default LoginForm;
