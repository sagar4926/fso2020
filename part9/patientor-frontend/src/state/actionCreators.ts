import { Patient, DetailedPatient } from "../types";
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
