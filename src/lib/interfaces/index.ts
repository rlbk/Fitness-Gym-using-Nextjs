export interface IUser {
  id: string;
  clerk_user_id: string;
  name: string;
  email: string;
  created_at: string;
  is_admin: boolean;
  is_active: boolean;
}

export interface IPlan {
  id: string;
  name: string;
  description: string;
  features: string[];
  monthly_price: number;
  quarterly_price: number;
  half_yearly_price: number;
  yearly_price: number;
  images: string[];
  is_active: boolean;
  created_at: string;
  updated_at: string;
}

export interface ISubscription {
  id: string;
  plan_id: string;
  plans: IPlan;
  user_id: string;
  user: IUser;
  payment_id: string;
  start_date: string;
  end_date: string;
  is_active: boolean;
  user_profiles?: IUser;
  amount: number;
  total_duration: number;
  created_at: string;
}
