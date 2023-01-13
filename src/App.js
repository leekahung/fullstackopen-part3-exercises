import { useState, useEffect } from "react";
import numberService from "./services/persons";
import Persons from "./components/Persons";
import PersonForm from "./components/PersonForm";
import Filter from "./components/Filter";
import Notification from "./components/Notification";

const App = () => {
  const initialPerson = {
    name: "",
    number: "",
  };

  const initialNotification = {
    message: "",
    error: false,
  };

  const [persons, setPersons] = useState([]);
  const [personInfo, setPersonInfo] = useState(initialPerson);
  const [query, setQuery] = useState("");
  const [notification, setNotification] = useState(initialNotification);

  useEffect(() => {
    numberService.getAll().then((allPersons) => {
      setPersons(allPersons);
    });
  }, []);

  const handleQuery = (event) => {
    setQuery(event.target.value);
  };

  const handlePersonInfo = (event) => {
    setPersonInfo({
      ...personInfo,
      [event.target.name]: event.target.value,
    });
  };

  const handleAddPerson = (event) => {
    event.preventDefault();
    numberService.createNew(personInfo).then((newPerson) => {
      setPersons(persons.concat(newPerson));
      runNotification(`Added ${newPerson.name} to phonebook`, 5000);
      setPersonInfo(initialPerson);
    });
  };

  const handleDeletePerson = (person) => {
    const id = person.id;
    numberService
      .removeObject(person.id)
      .then(() => {
        runNotification(
          `${person.name} has been removed from phonebook.`,
          5000
        );
        setPersons(persons.filter((p) => p.id !== id));
      })
      .catch((_error) => {
        runNotification(
          `Information of ${person.name} has already been removed from server.`,
          5000,
          true
        );
        setPersons(persons.filter((p) => p.id !== id));
      });
  };

  const runNotification = (message, time, error = false) => {
    setNotification({ message, error });
    setTimeout(() => {
      setNotification(initialNotification);
    }, time);
  };

  const personsFiltered =
    query !== ""
      ? persons.filter((p) =>
          p.name.toLowerCase().includes(query.toLowerCase())
        )
      : persons;

  return (
    <div className="App">
      <h2>Phonebook</h2>
      <Notification notification={notification} />
      <Filter query={query} handleQuery={handleQuery} />
      <PersonForm
        personInfo={personInfo}
        handlePersonInfo={handlePersonInfo}
        handleAddPerson={handleAddPerson}
      />
      <Persons
        persons={personsFiltered}
        handleDeletePerson={handleDeletePerson}
      />
    </div>
  );
};

export default App;
