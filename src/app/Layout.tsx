import { Outlet } from "react-router-dom";
import { Navbar } from "../ui/Navbar";

export function Layout() {
  return (
    <div className="min-h-screen bg-slate-950 text-slate-100">
      <Navbar />
      <main className="p-6">
        <Outlet />
      </main>
    </div>
  );
}
