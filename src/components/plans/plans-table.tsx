"use client";

import { IPlan } from "@/lib/interfaces";
import dayjs from "dayjs";
import React, { useState } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Button } from "../ui/button";
import { Edit2, Trash2 } from "lucide-react";
import { useRouter } from "next/navigation";
import { deletePlanById } from "@/actions/plans";
import toast from "react-hot-toast";

interface IProps {
  data: IPlan[] | null;
}

const PlansTable = ({ data }: IProps) => {
  const [plans, setPlans] = useState<IPlan[] | null>(data);
  const router = useRouter();
  const columns = [
    "Name",
    "Monthly Price",
    "Quarterly Price",
    "Half Yearly Price",
    "Yearly Price",
    "Created At",
    "Actions",
  ];
  const deletePlan = async (id: string) => {
    try {
      const response = await deletePlanById(id);
      if (!response.success) throw new Error(response.message);
      toast.success("Plan deleted successfully.");
      setPlans((prev) => prev && prev?.filter((plan) => plan.id !== id));
    } catch (error: any) {
      toast.error(
        error.message || "An error occur while deleting plan. Please try again."
      );
    }
  };
  return (
    <div>
      <Table>
        <TableHeader>
          <TableRow>
            {columns.map((column) => (
              <TableHead className="font-bold bg-gray-100 " key={column}>
                {column}
              </TableHead>
            ))}
          </TableRow>
        </TableHeader>
        <TableBody>
          {plans ? (
            plans.map((plan) => (
              <TableRow key={plan.id}>
                <TableCell className="font-medium">{plan.name}</TableCell>
                <TableCell>Rs {plan.monthly_price}</TableCell>
                <TableCell>Rs {plan.quarterly_price}</TableCell>
                <TableCell>Rs {plan.half_yearly_price}</TableCell>
                <TableCell>Rs {plan.yearly_price}</TableCell>
                <TableCell>
                  {dayjs(plan.created_at).format("MMM DD, YYYY hh:mm A")}
                </TableCell>
                <TableCell>
                  <div className="flex gap-3">
                    <Button
                      variant={"outline"}
                      size={"icon"}
                      onClick={() =>
                        router.push(`/account/admin/plans/edit/${plan.id}`)
                      }
                    >
                      <Edit2 size={14} />
                    </Button>
                    <Button
                      variant={"outline"}
                      size={"icon"}
                      onClick={() => deletePlan(plan.id)}
                    >
                      <Trash2 size={14} color="red" />
                    </Button>
                  </div>
                </TableCell>
              </TableRow>
            ))
          ) : (
            <TableRow>
              <TableCell colSpan={columns.length} className="h-24 text-center">
                No results.
              </TableCell>
            </TableRow>
          )}
        </TableBody>
      </Table>
    </div>
  );
};

export default PlansTable;
