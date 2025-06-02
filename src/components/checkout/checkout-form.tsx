"use client";

import React, { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import {
  PaymentElement,
  AddressElement,
  useStripe,
  useElements,
} from "@stripe/react-stripe-js";
import { Button } from "@/components/ui/button";
import toast from "react-hot-toast";

interface IProps {
  showCheckoutForm: boolean;
  setShowCheckoutForm: React.Dispatch<React.SetStateAction<boolean>>;
  onPaymentSuccess: (paymentId: string) => Promise<void>;
}

const CheckoutForm = ({
  setShowCheckoutForm,
  showCheckoutForm,
  onPaymentSuccess,
}: IProps) => {
  const [loading, setLoading] = useState(false);
  const stripe = useStripe();
  const elements = useElements();

  const handleSubmit = async (event: any) => {
    event.preventDefault();
    try {
      setLoading(true);
      if (!stripe || !elements) return;
      const result = await stripe.confirmPayment({
        elements,
        confirmParams: {
          return_url: "",
        },
        redirect: "if_required",
      });

      if (result.error) {
        throw new Error(result.error.message);
      } else {
        onPaymentSuccess(result.paymentIntent.id);
        setShowCheckoutForm(false);
        toast.success("Payment successful");
      }
    } catch (error) {
      toast.error("An error occur while processing payment. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <Dialog open={showCheckoutForm} onOpenChange={setShowCheckoutForm}>
      <DialogContent className="sm:max-w-[525px] max-h-[500px] overflow-y-scroll overflow-x-hidden">
        <DialogHeader>
          <DialogTitle>Complete payment</DialogTitle>
          <DialogDescription>
            Complete your payment to start your plan.
          </DialogDescription>
        </DialogHeader>
        <form onSubmit={handleSubmit}>
          <PaymentElement />
          <AddressElement
            options={{ allowedCountries: ["US"], mode: "billing" }}
          />
          <div className="flex justify-end gap-5 mt-7">
            <Button variant={"outline"} type="button">
              Cancel
            </Button>
            <Button disabled={loading} type="submit">
              {loading ? "Processing" : "Submit"}
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default CheckoutForm;
