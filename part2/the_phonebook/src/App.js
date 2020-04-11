import React, { useState, useEffect } from "react";
import axios from "axios";
import Filter from "./Filter";
import Persons from "./Persons";
import PersonForm from "./PersonForm";

const App = () => {
  const [persons, setPersons] = useState([]);
  const [newPerson, setNewPerson] = useState({ name: "", number: "" });
  const [filter, setFilter] = useState("");

  useEffect(() => {
    axios.get("http://localhost:3001/persons").then((res) => {
      setPersons(res.data);
    });
  }, []);

  const filterChanged = (event) => {
    setFilter(event.target.value);
  };

  const onPersonCreated = (created) => {
    const existing = persons.filter((person) => person.name === created.name);

    if (existing.length > 0) {
      alert(`${created.name} is already added to the phonebook`);
      return;
    }

    axios.post(`http://localhost:3001/persons`, created).then(res => {
      setPersons(persons.concat(res.data));
      setNewPerson({ name: "", number: "" });
    });   
  };

  return (
    <div>
      <h2>Phonebook</h2>
      <Filter filter={filter} onChange={filterChanged}></Filter>
      <PersonForm
        person={newPerson}
        onPersonCreated={onPersonCreated}
      ></PersonForm>
      <h2>Numbers</h2>
      <Persons persons={persons} filter={filter}></Persons>
    </div>
  );
};

export default App;
