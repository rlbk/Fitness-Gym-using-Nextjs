import PageTitle from "@/components/page-title";
import PlanForm from "@/components/plans/plan-form";
import React from "react";

const Page = () => {
  return (
    <div>
      <PageTitle title="New Plan" />
      <PlanForm formType="add" />
    </div>
  );
};

export default Page;
