import { State } from "./state";
import { Patient, DetailedPatient } from "../types";

export enum Actions {
  INIT__PATIENTS_PUBLIC_LIST = "INIT__PATIENTS_PUBLIC_LIST",
  ADD__PUBLIC_PATIENT = "ADD__PUBLIC_PATIENT",
  ADD__DETAILED_PATIENT = "ADD__DETAILED_PATIENT",
}

export type Action =
  | {
      type: Actions.INIT__PATIENTS_PUBLIC_LIST;
      payload: Patient[];
    }
  | {
      type: Actions.ADD__PUBLIC_PATIENT;
      payload: Patient;
    }
  | {
      type: Actions.ADD__DETAILED_PATIENT;
      payload: DetailedPatient;
    };

export const reducer = (state: State, action: Action): State => {
  switch (action.type) {
    case Actions.INIT__PATIENTS_PUBLIC_LIST:
      return {
        ...state,
        patients: {
          ...action.payload.reduce(
            (memo, patient) => ({ ...memo, [patient.id]: patient }),
            {}
          ),
          ...state.patients,
        },
      };
    case Actions.ADD__PUBLIC_PATIENT:
      return {
        ...state,
        patients: {
          ...state.patients,
          [action.payload.id]: action.payload,
        },
      };
    case Actions.ADD__DETAILED_PATIENT: {
      return {
        ...state,
        patientsWithDetails: {
          ...state.patientsWithDetails,
          [action.payload.id]: action.payload,
        },
      };
    }
    default:
      return state;
  }
};
