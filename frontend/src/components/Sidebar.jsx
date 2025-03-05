// import { use, useState } from "react";
// import MenuListItem from "./MenuListItem";
// import Modal from "./Modal";
// import { ListContext } from "../store/list-context";
// import AddEditListModal from "./AddEditListModal";
// import SearchBar from "./SearchBar";

// export default function Sidebar() {
//   const { lists } = use(ListContext);
//   const [filteredLists, setFilteredLists] = useState([]);
//   const [modalIsOpen, setModalIsOpen] = useState(false);
//   const [inputValue, setInputValue] = useState("");

//   function handleSearch(keyword) {
//     setFilteredLists(
//       lists.filter((list) =>
//         list.title.toLowerCase().includes(keyword.toLowerCase())
//       )
//     );
//   }

//   function handleModalClose() {
//     setModalIsOpen(false);
//   }

//   function handleClickNewList() {
//     setModalIsOpen(true);
//   }

//   return (
//     <>
//       <Modal open={modalIsOpen} onClose={handleModalClose}>
//         <AddEditListModal onModalClose={handleModalClose} />
//       </Modal>
//       <aside className="flex-col justify-between hidden bg-slate-100 pt-10 md:flex md:w-70">
//         <div className="flex flex-col gap-1">
//           <SearchBar
//             onSearch={handleSearch}
//             inputValue={inputValue}
//             setInputValue={setInputValue}
//           />
//           {filteredLists.length === 0 ? (
//             inputValue !== "" ? (
//               <div className="px-3">
//                 <p>Couldn't find what you're looking for.</p>
//               </div>
//             ) : (
//               lists.map((list) => <MenuListItem key={list.id} item={list} />)
//             )
//           ) : (
//             filteredLists.map((list) => (
//               <MenuListItem key={list.id} item={list} />
//             ))
//           )}
//         </div>
//         <button
//           className="w-full text-left px-6 py-2 hover:bg-slate-200"
//           onClick={handleClickNewList}
//         >
//           + New List
//         </button>
//       </aside>
//     </>
//   );
// }

import { useState, use } from "react";
import MenuListItem from "./MenuListItem";
import Modal from "./Modal";
import { ListContext } from "../store/list-context";
import AddEditListModal from "./AddEditListModal";
import SearchBar from "./SearchBar";
import IconButton from "./IconButton";

export default function Sidebar({ isDrawerOpen, toggleDrawer }) {
  const { lists } = use(ListContext);
  const [filteredLists, setFilteredLists] = useState([]);
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [inputValue, setInputValue] = useState("");

  function handleSearch(keyword) {
    setFilteredLists(
      lists.filter((list) =>
        list.title.toLowerCase().includes(keyword.toLowerCase())
      )
    );
  }

  function handleModalClose() {
    setModalIsOpen(false);
  }

  function handleClickNewList() {
    setModalIsOpen(true);
  }

  return (
    <>
      <Modal open={modalIsOpen} onClose={handleModalClose}>
        <AddEditListModal onModalClose={handleModalClose} />
      </Modal>
      <aside
        className={`fixed z-50 w-70 inset-y-0 left-0 bg-slate-100 transform transition-transform md:translate-x-0 ${
          isDrawerOpen ? "translate-x-0" : "-translate-x-full"
        } md:relative md:w-70 md:flex md:flex-col md:pt-10 shadow-lg md:shadow-none h-full`}
      >
        <IconButton
          onClick={toggleDrawer}
          className="md:hidden self-end py-2 pl-3 cursor-pointer"
        >
          <svg
            className="w-8 h-8 text-stone-600"
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
        <div className="flex flex-col gap-1 flex-grow overflow-y-auto">
          <SearchBar
            onSearch={handleSearch}
            inputValue={inputValue}
            setInputValue={setInputValue}
          />
          {filteredLists.length === 0 ? (
            inputValue !== "" ? (
              <div className="px-4">
                <p>Couldn't find what you're looking for.</p>
              </div>
            ) : (
              lists.map((list) => <MenuListItem key={list.id} item={list} />)
            )
          ) : (
            filteredLists.map((list) => (
              <MenuListItem key={list.id} item={list} />
            ))
          )}
        </div>
        <button
          className="w-full text-left px-6 py-2 hover:bg-slate-200"
          onClick={handleClickNewList}
        >
          + New List
        </button>
      </aside>
      {isDrawerOpen && (
        <div
          className="fixed inset-0 z-49 bg-black opacity-50 md:hidden"
          onClick={toggleDrawer}
        ></div>
      )}
    </>
  );
}
