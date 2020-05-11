import diagnosesData from "../data/diagnoses.json";
import { Diagnose } from "../types/diagnose";

const diagnoses: Diagnose[] = diagnosesData;

export const getAllDiagnoses = (): Diagnose[] => {
  return diagnoses;
};
