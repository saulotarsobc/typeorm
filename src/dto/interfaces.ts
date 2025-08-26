export type PersonTypeEnum = "individual" | "company";

export interface migrations {
  id: number;
  timestamp: bigint;
  name: string;
}

export interface Group {
  created_at: Date;
  updated_at: Date;
  id: number;
  name: string;
  description: string | null;
  users?: User[];
}

export interface User {
  created_at: Date;
  updated_at: Date;
  id: number;
  username: string;
  password: string;
  group_id: number;
  person?: Person | null;
  group?: Group;
}

export interface Addresses {
  created_at: Date;
  updated_at: Date;
  id: number;
  street: string;
  number: string | null;
  complement: string | null;
  neighborhood: string | null;
  city: string | null;
  state: string | null;
  zip_code: string | null;
  country: string | null;
  coordinates: JsonValue | null;
  person_address?: PersonAddress[];
}

export interface PersonAddress {
  created_at: Date;
  updated_at: Date;
  person_id: number;
  address_id: number;
  addresses?: Addresses;
  person?: Person;
}

export interface Person {
  created_at: Date;
  updated_at: Date;
  cpf: string;
  email: string;
  type: PersonTypeEnum;
  user_id: number;
  person_address?: PersonAddress[];
  user?: User;
}

type JsonValue =
  | string
  | number
  | boolean
  | { [key in string]?: JsonValue }
  | Array<JsonValue>
  | null;
