import React from "react";
import { Container, Icon } from "semantic-ui-react";
import { DetailedPatient, Gender } from "../types";
import EntryDetails from "./EntryDetail";

type Props = {
  patient: DetailedPatient;
};

const PatientDetails: React.FC<Props> = ({ patient }) => {
  const genderIcon =
    patient.gender === Gender.Female
      ? "venus"
      : patient.gender === Gender.Male
      ? "mars"
      : "venus mars";
  return (
    <Container style={{ margin: 10 }}>
      <h3>Patient Details</h3>
      <p>
        {patient.name} <Icon name={genderIcon} />
      </p>
      <p>SSN: {patient.ssn} </p>
      <p>Occupation: {patient.occupation} </p>
      {patient.entries.map((entry) => (
        <EntryDetails key={entry.id} entry={entry}></EntryDetails>
      ))}
    </Container>
  );
};

export default PatientDetails;
