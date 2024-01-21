import { Status } from '@prisma/client'
import { Badge } from '@radix-ui/themes'
import React from 'react'

interface Props{
  status: Status
} 

const statusMap: Record< Status, { label: string, color: 'red' | 'violet' | 'green' }> = {
  OPEN: {
    label: "Open",
    color: "red"
  },
  CLOSED: {
    label: "Closed",
    color: "green"
  },
  IN_PROGRESS: {
    label: "In Progress",
    color: "violet"
  }
}

const IssueStatusBadge = ({status}:Props) => {
  return <Badge color={statusMap[status].color}>{statusMap[status].label}</Badge>
}

export default IssueStatusBadge