const PersonForm = ({ personInfo, handlePersonInfo, handleAddPerson }) => {
  return (
    <div>
      <h2>add a new</h2>
      <form onSubmit={handleAddPerson}>
        <div>
          <label>name: </label>
          <input
            value={personInfo.name}
            name="name"
            onChange={handlePersonInfo}
          />
        </div>
        <div>
          <label>number: </label>
          <input
            value={personInfo.number}
            name="number"
            onChange={handlePersonInfo}
          />
        </div>
        <button>add</button>
      </form>
    </div>
  );
};

export default PersonForm;
