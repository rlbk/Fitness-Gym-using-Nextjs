"use client";

import { getStripePaymentIntent } from "@/actions/payment";
import PageTitle from "@/components/page-title";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { IPlansGlobalStore, plansGlobalStore } from "@/store/plans-store";
import dayjs from "dayjs";
import Link from "next/link";
import React, { useMemo, useState } from "react";
import toast from "react-hot-toast";
import { CheckoutProvider, Elements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";
import CheckoutForm from "@/components/checkout/checkout-form";
import usersGlobalStore, { IUsersGlobalStore } from "@/store/users-store";
import { createNewSubscription } from "@/actions/subscriptions";
import { useRouter } from "next/navigation";

const stripePromise = loadStripe(
  process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY!
);

const Page = () => {
  const router = useRouter();
  const { selectedPaymentPlan } = plansGlobalStore() as IPlansGlobalStore;
  const { user } = usersGlobalStore() as IUsersGlobalStore;
  const [startDate, setStartDate] = useState(dayjs().format("YYYY-MM-DD"));
  const [loading, setLoading] = useState(false);
  const [clientSecret, setClientSecret] = useState<string | null>(null);
  const [showCheckoutForm, setShowCheckoutForm] = useState(false);

  const endDate = useMemo(() => {
    return dayjs(startDate)
      .add(selectedPaymentPlan?.paymentPlan?.duration, "d")
      .format("YYYY-MM-DD");
  }, [startDate]);

  const renderProperty = (key: string, value: any) => {
    try {
      return (
        <div className="flex justify-between items-center">
          <span className="text-gray-500 text-sm">{key}</span>
          <span className="text-gray-700 font-semibold text-sm">{value}</span>
        </div>
      );
    } catch (error) {
      return <></>;
    }
  };

  const paymentIntentHandler = async () => {
    try {
      setLoading(true);
      const response = await getStripePaymentIntent(
        selectedPaymentPlan.paymentPlan.price
      );
      if (!response.success) throw new Error(response.message);
      setClientSecret(response.data);
      setShowCheckoutForm(true);
    } catch (error) {
      console.log(error, "@paymet error");
      toast.error("Payment failed");
    } finally {
      setLoading(false);
    }
  };

  const stripeElementOptions = {
    clientSecret: clientSecret!,
  };

  const onPaymentSuccess = async (paymentId: string) => {
    try {
      const payload = {
        user_id: user?.id,
        plan_id: selectedPaymentPlan?.mainPlan?.id,
        start_date: startDate,
        end_date: endDate,
        payment_id: paymentId,
        amount: Number(selectedPaymentPlan?.paymentPlan?.price),
        total_duration: Number(selectedPaymentPlan?.paymentPlan?.duration),
        is_active: true,
      };
      const response = await createNewSubscription(payload);
      if (!response.success) throw new Error(response.message);
      toast.success("Congratulations! You have successfully subscribed.");
      router.push("/account/user/subscriptions");
    } catch (error) {
      console.log("@Payment failed", error);
      toast.error("An error occurred while processing your payment.");
    }
  };

  return (
    <div>
      <PageTitle title="Checkout" />
      {selectedPaymentPlan ? (
        <div className="grid grid-cols-2 mt-7">
          <div className="col-span-1 p-5 border border-gray-500 flex flex-col gap-2 rounded">
            {renderProperty("Plan Name", selectedPaymentPlan?.mainPlan?.name)}
            {renderProperty(
              "Amount",
              "$ " + selectedPaymentPlan?.paymentPlan?.price
            )}
            {renderProperty(
              "Duration",
              selectedPaymentPlan?.paymentPlan?.duration + " days"
            )}
            {renderProperty(
              "Start Date",
              <Input
                value={startDate}
                type="date"
                onChange={(e) => setStartDate(e.target.value)}
              />
            )}
            {startDate && renderProperty("End Date", endDate)}
            <Button
              disabled={loading}
              className="bg-black hover:bg-slate-800 mt-7"
              onClick={paymentIntentHandler}
            >
              {loading ? "Processing" : "Pay Now"}
            </Button>
          </div>
          <div className="col-span-1"></div>
        </div>
      ) : (
        <div className="h-[400px] flex flex-col justify-center items-center">
          <p>No payment plan selected.</p>
          <p>
            <Link
              href="/account/user/purchase-plan"
              className="text-blue-600 hover:underline"
            >
              Select a plan
            </Link>
          </p>
        </div>
      )}

      {showCheckoutForm && clientSecret && (
        <Elements stripe={stripePromise} options={stripeElementOptions}>
          <CheckoutForm
            showCheckoutForm={showCheckoutForm}
            setShowCheckoutForm={setShowCheckoutForm}
            onPaymentSuccess={onPaymentSuccess}
          />
        </Elements>
      )}
    </div>
  );
};

export default Page;
