const Filter = ({query, handleQuery}) => {
  return (
    <form>
      <div>
        filter shown with{" "}
        <input type="search" value={query} onChange={handleQuery} />
      </div>
    </form>
  );
};

export default Filter;
