import React, { useState } from "react";
import Filter from "./Filter";
import Persons from "./Persons";
import PersonForm from "./PersonForm";

const App = () => {
  const [persons, setPersons] = useState([
    { name: "Arto Hellas", number: "040-123456" },
    { name: "Ada Lovelace", number: "39-44-5323523" },
    { name: "Dan Abramov", number: "12-43-234345" },
    { name: "Mary Poppendieck", number: "39-23-6423122" },
  ]);

  const [filter, setFilter] = useState("");
  const [newPerson, setNewPerson] = useState({ name: "", number: "" });
  const filterChanged = (event) => {
    setFilter(event.target.value);
  };

  const onPersonCreated = (created) => {
    const existing = persons.filter((person) => person.name === created.name);

    if (existing.length > 0) {
      alert(`${created.name} is already added to the phonebook`);
      return;
    }

    setPersons([...persons, created]);
    setNewPerson({ name: "", number: "" });
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
