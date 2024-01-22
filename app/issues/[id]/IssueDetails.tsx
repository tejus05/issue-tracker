import { IssueStatusBadge } from '@/app/components'
import { Issue } from '@prisma/client'
import { Heading, Flex, Card, Text } from '@radix-ui/themes'
import React from 'react'
import Markdown from 'react-markdown'

const IssueDetails = ({issue}: {issue: Issue}) => {
  return (
    <>
      <Heading>{issue.title}</Heading>
      <Flex gap="3" my='2'>
        <IssueStatusBadge status={issue.status} />
        <Text>{issue.createdAt.toDateString()}</Text>
      </Flex>
      <Card className='prose mt-5'>
        <Markdown>
          {issue.description}
        </Markdown>
      </Card>
    </>
  )
}

export default IssueDetails