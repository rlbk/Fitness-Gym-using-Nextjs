"use server";

import supabase from "@/config/supabase-config";

export const addNewPlan = async (payload: any) => {
  try {
    const { data, error } = await supabase.from("plans").insert([payload]);
    if (error) throw new Error(error.message);
    return { success: true, data };
  } catch (error: any) {
    return { success: false, message: error.message };
  }
};

export const getAllPlans = async () => {
  try {
    const { data, error } = await supabase.from("plans").select("*");
    if (error) throw new Error(error.message);
    return { success: true, data };
  } catch (error: any) {
    return { success: false, message: error.message };
  }
};

export const getPlanById = async (id: string) => {
  try {
    const { data, error } = await supabase
      .from("plans")
      .select("*")
      .eq("id", id);
    if (error) throw new Error(error.message);
    return { success: true, data };
  } catch (error: any) {
    return { success: false, message: error.message };
  }
};

export const editPlanById = async (id: string, payload: any) => {
  try {
    const { data, error } = await supabase
      .from("plans")
      .update(payload)
      .eq("id", id);
    if (error) throw new Error(error.message);
    return { success: true, data };
  } catch (error: any) {
    return { success: false, message: error.message };
  }
};

export const deletePlanById = async (id: string) => {
  try {
    const { data, error } = await supabase.from("plans").delete().match({ id });
  } catch (error: any) {
    return { success: false, message: error.message };
  }
};
