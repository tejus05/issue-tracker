import { z } from "zod";

export const createIssueSchema = z.object({
  title: z
    .string()
    .min(1, "Title is required. ")
    .max(100, "Title is too long."),
  description: z
    .string()
    .min(1, "Description is required.")
    .max(65535, "Description is too long."),
});

export const patchIssueSchema = z.object({
  title: z
    .string()
    .min(1, "Title is required. ")
    .max(100, "Title is too long.")
    .optional(),
  description: z
    .string()
    .min(1, "Description is required.")
    .max(65535, "Description is too long.")
    .optional(),
  assignedToUserId: z
    .string()
    .min(1, "AssignedToUserId is required")
    .max(255)
    .optional()
    .nullable(),
});
