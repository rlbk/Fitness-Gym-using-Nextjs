import { create } from "zustand";

export const plansGlobalStore = create((set) => ({
  selectedPaymentPlan: null,
  setSelectedPaymentPlan: (plan: any) => set({ selectedPaymentPlan: plan }),
}));

export interface IPlansGlobalStore {
  selectedPaymentPlan: any;
  setSelectedPaymentPlan: (plan: any) => void;
}
