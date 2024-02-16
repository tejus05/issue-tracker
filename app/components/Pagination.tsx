"use client";

import { ChevronLeftIcon, ChevronRightIcon, DoubleArrowLeftIcon, DoubleArrowRightIcon } from '@radix-ui/react-icons';
import { Button, Flex, Text } from '@radix-ui/themes'
import { useRouter, useSearchParams } from 'next/navigation';
import { Suspense } from "react";

interface Props{
  itemCount: number,
  pageSize: number,
  currentPage: number
}

export const dynamic = "force-dynamic";
export const fetchCache = "force-no-store";

const Pagination = ({itemCount, pageSize, currentPage}:Props) => {
  return (
    <Suspense fallback="<p>Loading...</p>">
      <PaginationFunction itemCount={itemCount} pageSize={pageSize} currentPage={currentPage} />
    </Suspense>
  );
}

const PaginationFunction = ({itemCount, pageSize, currentPage}:Props) =>{
  const router = useRouter();

  const searchParams = useSearchParams();

  const pageCount = Math.ceil(itemCount / pageSize);

  const changePage = (page:number) => {
    const params = new URLSearchParams(searchParams); //so that existing query parameters are not erased

    params.set('page', page.toString()); //should be a string!!!

    router.push('?' + params.toString());
  }

  if (pageCount <= 1) return null;

  return (
    <Flex align="center" gap="2">
      <Text size="2">
        Page {currentPage} of {pageCount}
      </Text>
      <Button color='gray' variant='soft' disabled={ currentPage === 1 } onClick={()=> changePage(1)}>
        <DoubleArrowLeftIcon/>
      </Button>
      <Button color='gray' variant='soft' disabled={currentPage === 1} onClick={() => changePage(currentPage - 1)}>
        <ChevronLeftIcon/>
      </Button>
      <Button color='gray' variant='soft' disabled={currentPage === pageCount} onClick={() => changePage(currentPage + 1)}>
        <ChevronRightIcon/>
      </Button>
      <Button color='gray' variant='soft' disabled={currentPage === pageCount} onClick={() => changePage(pageCount)}>
        <DoubleArrowRightIcon/>
      </Button>
    </Flex>
  )
}

export default Pagination
