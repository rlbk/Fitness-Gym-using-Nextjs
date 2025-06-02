"use client";

import { getAllUsers } from "@/actions/users";
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
  const [users, setUsers] = useState<IUser[]>([]);
  const [loading, setLoading] = useState(false);

  const fetchUsersData = async () => {
    try {
      setLoading(true);
      const response = await getAllUsers();
      if (!response.success) throw new Error(response.message);
      if (response?.data) setUsers(response.data);
    } catch (error: any) {
      toast.error(error.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchUsersData();
  }, []);

  const columns = [
    "User ID",
    "Name",
    "Email",
    "Is Admin",
    "Is Active",
    "Created At",
  ];
  return (
    <div>
      <PageTitle title="All Users" />
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
            {users.length ? (
              users.map((user) => (
                <TableRow key={user.id}>
                  <TableCell className="font-medium">{user.id}</TableCell>
                  <TableCell>{user.name}</TableCell>
                  <TableCell>{user.name}</TableCell>
                  <TableCell>{user.is_admin ? "✔️" : "❌"}</TableCell>
                  <TableCell>{user.is_active ? "✔️" : "❌"}</TableCell>
                  <TableCell>
                    {dayjs(user.created_at).format("MMM DD, YYYY")}
                  </TableCell>
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell
                  colSpan={columns.length}
                  className="h-24 text-center"
                >
                  No User found.
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
