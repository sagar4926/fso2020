import React from "react";
import Person from "./Person";

const Persons = ({ persons, filter }) => {
  const personFilter = (person) =>
    person.name.toLowerCase().includes(filter.toLowerCase());

  const filteredPersons =
    filter && filter.length > 0 ? persons.filter(personFilter) : persons;

  return (
    <ul>
      {filteredPersons.map((person) => (
        <Person key={person.name} person={person}></Person>
      ))}
    </ul>
  );
};

export default Persons;
