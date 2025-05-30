"use client";
import usersGlobalStore, { IUsersGlobalStore } from "@/store/users-store";
import React from "react";

const Page = () => {
  const { user } = usersGlobalStore() as IUsersGlobalStore;
  return (
    <div>
      <h1>Welcome {user?.name}! This is your profile page.</h1>
    </div>
  );
};

export default Page;
