const Person = ({ person, handleDeletePerson }) => {
  return (
    <div>
      {person.name} {person.number}{" "}
      <button onClick={() => handleDeletePerson(person)}>delete</button>
    </div>
  );
};

const Persons = ({ persons, handleDeletePerson }) => {
  return (
    <div>
      <h2>Numbers</h2>
      {persons.map((p) => {
        return (
          <Person
            key={p.id}
            person={p}
            handleDeletePerson={handleDeletePerson}
          />
        );
      })}
    </div>
  );
};

export default Persons;
