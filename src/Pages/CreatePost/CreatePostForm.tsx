import React from 'react';
import { useForm } from 'react-hook-form';
import * as yup from "yup";
import {yupResolver} from '@hookform/resolvers/yup'


const CreatePostForm = () => {
    const schema = yup.object().shape({
        title: yup.string().required("Title is required"),
        description: yup.string().required("Description is required"),
    })

    const {register, handleSubmit} = useForm({
        resolver: yupResolver(schema)
    })

    const onPostDone = (data: any)=>{
        console.log(data);
        
    }

  return (
    <form onSubmit={handleSubmit(onPostDone)}>
        <input placeholder='Title...' {...register('title')} />
        <textarea placeholder='Description...' {...register('description')}/>
        <input type="submit" />
    </form>
  )
}

export default CreatePostForm