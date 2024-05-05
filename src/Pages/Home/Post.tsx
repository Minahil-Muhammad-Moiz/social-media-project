import React from "react";
import { IPost } from "./Home";
import { addDoc, collection } from "firebase/firestore";
import { auth, database } from "../../Config/firebase";
import { useAuthState } from "react-firebase-hooks/auth";

interface Props {
  post: IPost;
}
const Post = (props: Props) => {
  const [user] = useAuthState(auth);
  const { post } = props;

  const likesRef = collection(database, "likes");

  const addlikes = async () => {
    await addDoc(likesRef, {
      userID: user?.uid,
      postID: post.id,
    });
  };

  return (
    <div className="post">
      <div className="postHeader">
        <h1 className="title">{post.title}</h1>
      </div>
      <div>
        <p className="postTextContainer">@ {post.username}</p>
        <p className="postTextContainer">{post.description}</p>
        <button onClick={addlikes}> &#128077; </button>
      </div>
    </div>
  );
};

export default Post;
