"use server";

import supabase from "@/config/supabase-config";

export const uploadFile = async (file: File) => {
  try {
    const fileName = new Date().getTime() + file.name;
    const { data, error } = await supabase.storage
      .from("default")
      .upload(fileName, file);
    if (error) throw new Error(error.message);
    const url = await supabase.storage.from("default").getPublicUrl(fileName);
    return { success: true, data: { url } };
  } catch (error: any) {
    return { success: false, message: error.message };
  }
};
