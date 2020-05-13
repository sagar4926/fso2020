import axios from "axios";
import React from "react";
import { BrowserRouter as Router, Link, Route, Switch } from "react-router-dom";
import { Button, Container, Divider, Header } from "semantic-ui-react";
import { apiBaseUrl } from "./constants";
import PatientDetailsPage from "./PatientDetailsPage";
import PatientListPage from "./PatientListPage";
import { useStateValue } from "./state";
import { initPatients } from "./state/actionCreators";
import { Patient } from "./types";

const App: React.FC = () => {
  const [, dispatch] = useStateValue();
  React.useEffect(() => {
    axios.get<void>(`${apiBaseUrl}/ping`);

    const fetchPatientList = async () => {
      try {
        const { data: patientListFromApi } = await axios.get<Patient[]>(
          `${apiBaseUrl}/patients`
        );
        dispatch(initPatients(patientListFromApi));
      } catch (e) {
        console.error(e);
      }
    };
    fetchPatientList();
  }, [dispatch]);

  return (
    <div className="App">
      <Router>
        <Container>
          <Header as="h1">Patientor</Header>
          <Button as={Link} to="/" primary>
            Home
          </Button>
          <Divider hidden />
          <Switch>
            <Route path="/:id" render={() => <PatientDetailsPage />} />
            <Route path="/" render={() => <PatientListPage />} />
          </Switch>
        </Container>
      </Router>
    </div>
  );
};

export default App;
