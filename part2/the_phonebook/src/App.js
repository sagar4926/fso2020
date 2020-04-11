import React, { useState, useEffect } from "react";
import Filter from "./Filter";
import Persons from "./Persons";
import PersonForm from "./PersonForm";
import api__persons from "./apis/api__persons";
import Notification from "./components/notification/Notification";

const App = () => {
  const [persons, setPersons] = useState([]);
  const [newPerson, setNewPerson] = useState({ name: "", number: "" });
  const [filter, setFilter] = useState("");
  const [notificationMessage, setNotificationMessage] = useState(undefined);

  useEffect(() => {
    api__persons.getAll().then((data) => setPersons(data));
  }, []);

  const filterChanged = (event) => {
    setFilter(event.target.value);
  };

  const showSuccessNotification = (message) => {
    setNotificationMessage(message);
    setTimeout(() => setNotificationMessage(undefined), 5000);
  };

  const onPersonCreated = (created) => {
    const existing = persons.filter((person) => person.name === created.name);

    if (existing.length > 0) {
      const shouldUpdate = window.confirm(
        `${created.name} is already added to the phonebook. do you want to replace the phone number?`
      );
      if (shouldUpdate) {
        const payload = { ...existing[0], number: created.number };
        api__persons.update(payload).then((data) => {
          setPersons(persons.map((p) => (p.id === payload.id ? payload : p)));
          showSuccessNotification(`${payload.name}'s phone number updated.`);
        });
      }
      return;
    }

    api__persons.create(created).then((data) => {
      setPersons(persons.concat(data));
      setNewPerson({ name: "", number: "" });
      showSuccessNotification(`${data.name} added.`);
    });
  };

  const onRemove = (person) => {
    const shouldDelete = window.confirm(`Should ${person.name} be deleted?`);
    if (shouldDelete) {
      api__persons.delete(person.id).then((res) => {
        setPersons(persons.filter((p) => p.id !== person.id));
        showSuccessNotification(`${person.name} deleted.`);
      });
    }
  };

  return (
    <div>
      <h2>Phonebook</h2>
      <Filter filter={filter} onChange={filterChanged}></Filter>
      <PersonForm
        person={newPerson}
        onPersonCreated={onPersonCreated}
      ></PersonForm>
      <Notification message={notificationMessage}></Notification>
      <h2>Numbers</h2>
      <Persons persons={persons} filter={filter} onRemove={onRemove}></Persons>
    </div>
  );
};

export default App;
