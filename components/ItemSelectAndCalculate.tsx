const ItemSelectAndCalculate = ({ items, onCalculateBox }) => {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedItems, setSelectedItems] = useState([]);

  const handleSearchBlur = () => {
    // Logic to filter items based on searchTerm
    // Update a state that holds the search results
  };

  const handleSelectItem = (item) => {
    setSelectedItems([...selectedItems, item]);
  };

  return (
    <div>
      <input
        type="text"
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        onBlur={handleSearchBlur}
        placeholder="Search Items"
      />
      {/* Display search results with logic to select items */}
      {/* List of selected items */}
      <button onClick={() => onCalculateBox(selectedItems)}>
        Calculate Box
      </button>
    </div>
  );
};
