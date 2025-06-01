"use client";

import PageTitle from "@/components/page-title";
import { Button } from "@/components/ui/button";
import usersGlobalStore, { IUsersGlobalStore } from "@/store/users-store";
import Link from "next/link";
import React from "react";

const Page = () => {
  const { user } = usersGlobalStore() as IUsersGlobalStore;
  return (
    <div>
      <PageTitle title={`Welcome ${user?.name}`} />
      <div className="flex flex-col gap-5">
        <p className="mt-5 text-sm text-gray-600">
          You do not have any active subscription at the moment. Please
          subscribe to enjoy our services.
        </p>
        <Button className="w-max">
          <Link href="/account/user/purchase-plan">
            View subscriptions plans
          </Link>
        </Button>
      </div>
    </div>
  );
};

export default Page;
