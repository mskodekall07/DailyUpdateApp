import React from 'react'
import { Button, TextArea, TextField } from '@radix-ui/themes'


const newIssuesPage = () => {
  return (
    <div className='max-w-xl space-y-6'>
        <TextField.Root placeholder="Title">
        </TextField.Root>
        <TextArea placeholder="Description" />
        <Button>Submit New Issue</Button>
    </div>
  )
}

export default newIssuesPage