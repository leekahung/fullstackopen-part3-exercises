const PersonsForm = ({
  handleAddPerson,
  newPerson,
  handleNewPerson,
  newNumber,
  handleNewNumber,
}) => {
  return (
    <form onSubmit={handleAddPerson}>
      <div>
        name: <input value={newPerson} onChange={handleNewPerson} />
      </div>
      <div>
        number <input value={newNumber} onChange={handleNewNumber} />
      </div>
      <button>add</button>
    </form>
  );
};

export default PersonsForm;
