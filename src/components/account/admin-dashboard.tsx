"use client";

import React, { useEffect, useState } from "react";
import DashboardCard from "./dasbhoard-card";
import toast from "react-hot-toast";
import { getSubscriptionReport, getUsersReport } from "@/actions/dashboard";

const AdminDashboard = () => {
  const [userData, setUserData] = useState({
    users_count: 0,
    customers_count: 0,
    admins_count: 0,
  });
  const [subscriptionsData, setSubscriptionsData] = useState({
    subscriptions_count: 0,
    revenue: 0,
  });

  const fetchUsersReportsData = async () => {
    try {
      const usersReportResponse = await getUsersReport();
      if (usersReportResponse.success) {
        setUserData(usersReportResponse.data);
      } else throw new Error(usersReportResponse.message);
    } catch (error: any) {
      toast.error(error.message);
    }
  };
  const fetchSubscriptionsReportsData = async () => {
    try {
      const usersReportResponse = await getSubscriptionReport();
      if (usersReportResponse.success) {
        setSubscriptionsData(usersReportResponse.data);
      } else throw new Error(usersReportResponse.message);
    } catch (error: any) {
      toast.error(error.message);
    }
  };

  useEffect(() => {
    fetchUsersReportsData();
    fetchSubscriptionsReportsData();
  }, []);

  return (
    <div>
      <div className="">
        <h1 className="text-sm font-bold">Users / Customers</h1>
        <div className="grid grid-cols-4 mt-7 gap-5">
          <DashboardCard
            title="Total Users"
            value={userData.users_count}
            description="Total number of users"
          />
          <DashboardCard
            title="Total Customers"
            value={userData.customers_count}
            description="Total number of customers"
          />
          <DashboardCard
            title="Total Admins"
            value={userData.admins_count}
            description="Total number of admins"
          />
        </div>
      </div>
      <div className="mt-10">
        <h1 className="text-sm font-bold">Subscriptions</h1>
        <div className="grid grid-cols-4 mt-7 gap-5">
          <DashboardCard
            title="Total Subscriptions"
            value={subscriptionsData.subscriptions_count}
            description="Total number of subscriptions"
          />
          <DashboardCard
            title="Revenue"
            value={subscriptionsData.revenue}
            description="Total revenue generated"
            isCurrency
          />
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;
