import { use, useState } from "react";
import MenuListItem from "./MenuListItem";
import Modal from "./Modal";
import { ListContext } from "../store/list-context";
import AddEditListModal from "./AddEditListModal";

export default function Sidebar() {
  const { lists } = use(ListContext);
  const [modalIsOpen, setModalIsOpen] = useState(false);

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
      <aside className="flex flex-col justify-between w-1/4 bg-slate-100 pt-10">
        <div className="flex flex-col gap-1">
          {lists.map((list) => (
            <MenuListItem key={list.id} item={list} />
          ))}
        </div>
        <button
          className="w-full text-left px-6 py-2 hover:bg-slate-200"
          onClick={handleClickNewList}
        >
          + New List
        </button>
      </aside>
    </>
  );
}
