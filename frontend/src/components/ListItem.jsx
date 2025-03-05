import { use, useEffect, useState } from "react";
import { formatDate } from "../utils/utils";
import { ListContext } from "../store/list-context";
import IconButton from "./IconButton";

export default function ListItem({ item }) {
  const { handleDeleteTask, handleEditTask } = use(ListContext);
  const [checkValue, setCheckValue] = useState(false);

  useEffect(() => {
    setCheckValue(item.completed);
  }, [item.completed]);

  function handleCheckChange() {
    setCheckValue((prevCheckValue) => !prevCheckValue);
    handleEditTask(item.id);
  }

  function handleDeleteClick() {
    handleDeleteTask(item.id);
  }

  return (
    <li className="flex justify-between bg-white rounded-sm p-3 my-1">
      <div className="flex flex-row">
        <input
          type="checkbox"
          id={item.id}
          name={item.id}
          checked={checkValue}
          onChange={handleCheckChange}
        />
        <div className="flex flex-col ml-4">
          {item.completed ? (
            <span className="line-through text-stone-400">{item.text}</span>
          ) : (
            <span>{item.text}</span>
          )}
          {item.due !== "" && (
            <div className="flex flex-row gap-1">
              <svg
                className={`w-4 h-4 ${
                  new Date(item.due) < new Date()
                    ? "text-red-500"
                    : "text-stone-400"
                }`}
                aria-hidden="true"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
              >
                <path
                  stroke="currentColor"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M4 10h16m-8-3V4M7 7V4m10 3V4M5 20h14a1 1 0 0 0 1-1V7a1 1 0 0 0-1-1H5a1 1 0 0 0-1 1v12a1 1 0 0 0 1 1Zm3-7h.01v.01H8V13Zm4 0h.01v.01H12V13Zm4 0h.01v.01H16V13Zm-8 4h.01v.01H8V17Zm4 0h.01v.01H12V17Zm4 0h.01v.01H16V17Z"
                />
              </svg>
              <span
                className={`text-xs ${
                  new Date(item.due) < new Date()
                    ? "text-red-500"
                    : "text-stone-400"
                }`}
              >
                {formatDate(item.due)}
              </span>
            </div>
          )}
        </div>
      </div>

      <IconButton onClick={handleDeleteClick}>
        <svg
          className="w-4 h-4 text-red-500 hover:text-red-300"
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
            d="M5 7h14m-9 3v8m4-8v8M10 3h4a1 1 0 0 1 1 1v3H9V4a1 1 0 0 1 1-1ZM6 7h12v13a1 1 0 0 1-1 1H7a1 1 0 0 1-1-1V7Z"
          />
        </svg>
      </IconButton>
    </li>
  );
}
