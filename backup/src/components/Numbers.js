import Person from "./Person";

const Numbers = ({ persons, query, handleDeletePerson }) => {
  return (
    <table>
      <tbody>
        {persons.map((person) => {
          return person.name.toLowerCase().includes(query.toLowerCase()) ? (
            <Person
              key={person.id}
              person={person}
              handleDeletePerson={handleDeletePerson}
            />
          ) : null;
        })}
      </tbody>
    </table>
  );
};

export default Numbers;
