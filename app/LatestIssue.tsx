import { Avatar, Card, Flex, Heading, Table } from "@radix-ui/themes";
import React from "react";
import prisma from "@/prisma/client";
import Link from "next/link";
import { IssueStatusBadge } from "./components";

const LatestIssue = async () => {
  const issues = await prisma.issue.findMany({
    orderBy: { createdAt: "desc" },
    take: 5,
    include: {
        assignedToUser:true
    }
  });

  return (
    <Card>
      <Heading size="4" mb="4">Latest Issues</Heading> 
      <Table.Root>
        <Table.Body>
          {issues.map((issue) => (
            <Table.Row key={issue.id}>
              <Table.Cell>
                <Flex justify="between">
                  <Flex direction="column" align="start" gap="2">
                    <Link href={`/issues/${issue.id}`}>{issue.title}</Link>
                    <IssueStatusBadge status={issue.status} />
                  </Flex>
                  {issue.assignedToUserId && (
                    <Avatar radius="full" size="2" src={issue.assignedToUser?.image!} fallback="?"/>
                  )}
                </Flex>
              </Table.Cell>
            </Table.Row>
          ))}
        </Table.Body>
      </Table.Root>
    </Card>
  );
};

export default LatestIssue;
