import React from "react";
import { useForm } from "react-hook-form";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";

interface FormData {
  title: string;
  description: string;
}

const CreatePostForm = () => {
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

  const onPostDone = (data: FormData) => {
    console.log(data);
  };

  return (
    <form onSubmit={handleSubmit(onPostDone)}>
      <input placeholder="Title..." {...register("title")} />
      <p style={{ color: "red", fontStyle: "italic" }}>
        {errors.title?.message}
      </p>
      <textarea placeholder="Description..." {...register("description")} />
      <p style={{ color: "red", fontStyle: "italic" }}>
        {errors.description?.message}
      </p>
      <input type="submit" />
    </form>
  );
};

export default CreatePostForm;
