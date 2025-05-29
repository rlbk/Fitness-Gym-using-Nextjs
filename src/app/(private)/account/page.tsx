import React from "react";
import { UserButton } from "@clerk/nextjs";
import { getCurrentUserFromSupabase } from "@/actions/users";
import { currentUser } from "@clerk/nextjs/server";

const Page = async () => {
  const result = await currentUser();
  const name = `${result?.firstName} ${result?.lastName}`;
  const clerkUserId = result?.id;
  const email = result?.emailAddresses[0]?.emailAddress;
  const response = await getCurrentUserFromSupabase();
  return (
    <div className="p-5">
      <h1>Account Page</h1>
      <UserButton fallback="/" afterSwitchSessionUrl="/" />
      <h1>Clerk User Name: {name}</h1>
      <h1>Clerk User email: {email}</h1>
      <h1>Clerk User Email: {email}</h1>
    </div>
  );
};

export default Page;
