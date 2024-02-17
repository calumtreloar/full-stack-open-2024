const PersonForm = ({
  addPerson,
  newName,
  handleNewPersonChange,
  newNumber,
  handleNewNumberChange,
}) => {
  return (
    <form onSubmit={addPerson}>
      <div>
        name: <input value={newName} onChange={handleNewPersonChange} />
      </div>
      <div>
        number:{" "}
        <input type="tel" value={newNumber} onChange={handleNewNumberChange} />
      </div>
      <div>
        <button type="submit">add</button>
      </div>
    </form>
  );
};

export default PersonForm;
