import React, { useEffect, useState } from "react";
import { getDocs, collection } from "firebase/firestore";
import { database } from "../../Config/firebase";
import Post from "./Post";

export interface IPost {
  id: string;
  userid: string;
  title: string;
  description: string;
  username: string;
}

const Home = () => {
  const [postsList, setPostsList] = useState<IPost[] | null>(null);
  const postsRef = collection(database, "posts");

  const getPosts = async () => {
    const data = await getDocs(postsRef);
    console.log(data);
    
    setPostsList(
      data.docs.map((doc) => ({ ...doc.data(), id: doc.id })) as IPost[]
    );
  };

  useEffect(() => {
    getPosts();
  }, []);

  return (
    <div className="homePage">
      {postsList?.map((post) => (
        <Post post={post}/>
      ))}
    </div>
  );
};

export default Home;
