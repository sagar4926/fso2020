import * as yup from "yup";
import { Diagnosis } from "./diagnosis";
import { getAllDiagnoses } from "../services/diagnoses.service";

interface BaseEntry {
  id: string;
  description: string;
  date: string;
  specialist: string;
  diagnosisCodes?: Array<Diagnosis["code"]>;
}

export enum EntryType {
  Hospital = "Hospital",
  OccupationalHealthcare = "OccupationalHealthcare",
  HealthCheck = "HealthCheck",
}

export const entryTypeSchema = yup
  .string()
  .required("Type is required")
  .oneOf(Object.values(EntryType));

const BaseEntryCreateSchema = yup.object().shape({
  description: yup.string().required(),
  date: yup.string().required(),
  specialist: yup.string().required(),
  diagnosisCodes: yup
    .array()
    .of(yup.string().oneOf(getAllDiagnoses().map((d) => d.code))),
  type: entryTypeSchema,
});

export enum HealthCheckRating {
  "Healthy" = 0,
  "LowRisk" = 1,
  "HighRisk" = 2,
  "CriticalRisk" = 3,
}

export interface HealthCheckEntry extends BaseEntry {
  type: EntryType.HealthCheck;
  healthCheckRating: HealthCheckRating;
}

export const HealthCheckEntryCreateSchema = BaseEntryCreateSchema.shape({
  type: yup.string().required().oneOf([EntryType.HealthCheck]),
  healthCheckRating: yup
    .number()
    .required()
    .oneOf([
      HealthCheckRating.CriticalRisk,
      HealthCheckRating.LowRisk,
      HealthCheckRating.HighRisk,
      HealthCheckRating.Healthy,
    ]),
});

export interface SickLeave {
  startDate: string;
  endDate: string;
}

export interface OccupationalHealthcareEntry extends BaseEntry {
  type: EntryType.OccupationalHealthcare;
  employerName: string;
  sickLeave?: SickLeave;
}

export const OccupationalHealthcareEntryCreateSchema = BaseEntryCreateSchema.shape(
  {
    type: yup.string().required().oneOf([EntryType.OccupationalHealthcare]),
    employerName: yup.string().required(),
    sickLeave: yup.object().shape({
      startDate: yup.string().required(),
      endDate: yup.string().required(),
    }),
  }
);

export interface Discharge {
  date: string;
  criteria: string;
}

export interface HospitalEntry extends BaseEntry {
  type: EntryType.Hospital;
  discharge: Discharge;
}

export const HospitalEntryCreateSchema = BaseEntryCreateSchema.shape({
  type: yup.string().required().oneOf([EntryType.Hospital]),
  discharge: yup.object().shape({
    date: yup.string().required(),
    criteria: yup.string().required(),
  }),
});

export type Entry =
  | HospitalEntry
  | OccupationalHealthcareEntry
  | HealthCheckEntry;

export type EntryCreateSchema = Omit<Entry, "id">;
