import Pagination from '@/app/components/Pagination';
import prisma from '@/prisma/client';
import { Status } from '@prisma/client';
import { Flex, Text } from '@radix-ui/themes';
import IssueActions from './IssueActions';
import IssueTable, { IssueQuery, columnNames } from './IssueTable';
import { Metadata } from 'next';

interface Props{
  searchParams: IssueQuery
}

const IssuesPage = async({searchParams}:Props) => {

  const statuses = Object.values(Status);
  const status = statuses.includes(searchParams.status) ? searchParams.status : undefined;

  const where = {
    status
  };

  const orderBy = columnNames
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
    <Flex direction="column" gap="3">
      <IssueActions />
      {
        issues.length > 0 && (
          <Flex direction="column" gap="3">

            <IssueTable issues={issues} searchParams={searchParams}/>
            
            <Pagination 
            currentPage={page}
            pageSize={pageSize}
            itemCount={issueCount}
            />
          </Flex>
        ) 
      }
      {
        issues.length === 0 && (
          <Text color='violet' size="5">
            Currently, no issues exist. All previous issues have been resolved. Feel free to add new issues.
          </Text>
        )
      }
    </Flex>
  )
}

export default IssuesPage

export const metadata: Metadata = {
  title: "Issue Tracker - Issues List",
  description: "View all issues. "
}
