import React, { useEffect, useState } from "react";
import { IPost } from "./Home";
import { addDoc, collection, doc, getDocs, query, where } from "firebase/firestore";
import { auth, database } from "../../Config/firebase";
import { useAuthState } from "react-firebase-hooks/auth";

interface Props {
  post: IPost;
}
const Post = (props: Props) => {
  const [user] = useAuthState(auth);
  const { post } = props;
  const [likeAmount, setLikeAmount] = useState<number | null >(null)

  const likesRef = collection(database, "likes");
  const likesDoc = query(likesRef, where('postID', '==', post.id))

  const addlikes = async () => {
    await addDoc(likesRef, {
      userID: user?.uid,
      postID: post.id,
    });
  };

  const likesDisplay = async()=>{
   const data = await getDocs(likesDoc)
   setLikeAmount(data.docs.length)
  }

  useEffect(()=>{
    likesDisplay()
  },[])

  return (
    <div className="post">
      <div className="postHeader">
        <h1 className="title">{post.title}</h1>
      </div>
      <div>
        <p className="postTextContainer">@ {post.username}</p>
        <p className="postTextContainer">{post.description}</p>
        <button onClick={addlikes}> &#128077; </button>
        {likeAmount && <p> Likes: {likeAmount}</p>}
      </div>
    </div>
  );
};

export default Post;
