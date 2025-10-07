import { Dayjs } from "dayjs";

interface Gender {
  id: number;
  name: string;
}
interface Organisation {
  id: number;
  name: string;
}

interface Division {
  id: number;
  name: string;
}

interface District {
  id: number;
  name: string;
}

interface Upazila {
  id: number;
  name: string;
}

export interface User {
  id: number;
  email: string;
  name: string;
  dob: string;
  contact_number: string;
  note: string;
  designation: string;
  avatar_url: string;
  age: number;
  gender: Gender;
  organisation: Organisation;
  division: Division;
  district: District;
  upazila: Upazila;
}

export interface UserFilterData {
  designation: string;
  dob?: Dayjs | string;
  city: string;
  gender: string;
}
