import { ISubscription, IUser } from "@/lib/interfaces";
import { create } from "zustand";

const usersGlobalStore = create((set) => ({
  user: null,
  setUser: (user: IUser) => set({ user }),
  currentSubscription: null,
  setCurrentSubscription: (subscription: ISubscription) =>
    set({ currentSubscription: subscription }),
}));

export default usersGlobalStore;
export interface IUsersGlobalStore {
  user: IUser | null;
  setUser: (user: IUser) => void;
  currentSubscription: ISubscription | null;
  setCurrentSubscription: (subscription: ISubscription) => void;
}
