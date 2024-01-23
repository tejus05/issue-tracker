import { IssueStatusBadge, Link } from '@/app/components';
import prisma from '@/prisma/client';
import { Table, TableBody, TableHeader, Text } from '@radix-ui/themes';
import IssueActions from './IssueActions';
import { Status } from '@prisma/client';

interface Props{
  searchParams: {
    status: Status
  }
}

const IssuesPage = async({searchParams:{status}}:Props) => {

  const statuses = Object.values(Status);
  const filteredStatus = statuses.includes(status) ? status : undefined;

  const issues = await prisma.issue.findMany({
    where: {
      status: filteredStatus
    }
  });

  return (
    <div>
      <IssueActions />
      
      {
        issues.length > 0 && (
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
                    <Link href={`/issues/${issue.id}`}>
                      {issue.title}
                    </Link>
                    <div className='block md:hidden mt-2'>
                      <IssueStatusBadge status={issue.status} />
                    </div>
                  </Table.Cell>
                  <Table.Cell className='hidden md:table-cell'>
                    <IssueStatusBadge status={issue.status} /></Table.Cell>
                  <Table.Cell className='hidden md:table-cell'>{issue.createdAt.toDateString()}</Table.Cell>
                </Table.Row>
              ))}
            </TableBody>
          </Table.Root>
        ) 
      }
      {
        issues.length === 0 && (
          <Text color='violet' size="5">
            Currently, no issues exist. All previous issues have been resolved. Feel free to add new issues.
          </Text>
        )
      }
    </div>
  )
}

export default IssuesPage