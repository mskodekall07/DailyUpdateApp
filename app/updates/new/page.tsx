"use client";
import { Button, Callout, Text, TextField } from '@radix-ui/themes'
//import SimpleMDE from "react-simplemde-editor";



import dynamic from 'next/dynamic'
const SimpleMDE = dynamic(() => import('react-simplemde-editor'), { ssr: false })
import { useForm,Controller } from "react-hook-form"
import axios from 'axios';
import "easymde/dist/easymde.min.css";
import { useRouter } from 'next/navigation';
import { useState } from 'react';

import { zodResolver } from '@hookform/resolvers/zod';
import { createUpdateSchema } from '@/app/validationSchema';

import {z} from "zod";
import ErrorMessage from '@/app/components/ErrorMessage';
import Spinner from '@/app/components/Spinner';

type IssueForm=z.infer<typeof createUpdateSchema>;


const newIssuesPage = () => {
  const router=useRouter();
  const {register,control,handleSubmit,formState: { errors }}=useForm<IssueForm>(
    {resolver:zodResolver(createUpdateSchema)}
  );

  const [error,setError]=useState("");
  const [isSubmitting, setIsSubmitting]=useState(false);

  const onSubmit=handleSubmit(async (data)=>{ 
    try {
      setIsSubmitting(true);
      await axios.post("/api/updates",data);
      router.push("/updates");
      
      
    } catch (error) {
      setIsSubmitting(false);
      setError("An unexpected error occured");
      
    }
});
  //console.log(register("title"));
  return (
    <div className="max-w-xl ">
      {(error && <Callout.Root color="red" className='mb-5' >
        <Callout.Text>{error}</Callout.Text>
      </Callout.Root>)}
    <form 
    className="space-y-6" 
    onSubmit={onSubmit}>
        <TextField.Root placeholder="Title" {...register("title")}>
        </TextField.Root>
        <ErrorMessage>{errors.title?.message}</ErrorMessage>
        <Controller name="description" control={control}
        render={(
          { field }) => < SimpleMDE placeholder="Description" { ...field } />} 
        />
      <ErrorMessage>{errors.description?.message}</ErrorMessage>
        <Button disabled={isSubmitting}>
          Submit New Update { isSubmitting &&< Spinner />}
        </Button>
    </form>
    </div>
  )
}

export default newIssuesPage