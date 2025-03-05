import { createContext, useEffect, useState } from "react";
import { generateListId, generateTaskId } from "../utils/utils";
import { addList, deleteList, editList, fetchExistingLists } from "../http";

export const ListContext = createContext({
  lists: [],
  selectedList: {},
  inputTask: "",
  setInputTask: () => {},
  handleSelectList: (id) => {},
  handleAddList: (enteredDetails) => {},
  handleEditList: (updatedDetails) => {},
  handleDeleteList: () => {},
  handleAddTask: (pickedDate) => {},
  handleEditTask: (taskId) => {},
  handleDeleteTask: (taskId) => {},
});

export default function ListContextProvider({ children }) {
  const [lists, setLists] = useState([]);
  const [selectedList, setSelectedList] = useState(null);
  const [inputTask, setInputTask] = useState("");

  useEffect(() => {
    async function fetchLists() {
      try {
        const existingLists = await fetchExistingLists();
        setLists(existingLists);
      } catch (error) {
        console.log("An error occured.");
      }
    }

    fetchLists();
  }, []);

  function handleSelectList(id) {
    setSelectedList(lists.find((item) => item.id === id));
    setInputTask("");
  }

  async function handleAddList(enteredDetails) {
    const newList = {
      id: generateListId(),
      icon: enteredDetails.icon,
      color: enteredDetails.color,
      title: enteredDetails.title,
      tasks: [],
    };
    await addList(newList);
    setLists((prevLists) => [...prevLists, newList]);
  }

  async function handleEditList(updatedDetails) {
    await editList(updatedDetails, selectedList.id);
    setSelectedList((prevSelectedList) => {
      return {
        ...prevSelectedList,
        ...updatedDetails,
      };
    });
    setLists((prevLists) =>
      prevLists.map((list) =>
        list.id === selectedList.id ? { ...list, ...updatedDetails } : list
      )
    );
  }

  async function handleDeleteList() {
    await deleteList(selectedList.id);
    setLists((prevLists) =>
      prevLists.filter((list) => list.id !== selectedList.id)
    );
    setSelectedList(null);
  }

  function handleAddTask(pickedDate) {
    const due = pickedDate === "" ? "" : new Date(pickedDate);
    const newTask = {
      id: generateTaskId(selectedList.id),
      text: inputTask,
      due: due,
      completed: false,
    };

    setSelectedList((prevSelectedList) => {
      return {
        ...prevSelectedList,
        tasks: [...prevSelectedList.tasks, newTask],
      };
    });
    setLists((prevLists) =>
      prevLists.map((list) =>
        list.id === selectedList.id
          ? {
              ...list,
              tasks: [...list.tasks, newTask],
            }
          : list
      )
    );
    setInputTask("");
  }

  function handleEditTask(taskId) {
    setSelectedList((prevSelectedList) => {
      return {
        ...prevSelectedList,
        tasks: prevSelectedList.tasks.map((task) =>
          task.id === taskId ? { ...task, completed: !task.completed } : task
        ),
      };
    });

    setLists((prevLists) =>
      prevLists.map((list) =>
        list.id === selectedList.id
          ? {
              ...list,
              tasks: list.tasks.map((task) =>
                task.id === taskId
                  ? { ...task, completed: !task.completed }
                  : task
              ),
            }
          : list
      )
    );
  }

  function handleDeleteTask(taskId) {
    setSelectedList((prevSelectedList) => {
      return {
        ...prevSelectedList,
        tasks: prevSelectedList.tasks.filter((task) => task.id !== taskId),
      };
    });
    setLists((prevLists) =>
      prevLists.map((list) =>
        list.id === selectedList.id
          ? { ...list, tasks: list.tasks.filter((task) => task.id !== taskId) }
          : list
      )
    );
  }

  const contextValue = {
    lists: lists,
    selectedList: selectedList,
    inputTask: inputTask,
    setInputTask: setInputTask,
    handleSelectList,
    handleAddList,
    handleEditList,
    handleDeleteList,
    handleAddTask,
    handleEditTask,
    handleDeleteTask,
  };
  return <ListContext value={contextValue}>{children}</ListContext>;
}
