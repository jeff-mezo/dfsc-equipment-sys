import React from "react";
import AdminHeader from "./components/AdminNavbar"

const AdminLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="min-h-screen flex flex-col">
      <AdminHeader />
      <main className="flex-1 p-6">{children}</main>
    </div>
  );
};

export default AdminLayout;