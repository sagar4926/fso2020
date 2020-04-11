import React, { useState, useEffect } from "react";
import Filter from "./Filter";
import Persons from "./Persons";
import PersonForm from "./PersonForm";
import api__persons from "./apis/api__persons";

const App = () => {
  const [persons, setPersons] = useState([]);
  const [newPerson, setNewPerson] = useState({ name: "", number: "" });
  const [filter, setFilter] = useState("");

  useEffect(() => {
    api__persons.getAll().then((data) => setPersons(data));
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

    api__persons.create(created).then((data) => {
      setPersons(persons.concat(data));
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
