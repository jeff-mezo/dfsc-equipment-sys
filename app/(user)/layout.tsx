import React from "react";
import UserHeader from "./components/UserNavbar"

const UserLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="min-h-screen flex flex-col">
      <UserHeader />
      <main className="flex-1">{children}</main>
    </div>
  );
};

export default UserLayout;