import React from "react";
import { Entry } from "../types";
import { Container } from "semantic-ui-react";
import { useStateValue } from "../state";

const EntryDetail: React.FC<{ entry: Entry }> = ({ entry }) => {
  const [{ diagnoses }] = useStateValue();
  return (
    <Container>
      <div>Date: {entry.date}</div>
      <div>Description: {entry.description}</div>
      <ul>
        {entry.diagnosisCodes?.map((code) => (
          <li key={code}>
            {code}{" "}
            {Object.keys(diagnoses).includes(code) && diagnoses[code].name}
          </li>
        ))}
      </ul>
    </Container>
  );
};

export default EntryDetail;
