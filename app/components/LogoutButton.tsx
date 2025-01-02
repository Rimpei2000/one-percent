"use client";

import { redirect } from "next/navigation";
import { createClient } from "../../utils/supabase/client";

export default function LogoutButton() {
  const supabase = createClient();

  const handleLogout = async () => {
    const { error } = await supabase.auth.signOut();
    if (error) {
      redirect("/error");
    }
    redirect("/");
  };

  return (
    <button
      onClick={handleLogout}
      className="p-2.5 rounded-3xl border-2"
    >
      Log out
    </button>
  );
}
