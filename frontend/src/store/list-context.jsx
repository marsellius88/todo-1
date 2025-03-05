import { createContext, useEffect, useState } from "react";
import {
  addList,
  addTask,
  deleteList,
  deleteTask,
  editList,
  editTask,
  fetchExistingLists,
} from "../http";

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

// const initialSelectedList =
//   JSON.parse(localStorage.getItem("selectedList")) || null;

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
    const selectedList = lists.find((item) => item.id === id);
    setSelectedList(selectedList);
    // localStorage.setItem("selectedList", JSON.stringify(selectedList));
    setInputTask("");
  }

  async function handleAddList(enteredDetails) {
    const newList = await addList({
      icon: enteredDetails.icon,
      color: enteredDetails.color,
      title: enteredDetails.title,
      tasks: [],
    });
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
    // localStorage.setItem("selectedList", null);
  }

  async function handleAddTask(pickedDate) {
    const due = pickedDate === "" ? "" : new Date(pickedDate);
    const newTask = await addTask(
      {
        text: inputTask,
        due: due,
        completed: false,
      },
      selectedList.id
    );

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

  async function handleEditTask(taskId) {
    await editTask(selectedList.id, taskId);
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

  async function handleDeleteTask(taskId) {
    await deleteTask(selectedList.id, taskId);
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
