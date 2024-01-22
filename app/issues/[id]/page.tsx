import prisma from '@/prisma/client'
import { Box, Grid } from '@radix-ui/themes'
import { notFound } from 'next/navigation'
import validator from 'validator'
import EditIssueButton from './EditIssueButton'
import IssueDetails from './IssueDetails'

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
        <IssueDetails issue={ issue } />
      </Box>
      <Box>
        <EditIssueButton issueId={Number(id)}/>
      </Box>
    </Grid>
  )
}

export default IssueDetailPage