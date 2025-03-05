import fs from "node:fs/promises";

import bodyParser from "body-parser";
import express from "express";

const app = express();

app.use(bodyParser.json());

// CORS
app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader(
    "Access-Control-Allow-Methods",
    "GET, POST, PUT, DELETE, OPTIONS"
  );
  res.setHeader("Access-Control-Allow-Headers", "Content-Type");

  next();
});

// Fetch all lists
app.get("/lists", async (req, res) => {
  const fileContent = await fs.readFile("./data/lists.json");

  const listsData = JSON.parse(fileContent);

  res.status(200).json({ lists: listsData });
});

// Add a list
app.post("/lists", async (req, res) => {
  const listData = req.body.list;

  if (
    !listData ||
    listData.title === undefined ||
    listData.icon === undefined ||
    listData.color === undefined
  ) {
    return res.status(400).json({ message: "Missing or invalid data." });
  }

  const newList = {
    ...listData,
    id: `list-${Date.now()}-${Math.floor(Math.random() * 10000)}`,
  };

  const lists = await fs.readFile("./data/lists.json", "utf8");
  const allLists = JSON.parse(lists);
  allLists.push(newList);
  await fs.writeFile("./data/lists.json", JSON.stringify(allLists));
  res.status(200).json(newList);
});

// Edit a list
app.put("/lists/:listId", async (req, res) => {
  const listId = req.params.listId;
  const updatedData = req.body.list;

  if (
    !updatedData ||
    updatedData.title === undefined ||
    updatedData.icon === undefined ||
    updatedData.color === undefined
  ) {
    return res.status(400).json({ message: "Missing or invalid data." });
  }

  const lists = await fs.readFile("./data/lists.json", "utf8");
  let allLists = JSON.parse(lists);

  const listIndex = allLists.findIndex((list) => list.id === listId);

  if (listIndex === -1) {
    return res.status(404).json({ message: "List not found." });
  }

  allLists[listIndex] = { ...allLists[listIndex], ...updatedData };
  await fs.writeFile("./data/lists.json", JSON.stringify(allLists, null, 2));
  res.status(200).json({ message: "List updated." });
});

// Delete a list
app.delete("/lists/:listId", async (req, res) => {
  const listId = req.params.listId;

  const lists = await fs.readFile("./data/lists.json", "utf8");
  const allLists = JSON.parse(lists);
  const newAllList = allLists.filter((list) => list.id !== listId);
  await fs.writeFile("./data/lists.json", JSON.stringify(newAllList));
  res.status(200).json({ message: "List deleted." });
});

// Add a task
app.put("/lists/:listId/tasks", async (req, res) => {
  const listId = req.params.listId;
  const newTask = {
    ...req.body.task,
    id: `${listId}-task-${Math.floor(Math.random() * 10000)}`,
  };

  if (!newTask || newTask.text === undefined) {
    return res.status(400).json({ message: "Missing or invalid data." });
  }

  const lists = await fs.readFile("./data/lists.json", "utf8");
  let allLists = JSON.parse(lists);

  const listIndex = allLists.findIndex((list) => list.id === listId);

  if (listIndex === -1) {
    return res.status(404).json({ message: "List not found." });
  }

  allLists[listIndex].tasks.push(newTask);
  await fs.writeFile("./data/lists.json", JSON.stringify(allLists, null, 2));
  res.status(200).json(newTask);
});

// Edit a task
app.put("/lists/:listId/tasks/:taskId/completed", async (req, res) => {
  const { listId, taskId } = req.params;

  const lists = await fs.readFile("./data/lists.json", "utf8");
  let allLists = JSON.parse(lists);

  const listIndex = allLists.findIndex((list) => list.id === listId);
  if (listIndex === -1) {
    return res.status(404).json({ message: "List not found." });
  }

  const taskIndex = allLists[listIndex].tasks.findIndex(
    (task) => task.id === taskId
  );
  if (taskIndex === -1) {
    return res.status(404).json({ message: "Task not found." });
  }

  allLists[listIndex].tasks[taskIndex].completed =
    !allLists[listIndex].tasks[taskIndex].completed;

  await fs.writeFile("./data/lists.json", JSON.stringify(allLists, null, 2));
  res.status(200).json({ message: "Task updated." });
});

// Delete a task
app.delete("/lists/:listId/tasks/:taskId", async (req, res) => {
  const { listId, taskId } = req.params;

  const lists = await fs.readFile("./data/lists.json", "utf8");
  let allLists = JSON.parse(lists);

  const listIndex = allLists.findIndex((list) => list.id === listId);
  if (listIndex === -1) {
    return res.status(404).json({ message: "List not found." });
  }

  const taskIndex = allLists[listIndex].tasks.findIndex(
    (task) => task.id === taskId
  );
  if (taskIndex === -1) {
    return res.status(404).json({ message: "Task not found." });
  }

  allLists[listIndex].tasks.splice(taskIndex, 1);

  await fs.writeFile("./data/lists.json", JSON.stringify(allLists, null, 2));
  res.status(200).json({ message: "Task deleted." });
});

// 404
app.use((req, res, next) => {
  if (req.method === "OPTIONS") {
    return next();
  }
  res.status(404).json({ message: "404 - Not Found" });
});

app.listen(3000, () => {
  console.log("Server is running on port 3000");
});
