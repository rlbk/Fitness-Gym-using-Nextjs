import { IUser } from "@/lib/interfaces";
import React from "react";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
} from "@/components/ui/sheet";
import { Heart, Home, List, ShieldCheck, User2 } from "lucide-react";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";
import { useRouter } from "next/navigation";

interface IProps {
  user: IUser;
  openMenuItems: boolean;
  setOpenMenuItems: React.Dispatch<React.SetStateAction<boolean>>;
}

const MenuItems = ({ user, openMenuItems, setOpenMenuItems }: IProps) => {
  const userMenuItems = [
    {
      name: "Home",
      icon: Home,
      route: "/account",
    },
    {
      name: "Profile",
      icon: User2,
      route: "/account/user/profile",
    },
    {
      name: "My Subscriptions",
      icon: ShieldCheck,
      route: "/account/user/subscriptions",
    },
    {
      name: "Referrals",
      icon: Heart,
      route: "/account/user/referrals",
    },
  ];
  const adminMenuItems = [
    {
      name: "Home",
      icon: Home,
      route: "/account",
    },
    {
      name: "users",
      icon: User2,
      route: "/account/admin/users",
    },
    {
      name: "Subscriptions",
      icon: ShieldCheck,
      route: "/account/admin/subscriptions",
    },
    {
      name: "Customers",
      icon: List,
      route: "/account/admin/customers",
    },
  ];

  const pathname = usePathname();
  const router = useRouter();

  const menuItems = user.is_admin ? adminMenuItems : userMenuItems;
  return (
    <Sheet open={openMenuItems} onOpenChange={setOpenMenuItems}>
      <SheetContent>
        <SheetHeader>
          <SheetTitle></SheetTitle>
        </SheetHeader>
        <div className="flex flex-col gap-10 mt-20  ">
          {menuItems.map((item) => {
            const Icon = item.icon;
            return (
              <div
                key={item.name}
                className={cn(
                  "flex items-center  gap-3 p-3 rounded cursor-pointer",
                  pathname === item.route &&
                    "bg-gray-100 border border-gray-500 "
                )}
                onClick={() => router.push(item.route)}
              >
                <Icon size={15} />
                <span className="text-sm">{item.name}</span>
              </div>
            );
          })}
        </div>
      </SheetContent>
    </Sheet>
  );
};

export default MenuItems;
