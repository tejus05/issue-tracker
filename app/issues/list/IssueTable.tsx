import { IssueStatusBadge, Link } from '@/app/components'
import { Issue, Status } from '@prisma/client'
import { ArrowUpIcon } from '@radix-ui/react-icons'
import { Table, TableBody, TableHeader } from '@radix-ui/themes'
import NextLink from 'next/link'

export interface IssueQuery{
  status: Status,
  orderBy: keyof Issue,
  page: string
}

interface Props{
  searchParams: IssueQuery
  issues: Issue[]
}


const IssueTable = ({searchParams,issues}:Props) => { 
  
  return (
    <Table.Root variant='surface'>
      <TableHeader>
        <Table.Row>
          {
            columns.map(column => (
              <Table.ColumnHeaderCell key={column.label} className={`${column.className} flex items-center gap-1`}>
                <NextLink href={{
                  query: {
                    ...searchParams, orderBy: column.value
                  }
                }}>
                  {column.label}
                </NextLink>
                {
                  column.value === searchParams.orderBy && <ArrowUpIcon className='inline' />
                }
              </Table.ColumnHeaderCell>
            ))
          }
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

const columns: { label: string, value: keyof Issue, className?: string }[] = [
  {
    label: "Issue",
    value: "title"
  },
  {
    label: "Status",
    value: "status",
    className: 'hidden md:table-cell'
  },
  {
    label: "Created At",
    value: "createdAt",
    className: 'hidden md:table-cell'
  },
];

export const columnNames = columns.map(column => column.value);

export default IssueTable