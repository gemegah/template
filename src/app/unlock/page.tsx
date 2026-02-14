import Link from "next/link";
import { cookies } from "next/headers";

import { ACCESS_COOKIE_NAME, getSitePassword, verifyAccessToken } from "@/lib/site-access";

import { logoutAction } from "./actions";
import { UnlockForm } from "./UnlockForm";

export default async function UnlockPage() {
  const configuredPassword = getSitePassword();
  const cookieStore = await cookies();
  const token = cookieStore.get(ACCESS_COOKIE_NAME)?.value;
  const isAuthenticated = configuredPassword
    ? await verifyAccessToken(token, configuredPassword)
    : false;

  return (
    <main className="grid min-h-[80dvh] place-items-center py-12">
      <section className="glass-surface w-full max-w-md p-6 sm:p-8">
        <h1 className="text-2xl font-semibold text-[#2f2030]">Private Access</h1>
        <p className="mt-2 text-sm text-[#4d2d4e]">
          Enter the shared password to open the site.
        </p>

        {!configuredPassword ? (
          <p className="mt-4 rounded-xl border border-[#d97598]/30 bg-[#fff1f6] px-4 py-3 text-sm text-[#9a1f40]">
            SITE_PASSWORD is not configured yet. Add it in local env and Vercel project settings.
          </p>
        ) : null}

        {configuredPassword && !isAuthenticated ? (
          <div className="mt-6">
            <UnlockForm />
          </div>
        ) : null}

        {configuredPassword && isAuthenticated ? (
          <div className="mt-6 grid gap-3">
            <p className="text-sm text-[#4d2d4e]">You are already authenticated on this device.</p>
            <Link
              href="/"
              className="inline-flex min-h-11 items-center justify-center rounded-full bg-[#de5b85] px-5 text-sm font-semibold text-white transition-opacity hover:opacity-90 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#7f3453]"
            >
              Continue to site
            </Link>
            <form action={logoutAction}>
              <button
                type="submit"
                className="inline-flex min-h-11 w-full items-center justify-center rounded-full border border-[#de5b85] bg-white/75 px-5 text-sm font-semibold text-[#7f3453] transition-colors hover:bg-white focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#7f3453]"
              >
                Log out
              </button>
            </form>
          </div>
        ) : null}
      </section>
    </main>
  );
}
