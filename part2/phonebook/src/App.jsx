import { useState, useEffect } from "react";
import axios from "axios";
import Filter from "./components/Filter";
import PersonForm from "./components/PersonForm";
import Persons from "./components/Persons";
import personService from "./services/persons";

const App = () => {
  const [persons, setPersons] = useState([]);
  const [newName, setNewName] = useState("");
  const [newNumber, setNewNumber] = useState("");
  const [filter, setFilter] = useState("");

  useEffect(() => {
    personService.getAll().then(response => {
      setPersons(response.data);
    });
  }, []);

  const checkExistingPerson = name => {
    return persons.find(person => person.name === name);
  };

  const addPerson = async e => {
    e.preventDefault();
    const personObj = {
      name: newName,
      number: newNumber,
    };

    if (!checkExistingPerson(newName)) {
      try {
        const response = await personService.create(personObj);
        setPersons(persons.concat(response.data));
        setNewName("");
        setNewNumber("");
      } catch (error) {
        console.error("Error creating person:", error);
      }
    } else {
      const confirmed = window.confirm(
        `${newName} is already added to the phone book, replace the old number with a new one?`
      );

      if (confirmed) {
        try {
          const response = await personService.update(
            persons.find(p => p.name === newName).id,
            personObj
          );
          setPersons(
            persons.map(person =>
              person.id !== response.data.id ? person : response.data
            )
          );
          setNewName("");
          setNewNumber("");
        } catch (error) {
          console.error("Error updating person:", error);
        }
      }
    }
  };

  const deletePerson = (id, person) => {
    const confirmed = window.confirm(`Delete ${person.name}?`);
    if (confirmed) {
      personService
        .deleteInfo(id)
        .then(response => {
          setPersons(persons.filter(person => person.id !== id));
        })
        .catch(error => {
          console.error(error);
        });
    }
  };

  const handleNewPersonChange = e => {
    setNewName(e.target.value);
  };

  const handleNewNumberChange = e => {
    setNewNumber(e.target.value);
  };

  const handleFilterChange = e => {
    setFilter(e.target.value);
  };

  const filteredPersons = persons.filter(person =>
    person.name.toLowerCase().includes(filter.toLowerCase())
  );

  return (
    <div>
      <h2>Phonebook</h2>
      <Filter value={filter} handleFilterChange={handleFilterChange} />

      <h3>Add a new</h3>
      <PersonForm
        addPerson={addPerson}
        newName={newName}
        handleNewPersonChange={handleNewPersonChange}
        newNumber={newNumber}
        handleNewNumberChange={handleNewNumberChange}
      />

      <h3>Numbers</h3>

      <Persons filteredPersons={filteredPersons} deletePerson={deletePerson} />
    </div>
  );
};
export default App;
