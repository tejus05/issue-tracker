"use client";

import { Status } from '@/prisma/generated/client';
import { Select } from '@radix-ui/themes'
import { useRouter, useSearchParams } from 'next/navigation';
import { Suspense } from "react";

const statuses:{label:string,value?:Status}[] = [
  {
    label: "All"
  },
  {
    label: "Open",
    value: "OPEN"
  },
  {
    label: "In Progress",
    value: "IN_PROGRESS"
  },
  {
    label: "Closed",
    value: "CLOSED"
  },
]

export const dynamic = "force-dynamic";
export const fetchCache = "force-no-store";

const IssueStatusFilter = () => {
  return (
    <Suspense fallback="<p>Loading...</p>">
      <IssueStatusFilterFunction/>
    </Suspense>
  );
}


const IssueStatusFilterFunction = () => {
  const router = useRouter();

  const searchParams =useSearchParams();

  const status = searchParams.get('status') || "";

  return (
    <Select.Root
      defaultValue={status}
      onValueChange={
      status => {
        const params = new URLSearchParams();
        if (status.length > 1)
          params.append('status', status);
        if (searchParams.get('orderBy'))
          params.append('orderBy', searchParams.get('orderBy')!);
        const query = params.size ? '?' + params.toString() : "";
        router.push(`/issues/list${query}`);
      }
    }>
      <Select.Trigger placeholder='Filter by status...'/>
      <Select.Content>
        {
          statuses.map(status => (
            <Select.Item key={status.label} value={status.value || " "}>
              { status.label }
            </Select.Item>
          ))
        }
      </Select.Content>
    </Select.Root>
  )
}

export default IssueStatusFilter
