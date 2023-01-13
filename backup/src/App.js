import { useEffect, useState } from "react";
import Notification from "./components/Notification";
import Filter from "./components/Filter";
import Numbers from "./components/Numbers";
import PersonsForm from "./components/PersonsForm";
import personServices from "./services/persons";

const App = () => {
  const [persons, setPersons] = useState([]);
  const [query, setQuery] = useState("");
  const [newPerson, setNewPerson] = useState("");
  const [newNumber, setNewNumber] = useState("");
  const [notification, setNotification] = useState("");

  useEffect(() => {
    personServices.getAll().then((returnedPersons) => {
      setPersons(returnedPersons);
    });
  }, []);

  const handleQuery = (event) => {
    setQuery(event.target.value);
  };

  const handleNewPerson = (event) => {
    setNewPerson(event.target.value);
  };

  const handleNewNumber = (event) => {
    setNewNumber(event.target.value);
  };

  const notificationTimeout = () => {
    setTimeout(() => {
      setNotification("");
    }, 5000);
  };

  const handleAddPerson = (event) => {
    event.preventDefault();
    const personObject = {
      name: newPerson,
      number: newNumber,
    };

    if (persons.find((p) => p.name === newPerson) !== undefined) {
      if (
        window.confirm(
          `${newPerson} already exist in phonebook. Do you want to update the number?`
        )
      ) {
        const person = persons.find((p) => p.name === newPerson);
        const updatePerson = {
          ...person,
          number: newNumber,
        };

        personServices
          .update(person.id, updatePerson)
          .then((updatedPerson) => {
            setPersons(
              persons.map((p) => (p.name !== newPerson ? p : updatedPerson))
            );
            setNewPerson("");
            setNewNumber("");
            setNotification(`${newPerson} updated`);
            notificationTimeout();
          })
          .catch((error) => {
            if (error.response.data.error.includes("Validation failed")) {
              setNotification(error.response.data.error);
              notificationTimeout();
            } else {
              setNotification(
                `Information of ${newPerson} has already been removed from server`
              );
              notificationTimeout();
              setPersons(persons.filter((n) => n.name !== updatePerson.name));
            }
          });
      }
    } else {
      personServices
        .create(personObject)
        .then((newPersonObject) => {
          setPersons(persons.concat(newPersonObject));
          setNewPerson("");
          setNewNumber("");
          setNotification(`${newPerson} added`);
          notificationTimeout();
        })
        .catch((error) => {
          console.log(error.response.data);
          setNotification(error.response.data.error);
          notificationTimeout();
        });
    }
  };

  const handleDeletePerson = (id) => {
    const person = persons.find((p) => p.id === id);
    if (window.confirm(`Delete ${person.name} ?`)) {
      personServices.remove(id).then(() => {
        setPersons(persons.filter((p) => p.id !== id));
        setNotification(`${person.name} removed`);
        notificationTimeout();
      });
    }
  };

  return (
    <div className="App">
      <h1>Phonebook</h1>
      <Notification notification={notification} />
      <Filter query={query} handleQuery={handleQuery} />
      <h1>add a new</h1>
      <PersonsForm
        handleAddPerson={handleAddPerson}
        newPerson={newPerson}
        handleNewPerson={handleNewPerson}
        newNumber={newNumber}
        handleNewNumber={handleNewNumber}
      />
      <h1>Numbers</h1>
      <Numbers
        persons={persons}
        query={query}
        handleDeletePerson={handleDeletePerson}
      />
    </div>
  );
};

export default App;
