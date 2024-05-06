import React, { useEffect, useState } from "react";
import { IPost } from "./Home";
import {
  addDoc,
  collection,
  deleteDoc,
  doc,
  getDocs,
  query,
  where,
} from "firebase/firestore";
import { auth, database } from "../../Config/firebase";
import { useAuthState } from "react-firebase-hooks/auth";

interface Props {
  post: IPost;
}

interface likes {
  likeId: string;
  userID: string;
}

const Post = (props: Props) => {
  const [user] = useAuthState(auth);
  const { post } = props;
  const [Likes, setLikes] = useState<likes[] | null>(null);

  const likesRef = collection(database, "likes");
  const likesDoc = query(likesRef, where("postID", "==", post.id));

  const addlikes = async () => {
    try {
      const newDoc = await addDoc(likesRef, {
        userID: user?.uid,
        postID: post.id,
      });

      if (user) {
        setLikes((prev) =>
          prev ? [...prev, { userID: user.uid, likeId: newDoc.id }] : [{ userID: user.uid, likeId: newDoc.id }]
        );
      }
    } catch (err) {
      console.log(err);
    }
  };

  const removelikes = async () => {
    try {
      const dltLikeQuery = query(likesRef, where("postID", "==", post.id), where('userID', '==', user?.uid));
      const dltLikeData = await getDocs(dltLikeQuery);
      const likeID = dltLikeData.docs[0].id
      const dltLike = doc(database, 'likes', likeID)
      
      await deleteDoc(dltLike)
      if (user) {
        setLikes((prev) => prev && prev.filter((like)=> like.likeId === likeID));
      }
    } catch (err) {
      console.log(err);
    }
  };

  const likesDisplay = async () => {
    const data = await getDocs(likesDoc);
    setLikes(data.docs.map((doc) => ({ userID: doc.data().userID, likeId: doc.id })));
  };

  const liked = Likes?.find((like) => like.userID === user?.uid);

  useEffect(() => {
    likesDisplay();
  }, []);

  return (
    <div className="post">
      <div className="postHeader">
        <h1 className="title">{post.title}</h1>
      </div>
      <div>
        <p className="postTextContainer">@ {post.username}</p>
        <p className="postTextContainer">{post.description}</p>
        <button onClick={liked ? removelikes : addlikes}>
          {liked ? <>&#128078;</> : <>&#128077;</>}{" "}
        </button>
        {Likes && <p> Likes: {Likes.length}</p>}
      </div>
    </div>
  );
};

export default Post;
