import * as yup from "yup";
import { HealthCheckRating, EntryType } from "./types";

export const entryTypeSchema = yup
  .string()
  .required("Type is required")
  .oneOf(Object.values(EntryType));

const BaseEntryCreateSchema = yup.object().shape({
  description: yup.string().required(),
  date: yup.string().required(),
  specialist: yup.string().required(),
  diagnosisCodes: yup.array().of(yup.string()),
  type: entryTypeSchema,
});

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
