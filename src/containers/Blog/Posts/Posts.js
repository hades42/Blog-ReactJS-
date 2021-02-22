import React, { Component } from "react";
import axios from "../../../axios";
import Post from "../../../components/Post/Post";
import { Route, Link } from "react-router-dom";
import FullPost from "../FullPost/FullPost";
import "./Posts.css";
class Posts extends Component {
  state = {
    posts: [],
    // selectedPost: null,
    error: false,
  };

  componentDidMount() {
    console.log(this.props);
    axios
      .get("/posts")
      .then((response) => {
        // handle success
        let posts = response.data.slice(0, 4);
        const updatedPost = posts.map((p) => {
          return {
            ...p,
            author: "Van Nguyen",
          };
        });
        this.setState({ posts: updatedPost });
        // console.log(updatedPost);
      })
      .catch((error) => {
        // handle error
        // console.log(error);
        this.setState({
          error: true,
        });
      });
  }

  postSelectHandler = (id) => {
    this.setState({
      selectedPost: id,
    });
  };

  render() {
    let posts = <p style={{ textAlign: "center" }}>Something went wrong!</p>;
    if (!this.state.error) {
      posts = this.state.posts.map((p) => {
        return (
          <Link key={p.id} to={"/posts/" + p.id}>
            <Post
              title={p.title}
              author={p.author}
              clicked={() => this.postSelectHandler(p.id)}
            ></Post>
          </Link>
        );
      });
    }
    return (
      <div>
        <section className="Posts">{posts}</section>;
        <Route
          path={this.props.match.url + "/:id"} exact
          component={FullPost}
        ></Route>
      </div>
    );
  }
}

export default Posts;
