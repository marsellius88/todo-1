import { use, useState } from "react";
import { ListContext } from "../store/list-context";
import { bgColorMap } from "../utils/utils";
import ListItem from "./ListItem";
import Modal from "./Modal";
import AddEditListModal from "../components/AddEditListModal";
import NoListSelected from "../components/NoListSelected";

export default function ListDetail() {
  const { selectedList, inputTask, setInputTask, handleAddTask } =
    use(ListContext);
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [pickedDate, setPickedDate] = useState("");

  let containerClasses =
    "w-full h-screen flex flex-col p-5 relative overflow-hidden sm:p-10 md:flex-1";

  const bgColorClass =
    selectedList?.color && bgColorMap[selectedList.color]
      ? bgColorMap[selectedList.color]
      : "bg-blue-100";

  containerClasses = `${containerClasses} ${bgColorClass}`;

  function handleInputTaskChange(event) {
    setInputTask(event.target.value);
  }

  function handleEnterKeyDown(event) {
    if (event.key === "Enter") {
      event.preventDefault();
      if (inputTask !== "") {
        handleAddTask(pickedDate);
        setPickedDate("");
      } else {
        alert("Task must not be empty.");
      }
    }
  }

  function handleDateChange(event) {
    setPickedDate(event.target.value);
  }

  function handleModalClose() {
    setModalIsOpen(false);
  }

  function handleClickEditList() {
    setModalIsOpen(true);
  }

  return (
    <>
      <Modal open={modalIsOpen} onClose={handleModalClose}>
        <AddEditListModal
          onModalClose={handleModalClose}
          details={selectedList}
        />
      </Modal>
      <div className={containerClasses}>
        {selectedList === null ? (
          <NoListSelected />
        ) : (
          <>
            <div className="w-full text-white font-bold sticky top-5 sm:top-0 z-10">
              <div className="inline-flex flex-row gap-3 items-end justify-center mb-8">
                <button
                  type="button"
                  className="cursor-pointer flex flex-row gap-2 items-center hover:bg-black/10 rounded-sm px-2 py-1"
                  onClick={handleClickEditList}
                >
                  <span className="text-2xl">{selectedList.icon}</span>
                  <h1 className="text-3xl font-bold text-white">
                    {selectedList.title}
                  </h1>
                </button>
              </div>
            </div>

            <div className="flex-1 overflow-y-auto no-scrollbar">
              <ul>
                {selectedList.tasks?.length > 0 &&
                  selectedList.tasks
                    .filter((item) => !item.completed)
                    .map((item) => <ListItem key={item.id} item={item} />)}
              </ul>
              {selectedList.tasks?.length > 0 &&
                selectedList.tasks.filter((item) => item.completed).length !==
                  0 && (
                  <>
                    <span className="bg-white/80 rounded-sm px-3 py-1">
                      Completed (
                      {
                        selectedList.tasks.filter((item) => item.completed)
                          .length
                      }
                      )
                    </span>
                    <ul>
                      {selectedList.tasks
                        .filter((item) => item.completed)
                        .map((item) => (
                          <ListItem key={item.id} item={item} />
                        ))}
                    </ul>
                  </>
                )}
            </div>

            <div className="w-full flex sticky pt-2 bottom-0 z-10">
              <input
                type="text"
                id="task"
                name="task"
                placeholder="Add a Task"
                className="w-full bg-white px-6 py-2 rounded-sm"
                value={inputTask}
                onChange={handleInputTaskChange}
                onKeyDown={handleEnterKeyDown}
              />
              {inputTask.length > 0 && (
                <input
                  type="date"
                  id="date"
                  name="date"
                  className="absolute right-3 top-1/2 transform -translate-y-1/2"
                  value={pickedDate}
                  onChange={handleDateChange}
                />
              )}
            </div>
          </>
        )}
      </div>
    </>
  );
}
