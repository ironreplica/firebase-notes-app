import { db } from "../firebase";
import {
  collection,
  addDoc,
  updateDoc,
  doc,
  deleteDoc,
} from "firebase/firestore";

// * Toggle completed
const toggleTodoStatus = async ({ docId, status }) => {
  try {
    const todoRef = doc(db, "todo", docId);
    await updateDoc(todoRef, {
      status,
    });
  } catch (error) {
    console.log(error);
  }
};

// * Add a todo
const addTodo = async ({ userId, title, description, status }) => {
  try {
    await addDoc(collection(db, "todo"), {
      user: userId,
      title: title,
      description: description,
      status: status,
      createdAt: new Date().getTime(),
    });
  } catch (error) {
    console.log(error);
  }
};

// * Update Todo
const updateTodo = async ({ docId, title, description }) => {
  try {
    const todoRef = doc(db, "todo", docId);
    await deleteDoc(todoRef);
  } catch (error) {
    console.log(error);
  }
};

// * Delete Todo
const deleteTodo = async (docId) => {
  try {
    const todoRef = doc(db, "todo", docId);
    await deleteDoc(todoRef);
  } catch (error) {
    console.log(error);
  }
};

export { addTodo, toggleTodoStatus, deleteTodo, updateTodo };
