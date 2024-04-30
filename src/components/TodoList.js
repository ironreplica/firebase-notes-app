"use client";
import {
  Badge,
  Box,
  Heading,
  SimpleGrid,
  Text,
  useToast,
  Button,
  Input,
  Textarea,
} from "@chakra-ui/react";
import { useEffect, useState } from "react";
import useAuth from "../hooks/useAuth";
import {
  collection,
  onSnapshot,
  query,
  where,
  doc,
  updateDoc,
  QuerySnapshot,
} from "firebase/firestore";
import { db } from "../firebase";
import { FaToggleOff, FaToggleOn, FaTrash } from "react-icons/fa";
import { deleteTodo, toggleTodoStatus } from "@/api/todo";

const TodoList = () => {
  const [todos, setTodos] = useState([]);
  const [editTodo, setEditTodo] = useState(null);
  const { user } = useAuth();
  const toast = useToast;

  const refreshData = () => {
    if (!user) {
      setTodos([]);
      return;
    }
    const q = query(collection(db, "todo"), where("user", "==", user.uid));
    onSnapshot(q, (querySnapshot) => {
      const ar = [];
      querySnapshot.forEach((doc) => {
        ar.push({ id: doc.id, ...doc.data() });
      });
      setTodos(ar);
    });
  };
};

useEffect(() => {
  refreshData();
}, [user]);

const handleTodoDelete = async (id) => {
  if (confirm("Are you sure you want to delete this todo?")) {
    deleteTodo(id);
    toast({ title: "Todo deletedd successfully", status: "success" });
  }
};

const handleToggle = async (id, status) => {
  const newStatus = status === "completed" ? "pending" : "completed";
  await toggleTodoStatus({ docId: id, status: newStatus });
  toast({
    title: `Todo marked ${newStatus}`,
    status: newStatus === "completed" ? "success" : "warning",
  });
};

const handleEditTodo = async () => {
  setEditTodo({ ...todo }); // Make a copy of the todo object
};

const handleUpdate = async () => {
  if (!editTodo) return;

  await updateDoc(doc(db, "todo", editTodo.id), {
    title: editTodo.title,
    description: editTodo.description,
  });

  toast({ title: "Todo updated successfully", status: "success" });
  setEditTodo(null);
  refreshData();
};

return (
  <Box mt={5}>
    <SimpleGrid columns={{ base: 1, md: 3 }} spacing={8}>
      {todos.map((todo) => {
        <Box
          key={todo.id}
          p={3}
          boxShadow="2xl"
          shadow={"dark-lg"}
          transition="0.2s"
          _hover={{ boxShadow: "sm" }}
        >
          <Heading as="h3" fontSize={"xl"}>
            <Badge
              ccolor="red.500"
              bg="inherit"
              transition={"0.2s"}
              _hover={{ bg: "inherit", transform: "scale(1.2)" }}
              float="right"
              size="xs"
              onClick={() => handleTodoDelete(todo.id)}
            >
              <FaTrash />
            </Badge>
          </Heading>
          {editTodo && editTodo.id === todo.id ? (
            <Box>
              <Text>Description</Text>
              <TextArea
                type="text"
                value={editTodo.description}
                onChange={(e) =>
                  setEditTodo({ ...editTodo, description: e.target.value })
                } //2.54
              />
            </Box>
          ) : (
            <Text>{todo.description}</Text>
          )}
        </Box>;
      })}
    </SimpleGrid>
  </Box>
);