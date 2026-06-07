export interface Address {
  city: string;
}

export interface Company {
  name: string;
}

export interface User {
  id: number;
  name: string;
  email: string;
  address: Address;
  company: Company;
  website:string;
  phone:string;
}