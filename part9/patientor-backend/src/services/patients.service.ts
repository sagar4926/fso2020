import patientsData from "../data/patients.json";
import { v4 as uuidv4 } from "uuid";

import {
  Patient,
  PatientPublicInfo,
  PatientCreateRequest,
} from "../types/patients";

const patients: Patient[] = patientsData as Patient[];

const getPatientById = (id: string): Patient | undefined => {
  return patients.find((patient) => patient.id === id);
};

const getAllPatientsPublicInfo = (): PatientPublicInfo[] => {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  return patients.map(({ ssn, ...rest }) => ({ ...rest }));
};

const createPatient = (patient: PatientCreateRequest): PatientPublicInfo => {
  const newPatient = {
    id: uuidv4(),
    ...patient,
    entries: [],
  };
  patients.push(newPatient);
  const response = {
    ...newPatient,
  };
  delete response.ssn;
  return response;
};

const patientService = {
  getAllPatientsPublicInfo,
  createPatient,
  getPatientById,
};

export default patientService;
