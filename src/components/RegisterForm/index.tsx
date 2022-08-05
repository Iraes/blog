import { Link, Redirect } from "react-router-dom";
import { SubmitHandler, useForm } from "react-hook-form";
import { useEffect } from "react";

import { IRegisterFormType } from "../../@types";
import { useRegisterNewUserMutation } from "../../redux/Api/usersAPI";

import s from "./RegisterForm.module.scss";

const RegisterForm = () => {
  const [addUser, { data: responseData, error }] = useRegisterNewUserMutation();

  const {
    register,
    formState: { errors },
    handleSubmit,
    watch,
    setError,
  } = useForm<IRegisterFormType>();

  useEffect(() => {
    /*
    Так как error имеет 2 типа, нужно провести "сужение типов", проверить, есть ли
     свойство в объекте, через оператор сужения in. Таким образом, мы исключаем
     проблему выбора типа объекта ошибки для TS
     */
    if (error) {
      if ("status" in error) {
        /*
        Что находится в error.error - не смог найти в документации. Для того,
        чтобы в последствии использовать объект из error.data, нужно перевести его в строку,
        т.к. тип этого объекта unknown, что не дает его использовать в дальнейшем.
         */
        const errMsg: string =
          "error" in error ? error.error : JSON.stringify(error.data);
        const { errors } = JSON.parse(errMsg);

        if (errors.username) {
          setError("username", {
            message: "Логин занят",
          });
        }
        if (errors.email) {
          setError("email", {
            message: "Почта занята",
          });
        }
      }
    }
  }, [error, responseData]);

  if (responseData) {
    return <Redirect to="/sign-in" />;
  }

  const watchPasswords = watch(["password", "repeat_pass"]);
  const onsubmit: SubmitHandler<IRegisterFormType> = async (data) => {
    const { username, email, password } = data;
    if (watchPasswords[0] === watchPasswords[1]) {
      await addUser({
        username,
        email,
        password,
      }).unwrap();
    } else {
      setError("repeat_pass", {
        message: "Пароли должны совпадать",
      });
    }
  };

  return (
    <form className={s.wrapper} onSubmit={handleSubmit(onsubmit)}>
      <h2 className={s.title}>Create new account</h2>
      <label htmlFor="username" className={s.label}>
        <span className={s.label__title}>Username</span>
        <input
          {...register("username", {
            required: "Поле обязательно к заполнению",
            minLength: {
              value: 3,
              message: "Логин должен быть не меньше 3 символов",
            },
            maxLength: {
              value: 20,
              message: "Логин должен быть не больше 20 символов",
            },
          })}
          className={`${s.input} ${errors?.username && s.error__input}`}
          placeholder="Username"
        />
        {errors?.username && (
          <p className={s.error__text}>
            {`${errors?.username?.message}` || `Error!`}
          </p>
        )}
      </label>
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
          <p className={s.error__text}>
            {`${errors?.email?.message}` || `Error!`}
          </p>
        )}
      </label>
      <label htmlFor="password" className={s.label}>
        <span className={s.label__title}>Password</span>
        <input
          type="password"
          {...register("password", {
            required: "Поле обязательно к заполнению",
            minLength: {
              value: 6,
              message: "Пароль должен быть не меньше 6 символов",
            },
            maxLength: {
              value: 40,
              message: "Пароль должен быть не больше 40 символов",
            },
          })}
          className={`${s.input} ${errors?.password ? s.error__input : ""} ${
            errors?.repeat_pass ? s.error__input : ""
          }`}
          placeholder="Password"
        />
        {errors?.password && (
          <p className={s.error__text}>{`${errors?.password?.message}`}</p>
        )}
      </label>
      <label htmlFor="repeat_pass" className={s.label}>
        <span className={s.label__title}>Repeat Password</span>
        <input
          type="password"
          {...register("repeat_pass", {
            required: "Поле обязательно к заполнению",
            minLength: {
              value: 6,
              message: "Пароль должен быть не меньше 6 символов",
            },
            maxLength: {
              value: 40,
              message: "Пароль должен быть не больше 40 символов",
            },
          })}
          className={`${s.input} ${errors?.repeat_pass ? s.error__input : ""}`}
          placeholder="Password"
        />
        {errors?.repeat_pass && (
          <p className={s.error__text}>{`${errors?.repeat_pass?.message}`}</p>
        )}
      </label>
      <label className={s.agreement}>
        <input
          type="checkbox"
          className={s.agreement__checkbox}
          {...register("agreement", {
            required: "Поле обязательно к заполнению",
          })}
        />
        <span
          className={`${s.agreement__check} ${
            errors?.agreement && s.error__input
          }`}
        />
        <span className={s.agreement__text}>
          I agree to the processing of my personal information
        </span>
        {errors?.agreement && (
          <p className={s.error__text}>
            {`${errors?.agreement?.message}` || `Error!`}
          </p>
        )}
      </label>
      <button className={`btn--reset ${s.form__btn} `} type="submit">
        Create
      </button>
      <p className={s.text}>
        Already have an account?{" "}
        <Link to="/sign-in" className={s.link}>
          Sign In.
        </Link>
      </p>
    </form>
  );
};

export default RegisterForm;
