"use client";

import { IUser } from "@/lib/interfaces";
import { Menu } from "lucide-react";
import React, { useState } from "react";
import MenuItems from "./menu-items";

interface IProps {
  user: IUser | null;
}

const Header = ({ user }: IProps) => {
  const [openMenuItems, setOpenMenuItems] = useState(false);
  return (
    <header className="flex items-center justify-between text-white bg-black px-5 py-6">
      <h1 className="text-2xl font-bold">
        <strong>Fitness.</strong>
        <strong className="text-primary">Gym</strong>
      </h1>
      <div className="flex gap-5 items-center">
        <h1 className="text-sm">{user?.name}</h1>
        <Menu
          size={20}
          className="cursor-pointer"
          onClick={() => setOpenMenuItems((prevState) => !prevState)}
        />
      </div>
      {user && (
        <MenuItems
          user={user}
          openMenuItems={openMenuItems}
          setOpenMenuItems={setOpenMenuItems}
        />
      )}
    </header>
  );
};

export default Header;
