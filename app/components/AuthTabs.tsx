"use client";
import { useActionState, useEffect, useState } from "react";
import { AuthState, login, signup } from "../login/actions";
import { PasswordInput } from "./PasswordInput";
import Link from "next/link";
import { useRouter } from "next/navigation";

export function AuthTabs() {
  const router = useRouter();
  const [activeTab, setActiveTab] = useState<"login" | "signup">("login");
  const [signupState, formAction, isSignupPending] = useActionState<
    AuthState,
    FormData
  >(signup, {});
  const [loginState, formActionLogin, isLoginPending] = useActionState<
    AuthState,
    FormData
  >(login, {});

  useEffect(() => {
    if (loginState.success && loginState.redirect) {
      router.push(loginState.redirect);
    }
  }, [router, loginState]);

  const getTabStyle = (tab: "login" | "signup") => {
    const baseStyle = "flex-1 py-4 text-center font-medium transition-colors";
    const activeStyle = "text-gray-900 border-b-2 border-gray-900";
    const inactiveStyle = "text-gray-500 hover:text-gray-700";

    return `${baseStyle} ${activeTab === tab ? activeStyle : inactiveStyle}`;
  };

  return (
    <div className="w-full max-w-md p-8 bg-white rounded-3xl shadow-2xl border-2">
      <div className="flex border-b mb-8">
        <button
          type="button"
          onClick={() => setActiveTab("login")}
          className={getTabStyle("login")}
        >
          Log in
        </button>
        <button
          type="button"
          onClick={() => setActiveTab("signup")}
          className={getTabStyle("signup")}
        >
          Sign up
        </button>
      </div>

      {activeTab === "login" && (
        <form className="space-y-6" action={formActionLogin}>
          <div className="space-y-2">
            <input
              id="email"
              name="email"
              type="email"
              required
              placeholder="Email"
              className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-gray-200"
            />
          </div>
          <PasswordInput />
          {loginState.error && <p>Error login</p>}
          <div className="text-sm">
            <Link
              href="/forgot-password"
              className="text-gray-800 hover:underline font-medium"
            >
              Forgot password?
            </Link>
          </div>
          <button className="w-full py-3 px-4 bg-gray-900 text-white rounded-full hover:bg-gray-800 transition-colors">
            {isLoginPending ? (
              <div className="animate-spin h-5 w-5 border-2 border-gray-500 rounded-full border-t-transparent" />
            ) : (
              "Log in"
            )}
          </button>
        </form>
      )}

      {activeTab === "signup" && (
        <form className="space-y-6" action={formAction}>
          <div className="space-y-2">
            <input
              id="email"
              name="email"
              type="email"
              required
              placeholder="Email"
              className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-gray-200"
            />
          </div>
          <PasswordInput />
          {signupState.error && (
            <div className="text-sm font-medium text-red-500">
              {signupState.error}
            </div>
          )}
          {signupState.message && (
            <div className="text-sm font-medium text-blue-500">
              {signupState.message}
            </div>
          )}
          {isSignupPending ? (
            <div className="animate-spin h-5 w-5 border-2 border-gray-500 rounded-full border-t-transparent" />
          ) : (
            <button className="w-full py-3 px-4 bg-gray-900 text-white rounded-full hover:bg-gray-800 transition-colors">
              Sign up
            </button>
          )}
        </form>
      )}
    </div>
  );
}
