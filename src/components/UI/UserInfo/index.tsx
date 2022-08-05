import { FC } from "react";
import { format } from "date-fns";
import ru from "date-fns/locale/ru";
import { Link } from "react-router-dom";

import avatar from "../../../assets/avatar.png";

import s from "./UserInfo.module.scss";

const UserInfo: FC<{
  name: string;
  date?: string;
  avatarUrl?: string;
}> = ({ name, date, avatarUrl }) => {
  const userData =
    date && format(new Date(date), "MMMM d, yyyy", { locale: ru });

  return (
    <div className={s.wrapper}>
      <p className={s.wrapper__descr}>
        <Link to="/profile" className={s.name}>
          {name}
        </Link>
        <span className={s.date}>
          {userData && userData[0].toUpperCase() + userData.substring(1)}
        </span>
      </p>
      <Link to="/profile">
        <img
          src={avatarUrl ? avatarUrl : avatar}
          alt="user avatar"
          className={s.avatar}
        />
      </Link>
    </div>
  );
};

export default UserInfo;
