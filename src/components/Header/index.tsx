import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";

import UserInfo from "../UI/UserInfo";
import { selectUserInfo, setAuth } from "../../redux/slices/userSlice";

import s from "./Header.module.scss";

const Header = () => {
  const { isAuth, username, avatar } = useSelector(selectUserInfo);
  const dispatch = useDispatch();

  const logOutHandler = () => {
    dispatch(setAuth(false));
  };

  function authBlock(isAuth: boolean): JSX.Element {
    console.log();

    return isAuth ? (
      <>
        <Link to="/create-article" className={s["create-btn"]}>
          Create article
        </Link>
        <UserInfo name={username} avatarUrl={avatar} />
        <Link onClick={logOutHandler} to="/" className={s["logout-btn"]}>
          Log Out
        </Link>
      </>
    ) : (
      <>
        <Link to="/sign-in" className={s.header__text}>
          Sign In
        </Link>
        <Link to="/sign-up" className={s.register__btn}>
          Sign Up
        </Link>
      </>
    );
  }

  return (
    <div className={s.header}>
      <div>
        <Link to="/" className={s.header__text}>
          Realworld Blog
        </Link>
      </div>
      <div className={s.user__wrapper}>{authBlock(isAuth)}</div>
    </div>
  );
};

export default Header;
