import { Entry } from "./entry";

export enum Gender {
  Male = "male",
  Female = "female",
  Other = "other",
}

export interface Patient {
  id: string;
  name: string;
  dateOfBirth: string;
  ssn: string;
  gender: Gender;
  occupation: string;
  entries: Entry[];
}

export type PatientCreateRequest = Omit<Patient, "id" | "entries">;
export type PatientPublicInfo = Omit<Patient, "ssn" | "entries">;
