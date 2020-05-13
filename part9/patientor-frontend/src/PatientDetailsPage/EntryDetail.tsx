import React from "react";
import { Entry } from "../types";
import { Container } from "semantic-ui-react";

const EntryDetail: React.FC<{ entry: Entry }> = ({ entry }) => {
  return (
    <Container>
      <div>Date: {entry.date}</div>
      <div>Description: {entry.description}</div>
      <ul>
        {entry.diagnosisCodes?.map((code) => (
          <li key={code}>{code}</li>
        ))}
      </ul>
    </Container>
  );
};

export default EntryDetail;
