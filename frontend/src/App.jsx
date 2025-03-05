import Sidebar from "./components/Sidebar";
import ListDetail from "./components/ListDetail";
import ListContextProvider, { ListContext } from "./store/list-context";

function App() {
  return (
    <ListContextProvider>
      <main className="h-screen flex">
        <Sidebar />
        <ListDetail />
      </main>
    </ListContextProvider>
  );
}

export default App;
