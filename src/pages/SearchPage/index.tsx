import SearchBox from './components/SearchBox';

const SearchPage = () => {
  return (
    <div className="bg-white">
      <div className="shadow-general">
        <div className="mx-auto max-w-6xl py-12">
          <SearchBox />
        </div>
      </div>
      <div className="mx-auto max-w-6xl"></div>
    </div>
  );
};

export default SearchPage;
