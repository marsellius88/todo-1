import { useActionState, use, useState, useEffect } from "react";
import { ListContext } from "../store/list-context";
import Button from "./Button";
import TextButton from "./TextButton";
import Modal from "./Modal";

export default function AddEditListModal({ onModalClose, details }) {
  const [confirmModalIsOpen, setConfirmModalIsOpen] = useState(false);
  const [enteredValues, setEnteredValues] = useState({
    title: "",
    icon: "",
    color: "",
  });
  const [errors, setErrors] = useState({
    titleError: null,
    iconError: null,
    colorError: null,
  });
  const { handleAddList, handleEditList, handleDeleteList } = use(ListContext);

  useEffect(() => {
    if (details) {
      setEnteredValues(details);
    }
  }, [details]);

  function resetModal() {
    setEnteredValues({ title: "", icon: "", color: "" });
    setErrors({
      titleError: null,
      iconError: null,
      colorError: null,
    });
  }

  function handleTitleChange(event) {
    setEnteredValues((prevEnteredValues) => ({
      ...prevEnteredValues,
      title: event.target.value,
    }));
    if (event.target.value.length > 3) {
      setErrors((prevErrors) => ({
        ...prevErrors,
        titleError: null,
      }));
    }
  }

  function handleIconChange(event) {
    setEnteredValues((prevEnteredValues) => ({
      ...prevEnteredValues,
      icon: event.target.value,
    }));
    setErrors((prevErrors) => ({
      ...prevErrors,
      iconError: null,
    }));
  }

  function handleColorChange(event) {
    setEnteredValues((prevEnteredValues) => ({
      ...prevEnteredValues,
      color: event.target.value,
    }));
    setErrors((prevErrors) => ({
      ...prevErrors,
      colorError: null,
    }));
  }

  function handleSubmitAddEditList(event) {
    event.preventDefault();

    let valid = true;

    if (enteredValues.title.trim().length === 0) {
      setErrors((prevErrors) => ({
        ...prevErrors,
        titleError: "Please add a title.",
      }));
      valid = false;
    }

    if (enteredValues.icon.trim().length === 0) {
      setErrors((prevErrors) => ({
        ...prevErrors,
        iconError: "Please select an icon.",
      }));
      valid = false;
    }

    if (enteredValues.color.trim().length === 0) {
      setErrors((prevErrors) => ({
        ...prevErrors,
        colorError: "Please select a color.",
      }));
      valid = false;
    }

    if (valid) {
      if (details) {
        handleEditList(enteredValues);
      } else {
        handleAddList(enteredValues);
      }

      onModalClose();
      resetModal();
    }
  }

  function handleCloseModalClick() {
    if (!details) {
      resetModal();
    }
    onModalClose();
  }

  function handleDeleteListClick() {
    onModalClose();
    setConfirmModalIsOpen(true);
    setEnteredValues(details);
  }

  function handleDeleteListConfirmationClick() {
    handleDeleteList();
    handleModalClose();
  }

  function handleModalClose() {
    setConfirmModalIsOpen(false);
  }

  return (
    <>
      <Modal open={confirmModalIsOpen} onClose={handleModalClose}>
        <h2 className="text-xl bold mb-3">Delete List</h2>
        <p>This list will be permenantly deleted.</p>
        <p className="flex justify-end gap-4">
          <TextButton type="button" onClick={handleModalClose}>
            Cancel
          </TextButton>
          <button
            type="button"
            className="px-4 py-2 border-none rounded-sm bg-red-500 cursor-pointer text-white hover:bg-red-300"
            onClick={handleDeleteListConfirmationClick}
          >
            Delete
          </button>
        </p>
      </Modal>
      <form onSubmit={handleSubmitAddEditList}>
        {details ? (
          <div className="flex flex-row gap-3 justify-between mb-3">
            <h2 className="text-2xl bold">Edit List</h2>
            <button
              type="button"
              className="px-3 py-0.25 border-none rounded-sm bg-red-500 cursor-pointer text-white hover:bg-red-300"
              onClick={handleDeleteListClick}
            >
              Delete
            </button>
          </div>
        ) : (
          <h2 className="text-2xl bold mb-3">Add New List</h2>
        )}

        <div className="mb-4">
          <label className="block mb-1" htmlFor="title">
            Title<span className="text-red-600">*</span>
          </label>
          <input
            className="block w-full rounded-sm p-2 bg-slate-200 border-1"
            id="title"
            type="text"
            name="title"
            value={enteredValues.title}
            onChange={handleTitleChange}
          />
          {errors.titleError && (
            <p className="text-red-600">{errors.titleError}</p>
          )}
        </div>
        <div className="mb-4">
          <label className="block mb-1" htmlFor="icon">
            Icon<span className="text-red-600">*</span>
          </label>
          <select
            className="block w-full rounded-sm p-2 bg-slate-200 border-1"
            id="icon"
            name="icon"
            value={enteredValues.icon}
            onChange={handleIconChange}
          >
            <option value="" hidden>
              Select an icon...
            </option>
            <option value="🏗️">🏗️</option>
            <option value="🏢">🏢</option>
            <option value="🔧">🔧</option>
            <option value="🖥️">🖥️</option>
            <option value="📞">📞</option>
            <option value="🍿">🍿</option>
            <option value="☕">☕</option>
            <option value="🍷">🍷</option>
            <option value="🍕">🍕</option>
            <option value="🍞">🍞</option>
            <option value="🍌">🍌</option>
            <option value="🎬">🎬</option>
            <option value="📷">📷</option>
            <option value="🔍">🔍</option>
          </select>
          {errors.iconError && (
            <p className="text-red-600">{errors.iconError}</p>
          )}
        </div>
        <div className="mb-4">
          <label className="block mb-1" htmlFor="color">
            Color<span className="text-red-600">*</span>
          </label>
          <select
            className="block w-full rounded-sm p-2 bg-slate-200 border-1"
            id="color"
            name="color"
            value={enteredValues.color}
            onChange={handleColorChange}
          >
            <option value="" hidden>
              Select a color...
            </option>
            <option value="red">Red</option>
            <option value="blue">Blue</option>
            <option value="green">Green</option>
            <option value="yellow">Yellow</option>
            <option value="purple">Purple</option>
            <option value="amber">Amber</option>
            <option value="orange">Orange</option>
          </select>
          {errors.colorError && (
            <p className="text-red-600 bg">{errors.colorError}</p>
          )}
        </div>

        <p className="flex justify-end gap-4">
          <TextButton type="button" onClick={handleCloseModalClick}>
            Close
          </TextButton>
          <Button>Save</Button>
        </p>
      </form>
    </>
  );
}
