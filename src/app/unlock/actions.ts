"use server";

import { cookies } from "next/headers";
import { redirect } from "next/navigation";

import {
  ACCESS_COOKIE_MAX_AGE,
  ACCESS_COOKIE_NAME,
  createAccessToken,
  getSitePassword,
} from "@/lib/site-access";

export type UnlockState = {
  error: string | null;
};

export async function unlockAction(
  _previousState: UnlockState,
  formData: FormData,
): Promise<UnlockState> {
  const configuredPassword = getSitePassword();
  if (!configuredPassword) {
    return { error: "Site access is not configured yet." };
  }

  const input = formData.get("password");
  if (typeof input !== "string" || input !== configuredPassword) {
    return { error: "Invalid password" };
  }

  const token = await createAccessToken(configuredPassword);
  const cookieStore = await cookies();
  cookieStore.set({
    name: ACCESS_COOKIE_NAME,
    value: token,
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
    path: "/",
    maxAge: ACCESS_COOKIE_MAX_AGE,
  });

  redirect("/");
}

export async function logoutAction() {
  const cookieStore = await cookies();
  cookieStore.set({
    name: ACCESS_COOKIE_NAME,
    value: "",
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
    path: "/",
    maxAge: 0,
  });

  redirect("/unlock");
}
