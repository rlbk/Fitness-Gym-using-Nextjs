"use client";

import { getAllPlans } from "@/actions/plans";
import PageTitle from "@/components/page-title";
import Spinner from "@/components/sipnner";
import { Button } from "@/components/ui/button";
import { IPlan } from "@/lib/interfaces";
import { cn } from "@/lib/utils";
import { IPlansGlobalStore, plansGlobalStore } from "@/store/plans-store";
import { CircleArrowRight } from "lucide-react";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import toast from "react-hot-toast";

const Page = () => {
  const { selectedPaymentPlan, setSelectedPaymentPlan } =
    plansGlobalStore() as IPlansGlobalStore;
  const [plans, setPlans] = useState([]);
  const [loading, setLoading] = useState(false);

  const fetchData = async () => {
    try {
      setLoading(true);
      const response: any = await getAllPlans();
      if (!response.success) throw new Error(response.message);
      setPlans(response?.data);
    } catch (error) {
      toast.error("Failed to fetch data");
    } finally {
      setLoading(false);
    }
  };

  const getPaymentPlans = (plan: IPlan) => {
    return [
      {
        planName: "monthly",
        price: plan.monthly_price,
        key: "monthly_price",
      },
      {
        planName: "quarterly",
        price: plan.quarterly_price,
        key: "quarterly_price",
      },
      {
        planName: "half-yearly",
        price: plan.half_yearly_price,
        key: "half_yearly_price",
      },
      {
        planName: "yearly",
        price: plan.yearly_price,
        key: "yearly_price",
      },
    ];
  };

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <div>
      <PageTitle title="Purchase Plan" />
      <div className="mt-7">
        {loading && <Spinner parentHeight={120} />}
        <div className="grid grid-cols-4 gap-7">
          {plans.map((plan: IPlan) => {
            const paymentPlans = getPaymentPlans(plan);
            return (
              <div
                key={plan.id}
                className={cn(
                  "flex flex-col justify-between p-5 border border-gray-300 rounded-lg",
                  selectedPaymentPlan?.mainPlan?.id === plan.id &&
                    "border-2 border-black"
                )}
              >
                <div className="space-y-2 mt-5">
                  <h1 className="text-lg font-bold">{plan.name}</h1>
                  <p className="text-sm text-gray-700">{plan.description}</p>
                  <hr />
                  <h2 className="text-sm font-semibold">Feature</h2>
                  <ul className="space-y-1">
                    {plan.features.map((feature: string) => (
                      <li
                        key={feature}
                        className="text-sm text-gray-700 flex items-center gap-1"
                      >
                        <CircleArrowRight size={14} /> {feature}
                      </li>
                    ))}
                  </ul>
                </div>
                <div className="flex flex-col gap-2 mt-5">
                  <h2 className="text-sm font-bold">Pricing</h2>
                  <select
                    className="border border-gray-500 rounded p-2"
                    onChange={(e) =>
                      setSelectedPaymentPlan({
                        mainPlan: plan,
                        paymentPlan: paymentPlans.find(
                          (plan) => plan.price === Number(e.target.value)
                        ),
                      })
                    }
                    value={
                      selectedPaymentPlan?.mainPlan?.id === plan.id
                        ? selectedPaymentPlan?.paymentPlan?.price
                        : ""
                    }
                  >
                    <option className="text-sm">Select payment plan</option>
                    {paymentPlans.map((payment) => (
                      <option
                        className="text-sm"
                        key={payment.key}
                        value={payment.price}
                      >
                        {payment.planName} - Rs {payment.price}
                      </option>
                    ))}
                  </select>
                  <Button
                    disabled={!(selectedPaymentPlan?.mainPlan?.id === plan.id)}
                    className="bg-black hover:bg-slate-800"
                  >
                    <Link href={"/account/user/purchase-plan/checkout"}>
                      Checkout
                    </Link>
                  </Button>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default Page;
