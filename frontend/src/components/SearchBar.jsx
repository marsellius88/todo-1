export default function SearchBar({ onSearch, inputValue, setInputValue }) {

  function handleInputValueChange(event) {
    setInputValue(event.target.value);
    onSearch(event.target.value);
  }

  return (
    <div className="px-4 pb-5">
      <input
        type="text"
        id="search"
        name="search"
        placeholder="Search"
        className="w-full bg-white flex p-1 border border-stone-300 rounded-sm"
        value={inputValue}
        onChange={handleInputValueChange}
      />
    </div>
  );
}
