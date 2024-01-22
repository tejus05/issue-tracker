import React from 'react'
import IssueForm from '../../_components/IssueForm'
import prisma from '@/prisma/client'
import validator from 'validator'
import { notFound } from 'next/navigation'

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