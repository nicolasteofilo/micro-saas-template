"use client";

import { Button } from "@/components/ui/button";
import { SignIn } from "@/lib/auth-action";
import { RiGoogleFill } from "@remixicon/react";

export function AuthForm() {
  return (
    <div className="mx-auto max-w-sm space-y-8">
      <Button
        type="submit"
        onClick={() => {
          SignIn();
        }}
        className="bg-[#DB4437] text-white after:flex-1 hover:bg-[#DB4437]/90"
      >
        <span className="pointer-events-none me-2 flex-1">
          <RiGoogleFill className="opacity-60" size={16} aria-hidden="true" />
        </span>
        Login with Google
      </Button>
    </div>
  );
}
