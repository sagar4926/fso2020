import { Patient, DetailedPatient, Diagnosis, Entry } from "../types";
import { Action, Actions } from "./reducer";

export const initPatients = (payload: Patient[]): Action => {
  return {
    type: Actions.INIT__PATIENTS_PUBLIC_LIST,
    payload,
  };
};

export const addPublicPatient = (payload: Patient): Action => {
  return {
    type: Actions.ADD__PUBLIC_PATIENT,
    payload,
  };
};

export const addDetailedPatient = (payload: DetailedPatient): Action => {
  return {
    type: Actions.ADD__DETAILED_PATIENT,
    payload,
  };
};

export const initDiagnoses = (payload: Diagnosis[]): Action => {
  return {
    type: Actions.INIT__DIAGNOSES,
    payload,
  };
};

export const addEntryToDetailedPatient = (
  patient: DetailedPatient,
  entry: Entry
): Action => {
  return {
    type: Actions.ADD__ENTRY_TO_DETAILED_PATIENT,
    payload: {
      patient,
      entry,
    },
  };
};
