import { Status } from '@prisma/client'
import { Badge } from "@radix-ui/themes"
import React from 'react'

/*interface Props {
    status : Status
} define the interface explicitly*/

const statusMap: Record<
    Status,
    { label: string, color: "red" | "green" | "violet" }
> = {
    OPEN: { label: 'Open', color: 'green' },
    IN_PROGRESS: { label: 'In Progress', color: 'violet' },
    CLOSED: { label: 'Closed', color: 'green' }
} // we define the mapping outside the component because we don't need this everytime we render the component

// this component receive the status of an issue as a prop
const IssueStatusBadge = ({ status }: { status: Status }) => {
    //   if (status === 'OPEN')
    //     return <Badge color = "green">OPEN</Badge>
    //   if (status === 'IN_PROGRESS')
    //     return <Badge color = "orange">IN_PROGRESS</Badge>
    //   if (status === 'CLOSED')
    //     return <Badge color = "red">CLOSED</Badge>
    return (
        <Badge color={statusMap[status].color}>
            {statusMap[status].label}
        </Badge>
    )
}

export default IssueStatusBadge