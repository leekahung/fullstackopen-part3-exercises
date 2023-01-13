const Filter = ({ query, handleQuery }) => {
  return (
    <div>
      filter <input value={query} onChange={handleQuery} />
    </div>
  );
};

export default Filter;
