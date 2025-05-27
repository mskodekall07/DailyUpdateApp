"use client";
import { Button, TextField } from '@radix-ui/themes'
//import SimpleMDE from "react-simplemde-editor";



import dynamic from 'next/dynamic'
const SimpleMDE = dynamic(() => import('react-simplemde-editor'), { ssr: false })
import { useForm,Controller } from "react-hook-form"
import axios from 'axios';
import "easymde/dist/easymde.min.css";
import { useRouter } from 'next/navigation';

interface IssueForm {
  title:String;
  description:string;
}


const newIssuesPage = () => {
  const router=useRouter();
  const {register,control,handleSubmit}=useForm<IssueForm>();
  //console.log(register("title"));
  return (
    <form 
    className='max-w-xl space-y-6' 
    onSubmit={handleSubmit(async (data)=>{ 
      await axios.post("/api/issues",data);
      router.push("/issues");
})}>
        <TextField.Root placeholder="Title" {...register("title")}>
        </TextField.Root>
        <Controller name="description" control={control}
        render={(
          { field }) => < SimpleMDE placeholder="Description" { ...field } />} 
        />
        
        <Button>Submit New Issue</Button>
    </form>
  )
}

export default newIssuesPage