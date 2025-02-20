import AppBanner from './components/ui/AppBanner';
import SearchPage from './pages/SearchPage';

function App() {
  return (
    <>
      <AppBanner />
      <div className="">
        <SearchPage />
      </div>
    </>
  );
}

export default App;
