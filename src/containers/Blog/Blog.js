import React, { Component } from "react";
import {Redirect, Route, NavLink, Switch } from "react-router-dom";
import "./Blog.css";
import Posts from "../Blog/Posts/Posts";
import NewPost from "./NewPost/NewPost";
// import FullPost from "./FullPost/FullPost";

import asynComponent from "../../HOC/asynComponent";

const AsynComponent = asynComponent(()=> {
  return import("./NewPost/NewPost");
})
class Blog extends Component {
  render() {
    return (
      <div className="Blog">
        <header>
          <nav>
            <ul>
              <li>
                <NavLink to="/posts/" exact activeClassName="my-active">
                  Posts
                </NavLink>
              </li>
              <li>
                <NavLink
                  to={{
                    pathname: "/new-post",
                    hash: "#submit",
                  }}
                >
                  New Post
                </NavLink>
              </li>
            </ul>
          </nav>
        </header>
        <Switch>
          <Route path="/new-post" exact component={AsynComponent}></Route>
          <Route path="/posts" component={Posts}></Route>
          <Redirect from="/" to="/posts"></Redirect>
        </Switch>
      </div>
    );
  }
}

export default Blog;
