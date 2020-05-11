import { PatientCreateRequest } from "../types/patients";

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const parsePatient = (body: any): PatientCreateRequest => {
  return {
    dateOfBirth: body.dateOfBirth,
    gender: body.gender,
    name: body.name,
    occupation: body.occupation,
    ssn: body.ssn,
  };
};

export default {
  parsePatient,
};
