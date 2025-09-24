"use client";

import { SignIn } from "@clerk/nextjs";

export default function SignInPage() {
  return (
    <div className="flex items-center justify-center min-h-screen bg-slate-50">
      <SignIn routing="hash" signUpUrl="/sign-up" redirectUrl="/main" />
    </div>
  );
}