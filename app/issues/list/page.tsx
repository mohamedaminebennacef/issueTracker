import prisma from '@/prisma/client';
import { Table } from '@radix-ui/themes';
import { IssueStatusBadge , Link } from "@/app/components"
import IssueActions from './IssueActions';

const IssuesPage = async () => {
  // we use prisma to fetch all the issues from our database
  const issues  = await prisma.issue.findMany(); // findMany returns all the issues

  return (
    <div>
      <IssueActions/>
      <Table.Root variant="surface">  
        <Table.Header>
          <Table.Row>
            <Table.ColumnHeaderCell>Issue</Table.ColumnHeaderCell>
            <Table.ColumnHeaderCell className="hidden md:table-cell">Status</Table.ColumnHeaderCell> {/*hidden by default show it on medium size devices*/}
            <Table.ColumnHeaderCell className="hidden md:table-cell">Created</Table.ColumnHeaderCell>
          </Table.Row>
        </Table.Header>
        <Table.Body>
          {issues.map(issue => (
            <Table.Row key={issue.id}>
              <Table.Cell>
                <Link href={`/issues/${issue.id}`}>
                  {issue.title}
                </Link>
                <div className='block md:hidden'>
                  <IssueStatusBadge status={issue.status}/>
                </div>
              </Table.Cell>
              <Table.Cell className="hidden md:table-cell"><IssueStatusBadge status={issue.status}/></Table.Cell>
              <Table.Cell className="hidden md:table-cell">{issue.createdAt.toDateString()}</Table.Cell>
            </Table.Row>
          ))}
        </Table.Body>
      </Table.Root>
      </div>
  )
}
export default IssuesPage