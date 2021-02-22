import React, { Component } from "react";
import axios from "axios";
import "./FullPost.css";

class FullPost extends Component {
  state = {
    post: null,
  };

  componentDidMount() {
    if (this.props.match.params.id) {
      axios.get(`/posts/${this.props.match.params.id}`).then((res) =>
        this.setState({
          post: res.data,
        })
      );
    }
  }

  componentDidUpdate(prev) {
    if (this.props.match.params.id) {
      if (prev.match.params.id !== this.props.match.params.id) {
        axios.get(`/posts/${this.props.match.params.id}`).then((res) =>
          this.setState({
            post: res.data,
          })
        );
      }
    }
  }

  deletePost = () => {
    axios.delete(`/posts/${this.props.match.params.id}`).then((res) => {
      console.log(res);
    });
  };
  render() {
    let post = <p style={{ textAlign: "center" }}>Please select a Post!</p>;
    if (this.props.match.params.id) {
      post = <p style={{ textAlign: "center" }}>Loading...</p>;
    }

    if (this.state.post) {
      post = (
        <div className="FullPost">
          <h1>{this.state.post.title}</h1>
          <p>{this.state.post.body}</p>
          <div className="Edit">
            <button onClick={this.deletePost} className="Delete">
              Delete
            </button>
          </div>
        </div>
      );
    }
    return post;
  }
}

export default FullPost;
