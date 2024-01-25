import { Table, TableBody, TableHeader } from '@radix-ui/themes'
import { Skeleton } from '@/app/components'
import IssueActions from './IssueActions'

const LoadingIssuesPage = () => {
  const issues = [1,2,3,4,5]
  return (
    <div>
      <IssueActions/>
      <Table.Root variant='surface' className='mt-4'>
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
            <Table.Row key={issue}>
              <Table.Cell>
                <Skeleton/>
                <div className='block md:hidden mt-2'>
                  <Skeleton/>
                </div>
              </Table.Cell>
              <Table.Cell className='hidden md:table-cell'>
              <Skeleton/></Table.Cell>
              <Table.Cell className='hidden md:table-cell'><Skeleton/></Table.Cell>
            </Table.Row>
          ))}
        </TableBody>
      </Table.Root>
    </div>
  )
}

export default LoadingIssuesPage