import Axios from "axios";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Button, Container } from "semantic-ui-react";
import CenteredModal from "../components/CenteredModal";
import { apiBaseUrl } from "../constants";
import { useStateValue } from "../state";
import {
  addDetailedPatient,
  addEntryToDetailedPatient,
} from "../state/actionCreators";
import { DetailedPatient, EntryCreateSchema, Entry } from "../types";
import AddHealthCheckEntryForm from "./AddPatientEntry/AddHealthCheckEntryForm";
import PatientDetails from "./PatientDetails";

const PatientDetailsPage = () => {
  const [modalOpen, setModalOpen] = useState(false);

  const { id } = useParams<{ id: string }>();
  const [{ patientsWithDetails }, dispatch] = useStateValue();

  useEffect(() => {
    const loadPatientInfo = async () => {
      if (!Object.keys(patientsWithDetails).includes(id)) {
        const { data: patient } = await Axios.get<DetailedPatient>(
          `${apiBaseUrl}/patients/${id}`
        );
        dispatch(addDetailedPatient(patient));
      }
    };
    loadPatientInfo();
  }, [id, dispatch]);

  const patient = Object.keys(patientsWithDetails).includes(id)
    ? patientsWithDetails[id]
    : undefined;

  if (!patient) {
    return null;
  }

  const onModalClose = () => {
    setModalOpen(false);
  };

  const onModalOpen = () => {
    setModalOpen(true);
  };

  const createNewEntry = async (data: EntryCreateSchema) => {
    console.log("Create entry for data : ", data);
    const { data: entry } = await Axios.post<Entry>(
      `${apiBaseUrl}/patients/${patient.id}/entries`,
      data
    );
    dispatch(addEntryToDetailedPatient(patient, entry));
    onModalClose();
  };

  return (
    <Container>
      <CenteredModal
        modalOpen={modalOpen}
        title="Add New HealthCheck Entry"
        onClose={onModalClose}
      >
        <AddHealthCheckEntryForm
          onCancel={onModalClose}
          onSubmit={createNewEntry}
        />
      </CenteredModal>
      <PatientDetails patient={patient} />
      <Button onClick={onModalOpen}>Add New HealthCheck Entry</Button>
    </Container>
  );
};

export default PatientDetailsPage;
