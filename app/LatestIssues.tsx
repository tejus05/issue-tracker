import React from 'react'
import prisma from '@/prisma/client'
import { Avatar, Card, Flex, Heading, Table } from '@radix-ui/themes'
import { IssueStatusBadge } from './components'
import Link from 'next/link'

const LatestIssues =async () => {

  const issues = await prisma.issue.findMany({
    orderBy: {
      createdAt: "desc"
    },
    take: 5,
    include: {
      assignedToUser: true
    }
  })

  return (
    <Card>
      <Table.Root>
        <Heading size="4" mb="5">
          Latest Issues
        </Heading>
        <Table.Body>
          {
            issues.map(issue => (
              <Table.Row key={issue.id}>
                <Table.Cell>
                  <Flex justify="between">
                    <Flex direction="column" align="start" gap="2">
                      <Link href={`/issues/${issue.id}`}>
                        {issue.title}
                      </Link>
                      <IssueStatusBadge status={issue.status} />
                    </Flex>
                    {
                      issue.assignedToUser && (
                        <Avatar src={issue.assignedToUser.image!} fallback="?" radius='full' size="2">
                          
                        </Avatar>
                      )
                    }
                  </Flex>
                </Table.Cell>
              </Table.Row>
            ))
          }
        </Table.Body>
      </Table.Root>
    </Card>
  )
}

export default LatestIssues