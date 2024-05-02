import React from "react";
import { useForm } from "react-hook-form";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { auth, database } from "../../Config/firebase";
import { addDoc, collection } from "firebase/firestore";
import { useAuthState } from "react-firebase-hooks/auth";
import { useNavigate } from "react-router-dom";

interface FormData {
  title: string;
  description: string;
}

const CreatePostForm = () => {
  const [user] = useAuthState(auth);
  const navigate = useNavigate()

  const schema = yup.object().shape({
    title: yup.string().required("Title is required"),
    description: yup.string().required("Description is required"),
  });

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormData>({
    resolver: yupResolver(schema),
  });


  const postRef = collection(database, "posts");

  const postToDatabase = async (data: FormData) => {
    await addDoc(postRef, {
      ...data,
      username: user?.displayName,
      userid: user?.uid,
    });

    navigate('/')
  };

  return (
    <form onSubmit={handleSubmit(postToDatabase)} className="cpContainer">
      <input placeholder="Title..." {...register("title")} />
      <p style={{ color: "red", fontStyle: "italic" }}>
        {errors.title?.message}
      </p>
      <textarea placeholder="Description..." {...register("description")} />
      <p style={{ color: "red", fontStyle: "italic" }}>
        {errors.description?.message}
      </p>
      <input type="submit" className="subBtn" />
    </form>
  );
};

export default CreatePostForm;
