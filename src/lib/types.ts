export interface ShopifyUser {
  customers: Array<UserProps>;
}
export interface UserProps {
  id: number;
  first_name?: string;
  last_name?: string;
  email: string;
  state?: "enabled" | "disabled" | "invited" | "declined";
}
export interface LinkHeader {
  next?: string;
}
