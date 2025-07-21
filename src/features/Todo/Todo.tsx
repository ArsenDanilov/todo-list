import styles from "./Todo.module.css";
import { useCallback, useEffect, useState } from "react";
import { useFetchTodos, type ITodo } from "../../hooks/useFetchTodos";
import { CardList } from "../CardList/CardList";
import { TodoSearcher } from "../TodoSearcher/TodoSearcher";
import { useFilterTodos } from "../../hooks/useFilterTodos";

type TodoIDType = ITodo["id"];
type TodoCompletedType = ITodo["completed"];
export type ChangeTodoCompletedFunction = (
  id: TodoIDType,
  completed: TodoCompletedType
) => void;

export const Todo = () => {
  const { fetchedTodos, loading, error } = useFetchTodos(3);
  const [todos, setTodos] = useState<ITodo[]>([]);
  const [searchInput, setSearchInput] = useState<string>("");

  useEffect(() => {
    if (fetchedTodos) {
      setTodos(fetchedTodos);
      localStorage.setItem("todos", JSON.stringify(fetchedTodos));
    }
  }, [fetchedTodos]);

  const changeTodoCompleted = useCallback(
    (id: TodoIDType, completed: TodoCompletedType) => {
      setTodos((prevTodos) => {
        const index = prevTodos.findIndex((todo) => todo.id === id);
        if (index === -1) {
          return prevTodos;
        } else {
          const newTodos = [...prevTodos];
          newTodos[index] = { ...newTodos[index], completed };
          return newTodos;
        }
      });
    },
    []
  );

  const filteredTodos = useFilterTodos(todos, searchInput);

  return (
    <div className={styles.todo}>
      <h1 className={styles.todo__title}>Todo List</h1>
      <TodoSearcher setSearchInput={setSearchInput} />
      <CardList
        todos={searchInput ? filteredTodos : todos}
        loading={loading}
        error={error}
        onClick={changeTodoCompleted}
      />
    </div>
  );
};
