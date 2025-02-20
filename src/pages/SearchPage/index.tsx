import SearchBox from './components/SearchBox';

const SearchPage = () => {
  const handleSearch = (text: string) => {
    console.log(text);
  };

  return (
    <div className="bg-white">
      <div className="shadow-general">
        <div className="mx-auto max-w-6xl py-12">
          <SearchBox onSearch={handleSearch} />
        </div>
      </div>
      <div className="mx-auto max-w-6xl"></div>
    </div>
  );
};

export default SearchPage;
