import { Button } from '@radix-ui/themes'
import Link from 'next/link'
import React from 'react'

const UpdatesPage = () => {
  return (
    <div><Button>
        <Link href="/updates/new">New Update</Link>
        </Button>
        </div>
  )
}

export default UpdatesPage