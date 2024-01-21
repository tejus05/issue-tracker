import { Button, Table, TableBody, TableHeader } from '@radix-ui/themes'
import Link from 'next/link'
import prisma from '@/prisma/client'
import IssueStatusBadge from '../components/IssueStatusBadge';

const IssuesPage = async() => {

  const issues = await prisma.issue.findMany();

  return (
    <div>
      <div className='mb-5'>
        <Link href='/issues/new'>
          <Button className='hover:cursor-pointer'>
              New Issue
          </Button>
        </Link>
      </div>
      <Table.Root variant='surface'>
        <TableHeader>
          <Table.Row>
            <Table.ColumnHeaderCell>
              Issue
            </Table.ColumnHeaderCell>
            <Table.ColumnHeaderCell className='hidden md:table-cell'>
              Status
            </Table.ColumnHeaderCell>
            <Table.ColumnHeaderCell className='hidden md:table-cell'>
              Created
            </Table.ColumnHeaderCell>
          </Table.Row>
        </TableHeader>
        <TableBody>
          {issues.map(issue => (
            <Table.Row key={issue.id}>
              <Table.Cell>
                {issue.title}
                <div className='block md:hidden mt-2'>
                  <IssueStatusBadge status={ issue.status } />
                </div>
              </Table.Cell>
              <Table.Cell className='hidden md:table-cell'>
              <IssueStatusBadge status={ issue.status } /></Table.Cell>
              <Table.Cell className='hidden md:table-cell'>{ issue.createdAt.toDateString() }</Table.Cell>
            </Table.Row>
          ))}
        </TableBody>
      </Table.Root>
    </div>
  )
}

export default IssuesPage