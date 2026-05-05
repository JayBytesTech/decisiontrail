import { z } from "zod";

export const decisionSchema = z.object({
  title: z.string().min(2, "Title must be at least 2 characters.").trim(),
  projectName: z.string().min(1, "Project name is required.").trim(),
  summary: z.string().optional(),
  context: z.string().min(10, "Context must be at least 10 characters.").trim(),
  optionsConsidered: z
    .string()
    .min(5, "Options considered must be at least 5 characters.")
    .trim(),
  decision: z.string().min(5, "Decision must be at least 5 characters.").trim(),
  consequences: z
    .string()
    .min(5, "Consequences must be at least 5 characters.")
    .trim(),
  status: z.enum(["proposed", "accepted", "superseded", "archived"]),
  tags: z.string().transform((val) =>
    val
      .split(",")
      .map((tag) => tag.trim())
      .filter((tag) => tag !== ""),
  ),
});

export type DecisionFormValues = z.infer<typeof decisionSchema>;
