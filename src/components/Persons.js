const Persons = ({ persons, query, handleDeletePerson }) => {
  return (
    <ul>
      {persons.map((person) => {
        return person.name.toLowerCase().includes(query.toLowerCase()) ? (
          <li key={person.id}>
            {person.name} {person.number}{" "}
            <button onClick={() => handleDeletePerson(person.id)}>
              delete
            </button>
          </li>
        ) : null;
      })}
    </ul>
  );
};

export default Persons;
