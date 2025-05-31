import { getPlanById } from "@/actions/plans";
import PageTitle from "@/components/page-title";
import PlanForm from "@/components/plans/plan-form";
import React from "react";

interface IProps {
  params: Promise<{ id: string }>;
}

const Page = async ({ params }: IProps) => {
  const { id } = await params;
  const response = await getPlanById(id);
  if (!response.success)
    return <p className="text-red-500">Error: Plan not Found</p>;

  const initialValues = response?.data?.[0];
  return (
    <div>
      <PageTitle title="Edit plan" />
      <PlanForm formType="edit" initialValues={initialValues} />
    </div>
  );
};

export default Page;
