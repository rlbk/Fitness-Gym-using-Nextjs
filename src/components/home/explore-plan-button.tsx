"use client";
import React from "react";
import { Button } from "../ui/button";

const ExplorePlanButton = () => {
  return (
    <Button
      onClick={() => {
        const plansSection = document.getElementById("plans");
        plansSection?.scrollIntoView({ behavior: "smooth" });
      }}
    >
      Explores Plan
    </Button>
  );
};

export default ExplorePlanButton;
