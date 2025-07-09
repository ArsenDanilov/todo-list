import styles from "./Todo.module.css";
import { useEffect, useState } from "react";
import { useFetchTodos, type ITodo } from "../../hooks/useFetchTodos";

export const Todo = () => {
  const { fetchedTodos, loading, error } = useFetchTodos(6);

  const [todos, setTodos] = useState<ITodo[]>([]);

  useEffect(() => {
    if (fetchedTodos) {
      setTodos(fetchedTodos);
    }
  }, [fetchedTodos]);

  console.log(todos);

  if (loading) {
    return <p>Loading...</p>;
  }

  if (error) {
    return <p>{error.message}</p>;
  }

  return (
    <div className={styles.todo}>
      <h1 className={styles.todo__title}>Todo List</h1>
      {todos.map((todo) => (
          <div>
            <p>{todo.id}</p>
            <p>{todo.title}</p>
          </div>
        ))}
    </div>
  );
};
