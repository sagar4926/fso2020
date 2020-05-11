export type Gender = "male" | "female";

export interface Patient {
  id: string;
  name: string;
  dateOfBirth: string;
  ssn: string;
  gender: Gender;
  occupation: string;
}

export type PatientCreateRequest = Omit<Patient, "id">;
export type PatientPublicInfo = Omit<Patient, "ssn">;
