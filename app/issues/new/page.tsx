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
import { createIssueSchema } from '@/app/createIssueSchema';

import {z} from "zod";

type IssueForm=z.infer<typeof createIssueSchema>;


const newIssuesPage = () => {
  const router=useRouter();
  const {register,control,handleSubmit,formState: { errors }}=useForm<IssueForm>(
    {resolver:zodResolver(createIssueSchema)}
  );

  const [error,setError]=useState("");
  //console.log(register("title"));
  return (
    <div className="max-w-xl ">
      {(error && <Callout.Root color="red" className='mb-5' >
        <Callout.Text>{error}</Callout.Text>
      </Callout.Root>)}
    <form 
    className="space-y-6" 
    onSubmit={handleSubmit(async (data)=>{ 
      try {
        await axios.post("/api/issues",data);
        router.push("/issues");
        
      } catch (error) {
        setError("An unexpected error occured");
      }
})}>
        <TextField.Root placeholder="Title" {...register("title")}>
        </TextField.Root>
        {errors.title && <Text color='red' >Title is required</Text>}
        <Controller name="description" control={control}
        render={(
          { field }) => < SimpleMDE placeholder="Description" { ...field } />} 
        />
        {errors.description && <Text color="red" as="p">Description is required</Text>}
        <Button>Submit New Issue</Button>
    </form>
    </div>
  )
}

export default newIssuesPage