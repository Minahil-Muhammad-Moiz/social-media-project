import React, { useEffect, useState } from "react";
import { getDocs, collection } from "firebase/firestore";
import { database } from "../../Config/firebase";
import Post from "./Post";

interface Post {
  id: string;
  userid: string;
  title: string;
  description: string;
  username: string;
}

const Home = () => {
  const [postsList, setPostsList] = useState<Post[] | null>(null);

  const postsRef = collection(database, "posts");
  const getPosts = async () => {
    const data = await getDocs(postsRef);
    setPostsList(
      data.docs.map((doc) => ({ ...doc.data, id: doc.id })) as Post[]
    );
  };

  useEffect(() => {
    getPosts();
  }, []);

  return (
    <div className="homePage">
      {postsList?.map((post) => (
        <Post />
      ))}
    </div>
  );
};

export default Home;
