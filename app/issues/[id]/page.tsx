import React from 'react'
import prisma from '@/prisma/client'
import { notFound } from 'next/navigation'
// grab the id paramter from the route

interface Props {
    params : {id:string}
}


const IssueDetailPage = async({params} : Props) => {

  if (typeof params.id !== 'number') notFound()
  // fetch an issue from the db
  const issue = await prisma.issue.findUnique({
    where:{id : parseInt(params.id)}
  })
  if (!issue) 
    notFound();
  return (
    <div>
        <p>{issue.title}</p>
        <p>{issue.description}</p>
        <p>{issue.status}</p>
        <p>{issue.createdAt.toDateString()}</p>
    </div>
  )
}

export default IssueDetailPage