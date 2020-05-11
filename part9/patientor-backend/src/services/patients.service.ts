import patientsData from "../data/patients.json";
import { Patient, PatientPublicInfo } from "../types/patients";

const patients: Patient[] = patientsData as Patient[];

export const getAllPatientsPublicInfo = (): PatientPublicInfo[] => {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  return patients.map(({ ssn, ...rest }) => ({ ...rest }));
};
