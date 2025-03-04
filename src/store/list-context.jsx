import { createContext, useState } from "react";
import { generateListId, generateTaskId } from "../utils/utils";

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
  const [lists, setLists] = useState([
    {
      id: "l1",
      icon: "🏗️",
      color: "red",
      title: "Important",
      tasks: [
        { id: "l1t1", text: "Buy milk", due: "", completed: false },
        { id: "l1t2", text: "Do homework", due: "", completed: false },
      ],
    },
    {
      id: "l2",
      icon: "☕",
      color: "blue",
      title: "My Day",
      tasks: [
        {
          id: "l2t1",
          text: "Go to store",
          due: new Date(2025, 2, 9),
          completed: true,
        },
        { id: "l2t2", text: "Make something", due: "", completed: true },
        {
          id: "l2t3",
          text: "Tes",
          due: new Date(2025, 2, 9),
          completed: false,
        },
      ],
    },
  ]);
  const [selectedList, setSelectedList] = useState(null);
  const [inputTask, setInputTask] = useState("");

  function handleSelectList(id) {
    setSelectedList(lists.find((item) => item.id === id));
    setInputTask("");
  }

  function handleAddList(enteredDetails) {
    setLists((prevLists) => [
      {
        id: generateListId(),
        icon: enteredDetails.icon,
        color: enteredDetails.color,
        title: enteredDetails.title,
        tasks: [],
      },
      ...prevLists,
    ]);
  }

  function handleEditList(updatedDetails) {
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

  function handleDeleteList() {
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
