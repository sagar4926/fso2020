import React, { useState } from "react";

const App = () => {
  const [persons, setPersons] = useState([
    { name: "Arto Hellas", number: "040-123456" },
    { name: "Ada Lovelace", number: "39-44-5323523" },
    { name: "Dan Abramov", number: "12-43-234345" },
    { name: "Mary Poppendieck", number: "39-23-6423122" },
  ]);
  const [newName, setNewName] = useState("");
  const [newNumber, setNewNumber] = useState("");
  const [filter, setFilter] = useState("");

  const addNewPerson = (event) => {
    event.preventDefault();

    const existing = persons.filter((person) => person.name === newName);
    if (existing.length > 0) {
      alert(`${newName} is already added to the phonebook`);
      return;
    }

    setPersons([...persons, { name: newName, number: newNumber }]);
    setNewName("");
    setNewNumber("");
  };

  const nameChanged = (event) => {
    setNewName(event.target.value);
  };

  const numberChanged = (event) => {
    setNewNumber(event.target.value);
  };

  const filterChanged = (event) => {
    setFilter(event.target.value);
  };

  const personFilter = (person) => person.name.toLowerCase().includes(filter.toLowerCase());

  const filteredPersons =
    filter && filter.length > 0 ? persons.filter(personFilter) : persons;

  return (
    <div>
      <h2>Phonebook</h2>
      <div>
        filter shown with <input value={filter} onChange={filterChanged} />
      </div>
      <form onSubmit={addNewPerson}>
        <div>
          name: <input value={newName} onChange={nameChanged} />
        </div>
        <div>
          number: <input value={newNumber} onChange={numberChanged} />
        </div>
        <div>
          <button type="submit">add</button>
        </div>
      </form>
      <h2>Numbers</h2>
      <ul>
        {filteredPersons.map((person) => (
          <li key={person.name}>
            {person.name} | {person.number}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default App;
