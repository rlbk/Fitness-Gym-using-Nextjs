"use client";

import AdminDashboard from "@/components/account/admin-dashboard";
import PageTitle from "@/components/page-title";
import { Button } from "@/components/ui/button";
import usersGlobalStore, { IUsersGlobalStore } from "@/store/users-store";
import dayjs from "dayjs";
import Link from "next/link";
import React from "react";

const Page = () => {
  const { user, currentSubscription } = usersGlobalStore() as IUsersGlobalStore;

  const renderProperty = (label: string, value: any) => (
    <div className="flex justify-between items-center">
      <p className="text-sm text-gray-600">{label}</p>
      <p className="text-sm font-semibold">{value}</p>
    </div>
  );
  if (user?.is_admin) return <AdminDashboard />;
  return (
    <div>
      <PageTitle title={`Welcome ${user?.name}`} />
      {currentSubscription ? (
        <div className="mt-7 grid grid-cols-2">
          <div className="col-span-1 p-5 border rounded border-gray-500 space-y-2">
            <h1 className="text-lg font-semibold">Your Current Subscription</h1>
            <hr />
            {renderProperty("Subscription ID", currentSubscription?.id)}
            {renderProperty("Plan Name", currentSubscription?.plans?.name)}
            {renderProperty(
              "Purchased On",
              dayjs(currentSubscription?.created_at).format("MMM DD, YYYY")
            )}
            {renderProperty(
              "Start Date",
              dayjs(currentSubscription?.start_date).format("MMM DD, YYYY")
            )}
            {renderProperty(
              "End Date",
              dayjs(currentSubscription?.end_date).format("MMM DD, YYYY")
            )}
            {renderProperty(
              "Total Duration",
              currentSubscription.total_duration + " days"
            )}
            {renderProperty("Amount", "$" + currentSubscription?.amount)}
            {renderProperty("Payment Id", currentSubscription?.payment_id)}
          </div>
        </div>
      ) : (
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
      )}
    </div>
  );
};

export default Page;
