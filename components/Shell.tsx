"use client";

import { usePathname } from "next/navigation";
import Sidebar from "./Sidebar";

export default function Shell({ children }: { children: React.ReactNode }) {
  const path = usePathname();

  // /fun is a self-contained full-bleed dark arcade; /admin is a private tool.
  // Neither gets the sidebar shell.
  if (path?.startsWith("/fun") || path?.startsWith("/admin")) return <>{children}</>;

  return (
    <div className="shell">
      <Sidebar />
      <main className="content">{children}</main>
    </div>
  );
}
