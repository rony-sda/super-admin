"use client";

import { redirect } from "next/navigation";
import { useState } from "react";

export default function Home() {
  // const [role, setRole] = useState("super");
  // if (role === "super-admin") return redirect("/dashboard/super-admin");
  // else if (role === "admin") return redirect("/dashboard/admin");
  // else if (role === "crm") return redirect("/dashboard/crm");
  // else if (role === "hrm") return redirect("/dashboard/hrm");

  redirect("/dashboard/portal");
}
