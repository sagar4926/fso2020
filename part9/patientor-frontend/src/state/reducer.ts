import { State } from "./state";
import { Patient, DetailedPatient, Diagnosis, Entry } from "../types";

export enum Actions {
  INIT__PATIENTS_PUBLIC_LIST = "INIT__PATIENTS_PUBLIC_LIST",
  ADD__PUBLIC_PATIENT = "ADD__PUBLIC_PATIENT",
  ADD__DETAILED_PATIENT = "ADD__DETAILED_PATIENT",
  INIT__DIAGNOSES = "INIT__DIAGNOSES",
  ADD__ENTRY_TO_DETAILED_PATIENT = "ADD__ENTRY_TO_DETAILED_PATIENT",
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
    }
  | {
      type: Actions.INIT__DIAGNOSES;
      payload: Diagnosis[];
    }
  | {
      type: Actions.ADD__ENTRY_TO_DETAILED_PATIENT;
      payload: {
        patient: DetailedPatient;
        entry: Entry;
      };
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
    case Actions.INIT__DIAGNOSES: {
      return {
        ...state,
        diagnoses: {
          ...state.diagnoses,
          ...action.payload.reduce(
            (acc, diagnosis) => ({ ...acc, [diagnosis.code]: diagnosis }),
            {}
          ),
        },
      };
    }
    case Actions.ADD__ENTRY_TO_DETAILED_PATIENT: {
      return {
        ...state,
        patientsWithDetails: {
          ...state.patientsWithDetails,
          [action.payload.patient.id]: {
            ...action.payload.patient,
            entries: [...action.payload.patient.entries, action.payload.entry],
          },
        },
      };
    }
    default:
      return state;
  }
};
