/* eslint-disable @typescript-eslint/no-explicit-any */
import { PatientCreateRequest, Gender } from "../types/patients";
import { isString } from "./util";

const parseString = (field: any, label = "field"): string => {
  if (!field || !isString(field)) {
    throw new Error(`'${label}' should be a string`);
  }
  return field;
};

const isDate = (date: string): boolean => {
  return Boolean(Date.parse(date));
};

const parseDate = (date: any): string => {
  if (!date || !isString(date) || !isDate(date)) {
    throw new Error("Date invalid");
  }
  return date;
};

const isGender = (field: any): field is Gender => {
  return Object.values(Gender).includes(field);
};

const parseGender = (field: any): Gender => {
  if (!field || !isGender(field)) {
    throw new Error(`'Gender' should be valid`);
  }
  return field;
};

const parsePatient = (body: any): PatientCreateRequest => {
  return {
    dateOfBirth: parseDate(body.dateOfBirth),
    gender: parseGender(body.gender),
    name: parseString(body.name, "name"),
    occupation: parseString(body.occupation, "occupation"),
    ssn: parseString(body.ssn, "ssn"),
  };
};

export default {
  parsePatient,
};
