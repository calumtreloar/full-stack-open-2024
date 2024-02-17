const Filter = props => {
  return (
    <div>
      filter shown with{" "}
      <input
        type="text"
        value={props.filter}
        onChange={props.handleFilterChange}
      />
    </div>
  );
};

export default Filter;
