"use client"
import { ChevronLeftIcon, ChevronRightIcon, DoubleArrowLeftIcon, DoubleArrowRightIcon } from '@radix-ui/react-icons';
import { Button, Flex , Text} from '@radix-ui/themes';
import React from 'react'
import {useSearchParams} from 'next/navigation'
import { useRouter } from 'next/navigation';


interface Props {
    itemCount : number;
    pageSize : number;
    currentPage:number;
}

const Pagination = ({itemCount,pageSize,currentPage} : Props) => {
    const searchParams = useSearchParams();
    const router = useRouter();

    const changePage = (page : number) => {
        const params = new URLSearchParams(searchParams);
        params.set('page',page.toString())
        router.push('?'+params.toString())
    }

    const pageCount = Math.ceil(itemCount/pageSize)
    if (pageCount <= 1 ) return null;
  return (
    <Flex align="center" gap = "2">
        <Text>
            Page {currentPage} of {pageCount}
        </Text>
            <Button color="gray" variant="soft" onClick={() => changePage(1)} disabled={currentPage === 1}><DoubleArrowLeftIcon /></Button>
            <Button color="gray" variant="soft" onClick={() => changePage(currentPage-1)} disabled={currentPage === 1 }><ChevronLeftIcon /></Button>
            <Button color="gray" variant="soft" onClick={() => changePage(currentPage+1)} disabled={currentPage === pageCount }><ChevronRightIcon /></Button>
            <Button color="gray" variant="soft" onClick={() => changePage(pageCount)}disabled={currentPage === pageCount}><DoubleArrowRightIcon /></Button>
    </Flex>
  )
}

export default Pagination

