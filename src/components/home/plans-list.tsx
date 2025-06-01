"use client";

import { getAllPlans } from "@/actions/plans";
import { IPlan } from "@/lib/interfaces";
import Image from "next/image";
import React, { useEffect, useState } from "react";
import toast from "react-hot-toast";

const PlansList = () => {
  const [plans, setPlans] = useState<IPlan[]>();
  const fetchPlans = async () => {
    try {
      const response = await getAllPlans();
      if (response.success)
        setPlans(
          response.data?.sort(
            (a: IPlan, b: IPlan) => a.monthly_price - b.monthly_price
          )
        );
      else setPlans([]);
    } catch (error) {
      toast.error("Failed to fetched plans.");
    }
  };

  useEffect(() => {
    fetchPlans();
  }, []);
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10 mt-20">
      {plans?.map((plan) => (
        <div
          key={plan.id}
          className="p-5 border-2 border-gray-300 hover:border-yellow-600 flex flex-col gap-3 rounded-md transition cursor-pointer"
        >
          <h1 className="text-xl font-bold">{plan.name}</h1>
          <Image
            src={plan.images[0]}
            alt={plan.name}
            width={200}
            height={200}
            className="h-40 w-full object-cover rounded"
          />
          <p className="text-xs font-semibold text-gray-400 line-clamp-3">
            {plan.description}
          </p>
          <hr />
          <h2 className="text-sm font-semibold text-gray-300">Features</h2>
          <ul className="space-y-2">
            {plan.features.map((feature, index) => (
              <li key={index} className="text-xs text-gray-400 line-clamp-1">
                ✔️ {feature}
              </li>
            ))}
          </ul>
          <hr />
          <h3 className="text-sm font-semibold text-primary/80">
            Starts at $ {plan.monthly_price} / month
          </h3>
        </div>
      ))}
    </div>
  );
};

export default PlansList;
