import Sidebar from "./components/Sidebar";
import ListDetail from "./components/ListDetail";
import ListContextProvider from "./store/list-context";
import { useState } from "react";
import IconButton from "./components/IconButton";

function App() {
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);

  function toggleDrawer() {
    setIsDrawerOpen((prevIsDrawerOpen) => !prevIsDrawerOpen);
  }

  return (
    <ListContextProvider>
      <main className="h-screen flex">
        <Sidebar isDrawerOpen={isDrawerOpen} toggleDrawer={toggleDrawer} />
        <ListDetail />
        <IconButton
          onClick={toggleDrawer}
          className="md:hidden fixed top-2 left-5 sm:left-10 z-48 cursor-pointer"
        >
          <svg
            className="w-8 h-8 text-white"
            aria-hidden="true"
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            fill="none"
            viewBox="0 0 24 24"
          >
            <path
              stroke="currentColor"
              strokeLinecap="round"
              strokeWidth="2"
              d="M5 7h14M5 12h14M5 17h14"
            />
          </svg>
        </IconButton>
      </main>
    </ListContextProvider>
  );
}

export default App;
