"use client";

import React, { useState } from "react";
import { set, z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { Form, FormControl, FormField, FormItem, FormLabel } from "../ui/form";
import { useFieldArray, useForm } from "react-hook-form";
import { Input } from "../ui/input";
import { Textarea } from "../ui/textarea";
import { Button } from "../ui/button";
import { Trash2 } from "lucide-react";
import Image from "next/image";
import toast from "react-hot-toast";
import { uploadFile } from "@/actions/upload-file";
import { addNewPlan, editPlanById } from "@/actions/plans";
import { useRouter } from "next/navigation";
import Spinner from "../sipnner";
interface IProps {
  formType?: "add" | "edit";
  initialValues?: any;
}

const PlanForm = ({ formType, initialValues }: IProps) => {
  const router = useRouter();
  const [selectedMedias, setSelectedMedias] = useState<any[]>([]);
  const [existingMediaUrls, setExistingMediaUrls] = useState<string[]>(
    initialValues?.images || []
  );
  const [loading, setLoading] = useState(false);
  const formSchema = z.object({
    name: z.string().nonempty("Name is required"),
    description: z.string().nonempty("Description is required"),
    features: z.array(z.string().nonempty("Feature is required")),
    monthly_price: z.number(),
    quarterly_price: z.number(),
    half_yearly_price: z.number(),
    yearly_price: z.number(),
  });

  const form: any = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: initialValues?.name || "",
      description: initialValues?.description || "",
      features: initialValues?.features || [],
      monthly_price: initialValues?.monthly_price || 0,
      quarterly_price: initialValues?.quarterly_price || 0,
      half_yearly_price: initialValues?.half_yearly_price || 0,
      yearly_price: initialValues?.yearly_price || 0,
    },
  });

  const featuresFields = useFieldArray({
    control: form.control,
    name: "features",
  });

  const pricingfields = [
    "monthly_price",
    "quarterly_price",
    "half_yearly_price",
    "yearly_price",
  ];

  const onRemoveSelectedMedia = (index: number) => {
    const temp = [...selectedMedias];
    temp.splice(index, 1);
    setSelectedMedias(temp);
  };
  const onExistingMediaUrlRemove = (index: number) => {
    const temp = [...existingMediaUrls];
    temp.splice(index, 1);
    setExistingMediaUrls(temp);
  };

  const onSubmit = async (data: z.infer<typeof formSchema>) => {
    try {
      setLoading(true);
      let newMediaUrls = [];
      for (let media of selectedMedias) {
        const response = await uploadFile(media);
        if (!response.success) throw new Error(response.message);
        if (response.data) newMediaUrls.push(response.data.url.data.publicUrl);
      }
      let response = null;
      if (formType === "add")
        response = await addNewPlan({ ...data, images: newMediaUrls });
      else
        response = await editPlanById(initialValues.id, {
          ...data,
          images: [...existingMediaUrls, ...newMediaUrls],
        });
      if (!response.success) throw new Error(response.message);
      toast.success(
        `Plan ${formType == "add" ? "created" : "updated"} successfully.`
      );
      router.push("/account/admin/plans");
    } catch (error: any) {
      toast.error(
        error?.message ||
          "An error occur while creating plan. Please try again."
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="mt-7">
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-5">
          <FormField
            control={form.control}
            name="name"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Name</FormLabel>

                <FormControl>
                  <Input {...field} />
                </FormControl>
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="description"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Description</FormLabel>

                <FormControl>
                  <Textarea {...field} />
                </FormControl>
              </FormItem>
            )}
          />
          <fieldset className="p-5 border border-gray-200 rounded-sm">
            <legend className="bg-white px-2 text-sm">Features</legend>
            {featuresFields.fields.map((field, index) => (
              <FormField
                key={field.id}
                control={form.control}
                name={`features.${index}`}
                render={({ field }) => (
                  <FormItem className="flex items-center mt-2">
                    <FormControl>
                      <Input {...field} />
                    </FormControl>
                    <Button
                      type="button"
                      onClick={() => featuresFields.remove(index)}
                      className="bg-black hover:bg-slate-800 cursor-pointer"
                    >
                      <Trash2 size={16} />
                    </Button>
                  </FormItem>
                )}
              />
            ))}
            <Button
              type="button"
              variant={"outline"}
              size={"sm"}
              onClick={() => featuresFields.append("")}
              className=" mt-4 cursor-pointer"
            >
              Add features
            </Button>
          </fieldset>
          <fieldset className="p-5 border border-gray-200 rounded-sm">
            <legend className="bg-white px-2 text-sm">Pricing</legend>
            <div className="grid grid-cols-4 gap-5">
              {pricingfields.map((fieldName) => (
                <FormField
                  key={fieldName}
                  control={form.control}
                  name={fieldName}
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="capitalize text-sm!">
                        {fieldName.replaceAll("_", " ")}
                      </FormLabel>
                      <FormControl>
                        <Input
                          {...field}
                          onChange={(e) =>
                            field.onChange(
                              !Number.isNaN(parseFloat(e.target.value))
                                ? parseFloat(e.target.value)
                                : 0
                            )
                          }
                        />
                      </FormControl>
                    </FormItem>
                  )}
                ></FormField>
              ))}
            </div>
          </fieldset>
          <div className="flex flex-col gap-3">
            <FormLabel>Images</FormLabel>
            <Input
              type="file"
              multiple
              onChange={(event: any) => {
                setSelectedMedias((prev) => [...prev, ...event.target.files]);
              }}
            />
            <div className="flex flex-wrap gap-5">
              {existingMediaUrls.map((mediaUrl, index) => (
                <div
                  key={index}
                  className="border p-2 rounded border-gray-300 flex flex-col items-center justify-center"
                >
                  <Image
                    src={mediaUrl}
                    alt={`Image ${index}`}
                    height={100}
                    width={100}
                    className="object-contain w-20 h-20"
                  />
                  <span
                    className="text-gray-500 text-xs cursor-pointer underline "
                    onClick={() => onExistingMediaUrlRemove(index)}
                  >
                    Remove
                  </span>
                </div>
              ))}
              {selectedMedias.map((file, index) => (
                <div
                  key={index}
                  className="border p-2 rounded border-gray-300 flex flex-col items-center justify-center"
                >
                  <Image
                    src={URL.createObjectURL(file)}
                    alt={file.name}
                    height={20}
                    width={20}
                    className="object-contain w-20 h-20"
                  />
                  <span
                    className="text-gray-500 text-xs cursor-pointer underline "
                    onClick={() => onRemoveSelectedMedia(index)}
                  >
                    Remove
                  </span>
                </div>
              ))}
            </div>
          </div>
          <div className="flex justify-end gap-5">
            <Button
              type="button"
              variant={"outline"}
              disabled={loading}
              className="  cursor-pointer"
              onClick={() => router.push("/account/admin/plans")}
            >
              Cancel
            </Button>
            <Button
              type="submit"
              disabled={loading}
              className="bg-black hover:bg-slate-800 cursor-pointer"
            >
              {loading ? "Submitting" : "Submit"}
            </Button>
          </div>
        </form>
      </Form>
    </div>
  );
};

export default PlanForm;
