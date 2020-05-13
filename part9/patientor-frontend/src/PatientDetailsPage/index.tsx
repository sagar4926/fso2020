import axios from "axios";
import React, { useEffect } from "react";
import { useParams } from "react-router-dom";
import { Container, Icon } from "semantic-ui-react";
import { apiBaseUrl } from "../constants";
import { useStateValue, Actions } from "../state";
import { DetailedPatient, Gender } from "../types";

const PatientDetailsPage = () => {
  const { id } = useParams<{ id: string }>();
  const [{ patientsWithDetails }, dispatch] = useStateValue();

  useEffect(() => {
    const loadPatientInfo = async () => {
      if (!Object.keys(patientsWithDetails).includes(id)) {
        const { data: patient } = await axios.get<DetailedPatient>(
          `${apiBaseUrl}/patients/${id}`
        );
        dispatch({
          type: Actions.ADD__DETAILED_PATIENT,
          payload: patient,
        });
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

  const genderIcon =
    patient.gender === Gender.Female
      ? "venus"
      : patient.gender === Gender.Male
      ? "mars"
      : "venus mars";
  return (
    <Container>
      <h3>Patient Details</h3>
      <p>
        {patient.name} <Icon name={genderIcon} />
      </p>
      <p>SSN: {patient.ssn} </p>
      <p>Occupation: {patient.occupation} </p>
    </Container>
  );
};

export default PatientDetailsPage;
