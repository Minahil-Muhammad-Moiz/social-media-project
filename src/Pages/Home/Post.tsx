import React from "react";
import { IPost } from "./Home";

interface Props {
  post: IPost;
}
const Post = (props: Props) => {
  const { post } = props;
  return (
    <div className="post">
      <div className="postHeader">
        <h1 className="title">{post.title}</h1>
      </div>
      <div>
        <p className="postTextContainer">@ {post.username}</p>
        <p className="postTextContainer">{post.description}</p>
        <button> &#128077; </button>
      </div>
    </div>
  );
};

export default Post;
