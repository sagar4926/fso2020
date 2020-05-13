import React from "react";
import { Segment, Icon, List } from "semantic-ui-react";
import { useStateValue } from "../state";
import {
  Entry,
  HealthCheckEntry,
  HospitalEntry,
  OccupationalHealthcareEntry,
  HealthCheckRating,
  Diagnosis,
} from "../types";

const assertNever = (entry: never): never => {
  throw new Error(`Invalid entry type. ${JSON.stringify(entry)}`);
};

const DiagnosisCodes: React.FC<{ codes?: Array<Diagnosis["code"]> }> = ({
  codes,
}) => {
  const [{ diagnoses }] = useStateValue();

  if (!codes) {
    return null;
  }

  return (
    <List divided relaxed>
      {codes.map((code) => (
        <List.Item key={code}>
          <List.Content>
            <List.Header>{code}</List.Header>
            <List.Description>
              {Object.keys(diagnoses).includes(code) && diagnoses[code].name}
            </List.Description>
          </List.Content>
        </List.Item>
      ))}
    </List>
  );
};

const HealthCheckRatingIndicator: React.FC<{ rating: HealthCheckRating }> = ({
  rating,
}) => {
  switch (rating) {
    case HealthCheckRating.CriticalRisk: {
      return <Icon style={{ color: "red" }} name="heart" />;
    }
    case HealthCheckRating.HighRisk: {
      return <Icon style={{ color: "orange" }} name="heart" />;
    }
    case HealthCheckRating.LowRisk: {
      return <Icon style={{ color: "yellow" }} name="heart" />;
    }
    default: {
      return <Icon style={{ color: "green" }} name="heart" />;
    }
  }
};

const HealthCheck: React.FC<{ entry: HealthCheckEntry }> = ({ entry }) => {
  return (
    <Segment>
      <h3>
        {entry.date} <Icon name="stethoscope"></Icon>
      </h3>
      <div>{entry.description}</div>
      <DiagnosisCodes codes={entry.diagnosisCodes} />
      <HealthCheckRatingIndicator rating={entry.healthCheckRating} />
    </Segment>
  );
};

const Hospital: React.FC<{ entry: HospitalEntry }> = ({ entry }) => {
  return (
    <Segment>
      <h3>
        {entry.date} <Icon name="hospital outline"></Icon>
      </h3>
      <div>{entry.description}</div>
      <DiagnosisCodes codes={entry.diagnosisCodes} />
    </Segment>
  );
};

const OccupationalHealthcare: React.FC<{
  entry: OccupationalHealthcareEntry;
}> = ({ entry }) => {
  return (
    <Segment>
      <h3>
        {entry.date} <Icon name="doctor"></Icon>
      </h3>
      <div>{entry.description}</div>
      <DiagnosisCodes codes={entry.diagnosisCodes} />
    </Segment>
  );
};

const EntryDetails: React.FC<{ entry: Entry }> = ({ entry }) => {
  switch (entry.type) {
    case "HealthCheck": {
      return <HealthCheck entry={entry} />;
    }
    case "Hospital": {
      return <Hospital entry={entry} />;
    }
    case "OccupationalHealthcare": {
      return <OccupationalHealthcare entry={entry} />;
    }
    default: {
      return assertNever(entry);
    }
  }
};

export default EntryDetails;
