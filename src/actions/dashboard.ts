"use server";

import supabase from "@/config/supabase-config";

export const getUsersReport = async () => {
  try {
    const { data, error } = await supabase.rpc("users_reports");
    return { success: true, data: data[0] };
  } catch (error: any) {
    return { success: false, message: error.message };
  }
};

export const getSubscriptionReport = async () => {
  try {
    const { data, error } = await supabase.rpc("subscriptions_reports");
    return { success: true, data: data[0] };
  } catch (error: any) {
    return { success: false, message: error.message };
  }
};
