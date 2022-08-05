import { Route, Switch } from "react-router-dom";

import Header from "../Header";
import ArticleList from "../ArticleList";
import Article from "../Article";
import RegisterForm from "../RegisterForm";
import LoginForm from "../LoginForm";
import EditProfile from "../EditProfile";

import s from "./App.module.scss";

function App() {
  return (
    <div className={s.app}>
      <Header />
      <Switch>
        <Route path="/" component={ArticleList} exact />
        <Route path="/articles" component={ArticleList} exact />
        <Route path="/article/:slug" component={Article} />
        <Route path="/sign-up" component={RegisterForm} />
        <Route path="/sign-in" component={LoginForm} />
        <Route path="/profile" component={EditProfile} />
      </Switch>
    </div>
  );
}

export default App;
