"use server";
import { revalidatePath } from "next/cache";
import db from "@/modules/db";
import { type formSchemaType, formSchema } from "@/validations/form";

export async function createUser(data: formSchemaType) {
  const result = formSchema.safeParse(data);
  if (!result.success) {
    const errorMessage = result.error.issues.reduce((prev, issue) => {
      return (prev += issue.message);
    }, "");
    return {
      error: errorMessage,
    };
  }

  try {
    await db.form.create({
      data,
    });
    revalidatePath("/");
    return{success:true}
  } catch (error) {
    const errorMessage = error instanceof Error ? error.message : String(error);
    return{error:errorMessage}
  }
  
}
