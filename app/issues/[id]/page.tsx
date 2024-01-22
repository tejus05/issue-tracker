import prisma from '@/prisma/client'
import { Box, Flex, Grid } from '@radix-ui/themes'
import { notFound } from 'next/navigation'
import validator from 'validator'
import EditIssueButton from './EditIssueButton'
import IssueDetails from './IssueDetails'
import DeleteIssueButton from './edit/DeleteIssueButton'

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
    <Grid columns={{initial: "1", sm: "5"}} gap="5">
      <Box className='md:col-span-4'>
        <IssueDetails issue={ issue } />
      </Box>
      <Box>
        <Flex direction="column" gap="4">
          <EditIssueButton issueId={Number(id)}/>
          <DeleteIssueButton issueId={Number(id)}/>
        </Flex>
      </Box>
    </Grid>
  )
}

export default IssueDetailPage