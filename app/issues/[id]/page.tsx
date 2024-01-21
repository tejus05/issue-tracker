import IssueStatusBadge from '@/app/components/IssueStatusBadge'
import prisma from '@/prisma/client'
import { Card, Flex, Heading, Text } from '@radix-ui/themes'
import { notFound } from 'next/navigation'
import Markdown from 'react-markdown'
import validator from 'validator'

interface Props {
  params: {
    id: string
  }
}

const IssueDetailPage = async ({params:{id}}:Props) => {

  if (!validator.isNumeric(id)) {
    notFound();
  }

  const issue = await prisma.issue.findUnique({
    where: {
      id: parseInt(id)
    }
  })

  if (!issue) notFound();

  return (
    <div>
      <Heading>{ issue.title }</Heading>
      <Flex gap="3" my='2'>
        <IssueStatusBadge status={issue.status}/>
        <Text>{ issue.createdAt.toDateString() }</Text>
      </Flex>
      <Card className='prose mt-5'>
        <Markdown>
          {issue.description}
        </Markdown>
      </Card>
    </div>
  )
}

export default IssueDetailPage