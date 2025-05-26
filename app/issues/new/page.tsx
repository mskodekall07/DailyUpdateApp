"use client";
import { Button, TextField } from '@radix-ui/themes'
//import SimpleMDE from "react-simplemde-editor";


import dynamic from 'next/dynamic'
const SimpleMDE = dynamic(() => import('react-simplemde-editor'), { ssr: false })
import "easymde/dist/easymde.min.css";




const newIssuesPage = () => {
  return (
    <div className='max-w-xl space-y-6'>
        <TextField.Root placeholder="Title">
        </TextField.Root>
        < SimpleMDE  />
        <Button>Submit New Issue</Button>
    </div>
  )
}

export default newIssuesPage