import diagnosesData from "../data/diagnoses.json";
import { Diagnosis } from "../types/diagnosis";

const diagnoses: Diagnosis[] = diagnosesData;

export const getAllDiagnoses = (): Diagnosis[] => {
  return diagnoses;
};
