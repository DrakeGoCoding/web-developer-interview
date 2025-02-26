import AppBanner from './components/ui/AppBanner';
import SearchPage from './pages/SearchPage';

function App() {
  return (
    <>
      <AppBanner />
      <main className="">
        <SearchPage />
      </main>
    </>
  );
}

export default App;
