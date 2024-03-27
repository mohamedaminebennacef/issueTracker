import { z } from 'zod';

const statusEnum = z.enum(["OPEN", "IN_PROGRESS", "CLOSED"]);
type statusEnum = z.infer<typeof statusEnum>;

export const issueSchema = z.object({
    title: z.string().min(1, "Title is required").max(255),
    description: z.string().min(1, "Description is required").max(65535),
    status : statusEnum
});
export const patchIssueSchema = z.object({
    title: z.string().min(1, "Title is required").max(255).max(65535).optional(),
    description: z.string().min(1, "Description is required").optional(),
    status : statusEnum,
    assignedToUserId : z.string().min(1,"AssignedToUserId is required.").max(255).optional().nullable()
});
