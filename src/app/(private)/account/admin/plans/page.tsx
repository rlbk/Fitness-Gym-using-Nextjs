import { getAllPlans } from "@/actions/plans";
import PageTitle from "@/components/page-title";
import PlansTable from "@/components/plans/plans-table";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import React from "react";

const Page = async () => {
  const response = await getAllPlans();
  if (!response.success)
    return <p className="text-red-500">Error: {response.message}</p>;
  return (
    <div>
      <div className="flex justify-between items-center">
        <PageTitle title="Plans" />
        <Button className="bg-black">
          <Link href="/account/admin/plans/new">Add Plan</Link>
        </Button>
      </div>
      <PlansTable plans={response.data || null} />
    </div>
  );
};

export default Page;
