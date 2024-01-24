import { Button, Flex } from '@radix-ui/themes'
import Link from 'next/link'
import React from 'react'
import IssueStatusFilter from './IssueStatusFilter'

const IssueActions = () => {
  return (
    <Flex justify="between">
      <IssueStatusFilter/>
      <Link href='/issues/new'>
        <Button className='hover:cursor-pointer'>
            New Issue 
        </Button>
      </Link>
    </Flex>
  )
}

export default IssueActions