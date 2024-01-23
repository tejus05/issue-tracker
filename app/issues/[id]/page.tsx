import prisma from '@/prisma/client'
import { Box, Flex, Grid } from '@radix-ui/themes'
import { notFound } from 'next/navigation'
import validator from 'validator'
import EditIssueButton from './EditIssueButton'
import IssueDetails from './IssueDetails'
import DeleteIssueButton from '../edit/DeleteIssueButton'
import { getServerSession } from 'next-auth'
import authOptions from '@/app/api/auth/authOptions'
import AssigneeSelect from './AssigneeSelect'

interface Props {
  params: {
    id: string
  }
}

const IssueDetailPage = async ({params:{id}}:Props) => {

  if (!validator.isNumeric(id)) {
    notFound();
  }

  const session = await getServerSession(authOptions)

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
      {
        session && (
          <Box>
            <Flex direction="column" gap="4">
              <AssigneeSelect issue={issue}/>
              <EditIssueButton issueId={Number(id)}/>
              <DeleteIssueButton issueId={Number(id)}/>
            </Flex>
          </Box>
        )  
      }
    </Grid>
  )
}

export default IssueDetailPage