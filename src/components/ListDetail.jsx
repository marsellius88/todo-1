import { use, useState } from "react";
import { ListContext } from "../store/list-context";
import { bgColorMap } from "../utils/utils";
import ListItem from "./ListItem";
import Modal from "./Modal";
import AddEditListModal from "../components/AddEditListModal";
import IconButton from "../components/IconButton";
import NoListSelected from "../components/NoListSelected";

export default function ListDetail() {
  const { selectedList, inputTask, setInputTask, handleAddTask } =
    use(ListContext);
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [pickedDate, setPickedDate] = useState("");

  let containerClasses = "w-3/4 p-10 flex flex-col justify-between";

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
            <div>
              <div className="inline-flex flex-row gap-3 items-end justify-center mb-8">
                {/* <span className="text-xl">{selectedList.icon}</span> */}
                <h1 className="text-3xl font-bold text-white">
                  {selectedList.title}
                </h1>
                <IconButton onClick={handleClickEditList}>
                  <svg
                    className="w-6 h-6 text-white hover:text-slate-200"
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
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="m14.304 4.844 2.852 2.852M7 7H4a1 1 0 0 0-1 1v10a1 1 0 0 0 1 1h11a1 1 0 0 0 1-1v-4.5m2.409-9.91a2.017 2.017 0 0 1 0 2.853l-6.844 6.844L8 14l.713-3.565 6.844-6.844a2.015 2.015 0 0 1 2.852 0Z"
                    />
                  </svg>
                </IconButton>
              </div>
              <div className="flex flex-col gap-2">
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
            </div>
            <div className="relative w-full">
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
