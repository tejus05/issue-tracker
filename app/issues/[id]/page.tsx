import IssueStatusBadge from '@/app/components/IssueStatusBadge'
import prisma from '@/prisma/client'
import { Box, Button, Card, Flex, Grid, Heading, Text } from '@radix-ui/themes'
import { notFound } from 'next/navigation'
import Markdown from 'react-markdown'
import validator from 'validator'
import { Pencil2Icon } from '@radix-ui/react-icons'
import Link from 'next/link'

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
    <Grid columns={{initial: "1", md: "2"}} gap="5">
      <Box>
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
      </Box>
      <Box>
        <Link href={`/issues/${id}/edit`}>
          <Button className='hover:cursor-pointer'>
          <Pencil2Icon/>
            Edit Issue
          </Button>
        </Link>
      </Box>
    </Grid>
  )
}

export default IssueDetailPage