import patients from "../data/patients";
import { v4 as uuidv4 } from "uuid";

import {
  Patient,
  PatientPublicInfo,
  PatientCreateRequest,
} from "../types/patients";
import { EntryCreateSchema, Entry } from "../types/entry";

const getPatientById = (id: string): Patient | undefined => {
  return patients.find((patient) => patient.id === id);
};

const getAllPatientsPublicInfo = (): PatientPublicInfo[] => {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  return patients.map(({ ssn, entries, ...rest }) => ({ ...rest }));
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

const createPatientEntry = (
  patient: Patient,
  entryRequest: EntryCreateSchema
): Entry => {
  const entry: Entry = {
    id: uuidv4(),
    ...entryRequest,
  } as Entry;

  patient.entries.push(entry);

  return entry;
};

const patientService = {
  getAllPatientsPublicInfo,
  createPatient,
  getPatientById,
  createPatientEntry
};

export default patientService;
