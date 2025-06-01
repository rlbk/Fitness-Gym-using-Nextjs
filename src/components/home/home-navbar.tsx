"use client";

import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
} from "@/components/ui/sheet";
import { SignIn, SignUp } from "@clerk/nextjs";
import { useRouter, useSearchParams } from "next/navigation";
import usersGlobalStore, { IUsersGlobalStore } from "@/store/users-store";

const HomeNavebar = () => {
  const { user } = usersGlobalStore() as IUsersGlobalStore;
  const router = useRouter();
  const queryString = useSearchParams();
  const form = queryString.get("form");
  const isOpenSheet = queryString.get("open");
  const [openSheet, setOpenSheet] = useState(isOpenSheet === "true");

  return (
    <>
      <div className="flex justify-between items-center ">
        <h1 className=" text-2xl font-bold  uppercase">Fitness.Gym</h1>
        {!user?.clerk_user_id ? (
          <Button
            variant={"outline"}
            className="text-black cursor-pointer"
            onClick={() => router.push("/account")}
          >
            Dashboard
          </Button>
        ) : (
          <Button
            variant={"outline"}
            className="text-black cursor-pointer"
            onClick={() => setOpenSheet(true)}
          >
            Sign-in
          </Button>
        )}
      </div>
      <Sheet open={openSheet} onOpenChange={() => setOpenSheet(false)}>
        <SheetContent className="lg:min-w-[500px] flex items-center justify-center min-h-screen">
          <SheetHeader>
            <SheetTitle></SheetTitle>
          </SheetHeader>

          {form === "sign-up" ? (
            <SignUp
              routing="hash"
              signInUrl="/?form=sign-in"
              fallbackRedirectUrl={"/account"}
            />
          ) : (
            <SignIn
              routing="hash"
              signUpUrl="/?form=sign-up"
              fallbackRedirectUrl={"/account"}
            />
          )}
        </SheetContent>
      </Sheet>
    </>
  );
};

export default HomeNavebar;
