"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { auth } from "@/auth";
import { db } from "@/db";
import { decisions } from "@/db/schema";
import { decisionSchema } from "@/lib/validations/decision";

export type DecisionFormState = {
  errors?: Record<string, string[]>;
  message?: string;
};

function slugify(text: string) {
  return text
    .toLowerCase()
    .replace(/[^\w ]+/g, "")
    .replace(/ +/g, "-");
}

export async function createDecisionAction(
  _state: DecisionFormState,
  formData: FormData,
): Promise<DecisionFormState> {
  const session = await auth();

  if (!session?.user?.id) {
    return {
      message: "Unauthorized. Please sign in to create a decision.",
    };
  }

  const rawData = {
    title: formData.get("title"),
    projectName: formData.get("projectName"),
    summary: formData.get("summary"),
    context: formData.get("context"),
    optionsConsidered: formData.get("optionsConsidered"),
    decision: formData.get("decision"),
    consequences: formData.get("consequences"),
    status: formData.get("status"),
    tags: formData.get("tags"),
  };

  const parsed = decisionSchema.safeParse(rawData);

  if (!parsed.success) {
    return {
      errors: parsed.error.flatten().fieldErrors,
    };
  }

  try {
    await db.insert(decisions).values({
      userId: session.user.id,
      title: parsed.data.title,
      slug: `${slugify(parsed.data.title)}-${Date.now().toString(36)}`,
      projectName: parsed.data.projectName,
      summary: parsed.data.summary,
      context: parsed.data.context,
      optionsConsidered: parsed.data.optionsConsidered,
      decision: parsed.data.decision,
      consequences: parsed.data.consequences,
      status: parsed.data.status,
      tags: parsed.data.tags,
    });
  } catch (error) {
    console.error("Failed to create decision:", error);
    return {
      message: "A database error occurred while creating the decision.",
    };
  }

  revalidatePath("/dashboard");
  redirect("/dashboard");
}
