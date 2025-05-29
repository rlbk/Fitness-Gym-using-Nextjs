"use client";

import React, { useState } from "react";
import { Button } from "./ui/button";
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetDescription,
  SheetFooter,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { SignIn, SignUp } from "@clerk/nextjs";
import { useSearchParams } from "next/navigation";

const HomeNavebar = () => {
  const queryString = useSearchParams();
  const form = queryString.get("form");
  const isOpenSheet = queryString.get("open");
  const [openSheet, setOpenSheet] = useState(isOpenSheet === "true");

  return (
    <>
      <div className="flex justify-between items-center ">
        <h1 className=" text-2xl font-bold  uppercase">Fitness.Gym</h1>
        <Button
          variant={"outline"}
          className="text-black cursor-pointer"
          onClick={() => setOpenSheet(true)}
        >
          Sign-in
        </Button>
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
