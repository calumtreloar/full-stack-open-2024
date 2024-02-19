import { useState, useEffect } from "react";
import axios from "axios";
import Filter from "./components/Filter";
import PersonForm from "./components/PersonForm";
import Persons from "./components/Persons";
import personService from "./services/persons";
import Notification from "./components/Notification";
import Error from "./components/Error";

const App = () => {
  const [persons, setPersons] = useState([]);
  const [newName, setNewName] = useState("");
  const [newNumber, setNewNumber] = useState("");
  const [filter, setFilter] = useState("");
  const [successMessage, setSuccessMessage] = useState(null);
  const [errorMessage, setErrorMessage] = useState(null);

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
        setSuccessMessage(`Added ${newName}`);
        setTimeout(() => setSuccessMessage(null), 3000);
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
            persons.find(p => p.name === newName)?.id,
            personObj
          );

          // Check if the person still exists in the updated persons array
          const updatedPersons = persons.map(person =>
            person.id !== response.data.id ? person : response.data
          );

          if (updatedPersons.find(p => p.name === newName)) {
            setPersons(updatedPersons);
            setSuccessMessage(`Added ${newName}`);
            setTimeout(() => setSuccessMessage(null), 3000);
          }

          setNewName("");
          setNewNumber("");
        } catch (error) {
          console.error("Error updating person:", error);
          setErrorMessage(
            `Information of ${newName} has already been removed from the server`
          );
          setTimeout(() => setErrorMessage(null), 3000);
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
      <Notification message={successMessage} />
      <Error message={errorMessage} />
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
