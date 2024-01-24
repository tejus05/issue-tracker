import IssueChart from "./IssueChart";
import IssueSummary from "./IssueSummary";
import LatestIssues from "./LatestIssues";
import Pagination from "./components/Pagination";
import prisma from "@/prisma/client";

export default async function Home({searchParams}:{searchParams:{page:string}}) {

  const open = await prisma.issue.count({
    where: {
      status: 'OPEN'
    }
  })

  const inProgress = await prisma.issue.count({
    where: {
      status: 'IN_PROGRESS'
    }
  })

  const closed = await prisma.issue.count({
    where: {
      status: 'CLOSED'
    }
  })

  return (
    <div>
      <IssueChart open={open} inProgress={inProgress} closed={closed}/>
      {/* <IssueSummary open={open} inProgress={inProgress} closed={closed}/> */}
      {/* <LatestIssues/> */}
    </div>
  )
}
