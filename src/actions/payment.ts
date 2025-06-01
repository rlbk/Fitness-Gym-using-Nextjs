"use server";

const stripe = require("stripe")(process.env.STRIPE_SECRET_KEY);

export const getStripePaymentIntent = async (amount: number) => {
  try {
    const paymentIntent = await stripe.paymentIntents.create({
      amount,
      currency: "usd",
      description: "Fitness.Gym payment",
    });
    return { success: true, data: paymentIntent.client_secret };
  } catch (error: any) {
    return { success: false, message: error.message };
  }
};
