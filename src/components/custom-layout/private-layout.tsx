"use client";

import React, { useEffect, useState } from "react";
import Header from "./header";
import toast from "react-hot-toast";
import { getCurrentUserFromSupabase } from "@/actions/users";
import { IUser } from "@/lib/interfaces";
import Spinner from "../sipnner";
import Link from "next/link";
import usersGlobalStore, { IUsersGlobalStore } from "@/store/users-store";

const PrivateLayout = ({ children }: { children: React.ReactNode }) => {
  const { setUser, user } = usersGlobalStore() as IUsersGlobalStore;
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const fetchUser = async () => {
    try {
      setLoading(true);
      const response = await getCurrentUserFromSupabase();
      if (!response.success) throw new Error(response.message);
      else setUser(response.data);
    } catch (error: any) {
      setError(error.message);
      toast.error("An error occur while fetching user data. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchUser();
  }, []);

  if (loading) return <Spinner parentHeight="100vh" />;
  if (!loading && error)
    return (
      <div className="h-screen w-full flex flex-col justify-center items-center">
        <p className="text-primary">{error}</p>
        <Link href="/">Return to HomePage</Link>
      </div>
    );
  return (
    <div>
      <Header user={user} />
      <div className="p-5">{children}</div>
    </div>
  );
};

export default PrivateLayout;
