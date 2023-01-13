const Persons = ({ person, handleDeletePerson }) => {
  return (
    <tr>
      <td>
        {person.name} {person.number}{" "}
        <button onClick={() => handleDeletePerson(person.id)}>delete</button>
      </td>
    </tr>
  );
};

export default Persons;
