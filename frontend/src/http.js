export async function fetchExistingLists() {
  const response = await fetch("http://localhost:3000/lists");
  const resData = await response.json();

  if (!response.ok) {
    throw new Error("Failed to fetch existing lists.");
  }

  return resData.lists;
}

export async function addList(list) {
  const response = await fetch("http://localhost:3000/lists", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ list: list }),
  });
  const resData = await response.json();

  if (!response.ok) {
    throw new Error("Failed to add list.");
  }

  return resData;
}

export async function editList(editedList, listId) {
  const response = await fetch(`http://localhost:3000/lists/${listId}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ list: editedList }),
  });
  const resData = await response.json();

  if (!response.ok) {
    throw new Error("Failed to edit list.");
  }

  return resData;
}

export async function deleteList(listId) {
  const response = await fetch(`http://localhost:3000/lists/${listId}`, {
    method: "DELETE",
    // headers: {
    //   "Content-Type": "application/json",
    // },
    // body: JSON.stringify({ list: editedList }),
  });
  const resData = await response.json();

  if (!response.ok) {
    throw new Error("Failed to delete list.");
  }

  return resData;
}
