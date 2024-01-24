import { IssueStatusBadge, Link } from '@/app/components';
import prisma from '@/prisma/client';
import { Table, TableBody, TableHeader, Text } from '@radix-ui/themes';
import IssueActions from './IssueActions';
import { Issue, Status } from '@prisma/client';
import NextLink from 'next/link'
import { ArrowUpIcon } from '@radix-ui/react-icons';
import Pagination from '@/app/components/Pagination';

interface Props{
  searchParams: {
    status: Status,
    orderBy: keyof Issue,
    page: string
  }
}

const IssuesPage = async({searchParams}:Props) => {

  const columns: { label: string, value: keyof Issue, className?:string }[] = [
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

  const statuses = Object.values(Status);
  const status = statuses.includes(searchParams.status) ? searchParams.status : undefined;

  const where = {
    status
  };

  const orderBy = columns.map(column=>column.value)
    .includes(searchParams.orderBy) ? { [searchParams.orderBy]: "asc" } : undefined;

  const page = parseInt(searchParams.page) || 1;

  const pageSize = 10;

  const issues = await prisma.issue.findMany({
    where,
    orderBy,
    skip: (page - 1) * pageSize,
    take: pageSize
  });

  const issueCount = await prisma.issue.count({where});

  return (
    <div>
      <IssueActions />
      {
        issues.length > 0 && (
          <div>

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
                          column.value === searchParams.orderBy && <ArrowUpIcon className='inline'/>
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
            <Pagination 
            currentPage={page}
            pageSize={pageSize}
            itemCount={issueCount}
            />
          </div>
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