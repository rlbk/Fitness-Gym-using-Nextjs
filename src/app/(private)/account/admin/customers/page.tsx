"use client";

import { getAllCustomers } from "@/actions/users";
import PageTitle from "@/components/page-title";
import { IUser } from "@/lib/interfaces";
import React, { useEffect, useState } from "react";
import toast from "react-hot-toast";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import Spinner from "@/components/sipnner";
import dayjs from "dayjs";

const Page = () => {
  const [customers, setCustomers] = useState<IUser[]>([]);
  const [loading, setLoading] = useState(false);

  const fetchCustomersData = async () => {
    try {
      setLoading(true);
      const response = await getAllCustomers();
      if (!response.success) throw new Error(response.message);
      if (response?.data) setCustomers(response.data);
    } catch (error: any) {
      toast.error(error.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchCustomersData();
  }, []);

  const columns = ["User ID", "Name", "Email"];
  return (
    <div>
      <PageTitle title="All Customers" />
      {loading ? (
        <Spinner parentHeight={150} />
      ) : (
        <Table>
          <TableHeader>
            <TableRow>
              {columns.map((column) => (
                <TableHead className="font-bold bg-gray-100 " key={column}>
                  {column}
                </TableHead>
              ))}
            </TableRow>
          </TableHeader>
          <TableBody>
            {customers.length ? (
              customers.map((customer) => (
                <TableRow key={customer.id}>
                  <TableCell className="font-medium">{customer.id}</TableCell>
                  <TableCell>{customer.name}</TableCell>
                  <TableCell>{customer.email}</TableCell>
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell
                  colSpan={columns.length}
                  className="h-24 text-center"
                >
                  No customer found.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      )}
    </div>
  );
};

export default Page;
