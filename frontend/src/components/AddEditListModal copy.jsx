import { useActionState, use } from "react";
import { ListContext } from "../store/list-context";

export default function AddEditListModal({ onModalClose, details }) {
  const { handleAddList } = use(ListContext);

  function addListAction(prevAddListFormState, formData) {
    const title = formData.get("title");
    const icon = formData.get("icon");
    const color = formData.get("color");

    let errors = [];

    if (title.trim().length === 0) {
      errors.push("Please add a title.");
    }
    if (icon.trim().length === 0) {
      errors.push("Please choose an icon.");
    }
    if (color.trim().length === 0) {
      errors.push("Please choose a color.");
    }

    if (errors.length > 0) {
      return {
        errors,
        enteredValues: {
          title,
          icon,
          color,
        },
      };
    }

    handleAddList({
      title,
      icon,
      color,
    });

    onModalClose();

    return { errors: null };
  }

  const [addListFormState, addListFormAction, pending] = useActionState(
    addListAction,
    { errors: null }
  );

  return (
    <form action={addListFormAction}>
      <h2 className="text-2xl bold mb-3">
        {details ? "Edit List" : "Add New List"}
      </h2>
      <div className="mb-4">
        <label className="block mb-1" htmlFor="title">
          Title<span className="text-red-600">*</span>
        </label>
        <input
          className="block w-full rounded-sm p-2 bg-slate-200 border-1"
          id="title"
          type="text"
          name="title"
          defaultValue={addListFormState.enteredValues?.title}
        />
      </div>
      <div className="mb-4">
        <label className="block mb-1" htmlFor="icon">
          Icon<span className="text-red-600">*</span>
        </label>
        <select
          className="block w-full rounded-sm p-2 bg-slate-200 border-1"
          id="icon"
          name="icon"
          defaultValue={addListFormState.enteredValues?.icon}
        >
          {/* <option value="" hidden>
                Select an icon...
              </option> */}
          <option value="⭐">⭐</option>
          <option value="☀">☀</option>
          <option value="🌙">🌙</option>
        </select>
      </div>
      <div className="mb-4">
        <label className="block mb-1" htmlFor="color">
          Color<span className="text-red-600">*</span>
        </label>
        <select
          className="block w-full rounded-sm p-2 bg-slate-200 border-1"
          id="color"
          name="color"
          defaultValue={addListFormState.enteredValues?.color}
        >
          {/* <option value="" hidden>
                Select a color...
              </option> */}
          <option value="red">Red</option>
          <option value="blue">Blue</option>
          <option value="green">Green</option>
          <option value="yellow">Yellow</option>
        </select>
      </div>

      {addListFormState.errors && (
        <ul className="bg-red-50 p-2 mb-4 border border-red-300">
          {addListFormState.errors.map((error) => (
            <li className="text-[0.8rem]" key={error}>
              {error}
            </li>
          ))}
        </ul>
      )}

      <p className="flex justify-end gap-4">
        <button
          className="px-4 py-2 cursor-pointer bg-transparent text-stone-800 hover:text-stone-500"
          type="reset"
          onClick={onModalClose}
        >
          Close
        </button>
        <button className="px-4 py-2 border-none rounded-sm bg-blue-400 cursor-pointer text-white hover:bg-blue-300">
          Save
        </button>
      </p>
    </form>
  );
}
