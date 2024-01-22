import prisma from '@/prisma/client'
import dynamic from 'next/dynamic'
import { notFound } from 'next/navigation'
import validator from 'validator'
import IssueFormSkeleton from '../../_components/IssueFormSkeleton'
const IssueForm = dynamic(() => import('@/app/issues/_components/IssueForm'), {
  ssr: false,
  loading: () => <IssueFormSkeleton/>
})

interface Props {
  params: {
    id:string
  }
}

const EditIssuePage = async ({params:{id}}:Props) => {

  if (!validator.isNumeric(id)) notFound();

  const issue = await prisma.issue.findUnique({
    where: {
      id: parseInt(id)
    }
  })

  if (!issue) notFound();

  

  return (
    <IssueForm issue={ issue } />
  )
}

export default EditIssuePage