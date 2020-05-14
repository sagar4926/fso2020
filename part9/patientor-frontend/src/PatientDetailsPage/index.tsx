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
import AddHospitalEntryForm from "./AddPatientEntry/AddHospitalEntryForm";
import AddOccupationalHealthcareEntryForm from "./AddPatientEntry/AddOccupationalHealthcareEntryForm";

const PatientDetailsPage = () => {
  const [healthCheckEntryModalOpen, setHealthCheckEntryModalOpen] = useState(
    false
  );
  const [hospitalEntryModalOpen, setHospitalEntryModalOpen] = useState(false);
  const [occupationalEntryModalOpen, setOccupationalEntryModalOpen] = useState(
    false
  );

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

  const onHealthCheckEntryModalClose = () => {
    setHealthCheckEntryModalOpen(false);
  };

  const onHealthCheckEntryModalOpen = () => {
    setHealthCheckEntryModalOpen(true);
  };

  const onHospitalEntryModalClose = () => {
    setHospitalEntryModalOpen(false);
  };

  const onHospitalEntryModalOpen = () => {
    setHospitalEntryModalOpen(true);
  };

  const onOccupationalEntryModalClose = () => {
    setOccupationalEntryModalOpen(false);
  };

  const onOccupationalEntryModalOpen = () => {
    setOccupationalEntryModalOpen(true);
  };

  const createNewEntry = async (data: EntryCreateSchema) => {
    const { data: entry } = await Axios.post<Entry>(
      `${apiBaseUrl}/patients/${patient.id}/entries`,
      data
    );
    dispatch(addEntryToDetailedPatient(patient, entry));
    onHealthCheckEntryModalClose();
    onHospitalEntryModalClose();
    onOccupationalEntryModalClose();
  };

  return (
    <Container>
      <CenteredModal
        modalOpen={healthCheckEntryModalOpen}
        title="Add New HealthCheck Entry"
        onClose={onHealthCheckEntryModalClose}
      >
        <AddHealthCheckEntryForm
          onCancel={onHealthCheckEntryModalClose}
          onSubmit={createNewEntry}
        />
      </CenteredModal>
      <CenteredModal
        modalOpen={hospitalEntryModalOpen}
        title="Add New Hospital Entry"
        onClose={onHospitalEntryModalClose}
      >
        <AddHospitalEntryForm
          onCancel={onHospitalEntryModalClose}
          onSubmit={createNewEntry}
        />
      </CenteredModal>
      <CenteredModal
        modalOpen={occupationalEntryModalOpen}
        title="Add New Occupational Healthcare Entry"
        onClose={onOccupationalEntryModalClose}
      >
        <AddOccupationalHealthcareEntryForm
          onCancel={onOccupationalEntryModalClose}
          onSubmit={createNewEntry}
        />
      </CenteredModal>
      <PatientDetails patient={patient} />
      <Button onClick={onHealthCheckEntryModalOpen}>
        Add New HealthCheck Entry
      </Button>
      <Button onClick={onHospitalEntryModalOpen}>Add New Hospital Entry</Button>
      <Button onClick={onOccupationalEntryModalOpen}>
        Add New Occupational Healthcare Entry
      </Button>
    </Container>
  );
};

export default PatientDetailsPage;
