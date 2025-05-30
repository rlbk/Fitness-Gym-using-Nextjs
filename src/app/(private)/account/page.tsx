import React from "react";
import { UserButton } from "@clerk/nextjs";

const Page = async () => {
  return (
    <div>
      <h1>Account Page</h1>
      <UserButton fallback="/" afterSwitchSessionUrl="/" />
    </div>
  );
};

export default Page;
