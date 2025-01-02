"use server";

import { revalidatePath } from "next/cache";

import { createClient } from "../../utils/supabase/server";
import { authSchema } from "../../types/schemas/auth";

export interface AuthState {
  error?: string;
  success?: boolean;
  message?: string;
  redirect?: string;
}

export async function login(_prevState: AuthState, formData: FormData) {
  const supabase = await createClient();

  const data = {
    email: formData.get("email"),
    password: formData.get("password"),
  };

  try {
    const validatedData = authSchema.parse(data);

    const { error } = await supabase.auth.signInWithPassword(validatedData);

    if (error) {
      return { error: "Could not authenticate user" };
    }

    revalidatePath("/", "layout");
    return { success: true, redirect: "/graph" };
  } catch {
    return { error: "Could not authenticate user" };
  }
}

export async function signup(_prevState: AuthState, formData: FormData) {
  const supabase = await createClient();

  const data = {
    email: formData.get("email"),
    password: formData.get("password"),
  };

  try {
    const validatedData = authSchema.parse(data);
    const { error } = await supabase.auth.signUp(validatedData);

    if (error) {
      return { error: "Error signing up" };
    }

    revalidatePath("/", "layout");
    return { message: "Please verify your email prior to login" };
  } catch {
    return { error: "Error signing up" };
  }
}
