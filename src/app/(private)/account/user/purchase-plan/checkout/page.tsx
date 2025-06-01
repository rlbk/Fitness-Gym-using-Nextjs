"use client";

import PageTitle from "@/components/page-title";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { IPlansGlobalStore, plansGlobalStore } from "@/store/plans-store";
import dayjs from "dayjs";
import Link from "next/link";
import React, { useMemo, useState } from "react";

const Page = () => {
  const { selectedPaymentPlan } = plansGlobalStore() as IPlansGlobalStore;
  const [startDate, setStartDate] = useState(dayjs().format("YYYY-MM-DD"));

  const endDate = useMemo(() => {
    return dayjs(startDate)
      .add(selectedPaymentPlan?.paymentPlan?.duration, "d")
      .format("YYYY-MM-DD");
  }, [startDate]);

  const renderProperty = (key: string, value: any) => {
    try {
      return (
        <div className="flex justify-between items-center">
          <span className="text-gray-500 text-sm">{key}</span>
          <span className="text-gray-700 font-semibold text-sm">{value}</span>
        </div>
      );
    } catch (error) {
      return <></>;
    }
  };
  return (
    <div>
      <PageTitle title="Checkout" />
      {selectedPaymentPlan ? (
        <div className="grid grid-cols-2 mt-7">
          <div className="col-span-1 p-5 border border-gray-500 flex flex-col gap-2 rounded">
            {renderProperty("Plan Name", selectedPaymentPlan?.mainPlan?.name)}
            {renderProperty("Amount", selectedPaymentPlan?.paymentPlan?.price)}
            {renderProperty(
              "Duration",
              selectedPaymentPlan?.paymentPlan?.duration + " days"
            )}
            {renderProperty(
              "Start Date",
              <Input
                value={startDate}
                type="date"
                onChange={(e) => setStartDate(e.target.value)}
              />
            )}
            {startDate && renderProperty("End Date", endDate)}
            <Button className="bg-black hover:bg-slate-800 mt-7">
              Pay Now
            </Button>
          </div>
          <div className="col-span-1"></div>
        </div>
      ) : (
        <div className="h-[400px] flex flex-col justify-center items-center">
          <p>No payment plan selected.</p>
          <p>
            <Link
              href="/account/user/purchase-plan"
              className="text-blue-600 hover:underline"
            >
              Select a plan
            </Link>
          </p>
        </div>
      )}
    </div>
  );
};

export default Page;
