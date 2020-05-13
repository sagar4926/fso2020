/* eslint-disable @typescript-eslint/no-explicit-any */
import {
  EntryCreateSchema,
  EntryType,
  entryTypeSchema,
  HealthCheckEntryCreateSchema,
  HospitalEntryCreateSchema,
  OccupationalHealthcareEntryCreateSchema,
} from "../types/entry";
import { Gender, PatientCreateRequest } from "../types/patients";
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

const assertNever = (value: never): never => {
  throw new Error(`Invalid type ${value}`);
};

const parserParams = {
  abortEarly: false,
  stripUnknown: true,
};
const parseEntry = (body: any): EntryCreateSchema | undefined => {
  const type: EntryType = entryTypeSchema.validateSync(body.type);
  switch (type) {
    case EntryType.Hospital: {
      const hospitalEntry = HospitalEntryCreateSchema.validateSync(
        body,
        parserParams
      );
      return hospitalEntry;
    }
    case EntryType.HealthCheck: {
      const entry = HealthCheckEntryCreateSchema.validateSync(
        body,
        parserParams
      );
      return entry;
    }
    case EntryType.OccupationalHealthcare: {
      const entry = OccupationalHealthcareEntryCreateSchema.validateSync(
        body,
        parserParams
      );
      return entry;
    }
    default: {
      assertNever(type);
      return;
    }
  }
};

export default {
  parsePatient,
  parseEntry,
};
