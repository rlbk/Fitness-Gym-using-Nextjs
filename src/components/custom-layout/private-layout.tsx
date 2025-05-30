"use client";

import React, { useEffect, useState } from "react";
import Header from "./header";
import toast from "react-hot-toast";
import { getCurrentUserFromSupabase } from "@/actions/users";
import { IUser } from "@/lib/interfaces";

const PrivateLayout = ({ children }: { children: React.ReactNode }) => {
  const [user, setUser] = useState<IUser | null>(null);

  const fetchUser = async () => {
    try {
      const response = await getCurrentUserFromSupabase();
      if (!response.success) throw new Error(response.message);
      else setUser(response.data);
    } catch (error) {
      toast.error("An error occur while fetching user data. Please try again.");
    }
  };

  useEffect(() => {
    fetchUser();
  }, []);
  return (
    <div>
      <Header user={user} />
      {children}
    </div>
  );
};

export default PrivateLayout;
