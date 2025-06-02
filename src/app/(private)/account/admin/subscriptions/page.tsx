"use client";

import {
  getAllSubscriptions,
  getAllSubscriptionsOfUser,
} from "@/actions/subscriptions";
import PageTitle from "@/components/page-title";
import Spinner from "@/components/sipnner";
import { ISubscription } from "@/lib/interfaces";
import usersGlobalStore, { IUsersGlobalStore } from "@/store/users-store";
import React, { useEffect, useState } from "react";
import toast from "react-hot-toast";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import dayjs from "dayjs";

const Page = () => {
  const { user } = usersGlobalStore() as IUsersGlobalStore;
  const [subscriptions, setSubscriptions] = useState<ISubscription[]>([]);
  const [loading, setLoading] = useState(false);

  const getSubscriptionsData = async () => {
    try {
      setLoading(true);
      const response = await getAllSubscriptions();
      if (!response.success) throw new Error(response.message);
      if (response?.data) setSubscriptions(response.data);
    } catch (error: any) {
      toast.error(error?.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getSubscriptionsData();
  }, []);

  const columns = [
    "Subscription ID",
    "Purchase Date",
    "Customer",
    "Start Date",
    "End Date",
    "Plan",
    "Amount",
    "Payment Id",
  ];
  console.log(subscriptions, "@subs");
  return (
    <div>
      <PageTitle title="All Subscriptions" />
      {loading ? (
        <Spinner parentHeight={150} />
      ) : (
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
            {subscriptions.length ? (
              subscriptions.map((subscription) => (
                <TableRow key={subscription.id}>
                  <TableCell className="font-medium">
                    {subscription.id}
                  </TableCell>
                  <TableCell>
                    {dayjs(subscription.created_at).format("MMM DD, YYYY")}
                  </TableCell>
                  <TableCell>{subscription.user_profiles?.name}</TableCell>
                  <TableCell>
                    {dayjs(subscription.start_date).format("MMM DD, YYYY")}
                  </TableCell>
                  <TableCell>
                    {dayjs(subscription.end_date).format("MMM DD, YYYY")}
                  </TableCell>
                  <TableCell>{subscription.plans?.name}</TableCell>
                  <TableCell>$ {subscription.amount}</TableCell>
                  <TableCell>{subscription.payment_id}</TableCell>
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell
                  colSpan={columns.length}
                  className="h-24 text-center"
                >
                  You don&apos;t have any subscriptions
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      )}
    </div>
  );
};

export default Page;
