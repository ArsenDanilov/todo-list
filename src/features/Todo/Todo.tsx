import styles from "./Todo.module.css";
import { useCallback, useEffect, useState } from "react";
import { useFetchTodos, type ITodo } from "../../hooks/useFetchTodos";
import { CardList } from "../CardList/CardList";
import { TodoSearcher } from "../TodoSearcher/TodoSearcher";

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

  const getLocalStorageTodos = () => {
    try {
      const storedTodos = JSON.parse(localStorage.getItem("todos") as string) as ITodo[];

      return storedTodos;

    } catch (error) {
      console.error("Ошибка при обновлении списка todo в localStorage", error);
      return [];
    }
  };

  // TODO: подумать, как можно оптимизировать 
  const changeTodoCompleted = useCallback(
    (id: TodoIDType, completed: TodoCompletedType) => {
      setTodos((prevTodos) => {
        return prevTodos.map((todo) => {
          if (todo.id === id) {
            return { ...todo, completed };
          }
          return todo;
        });
      });

      const localStorageTodos = getLocalStorageTodos();

      const todoIndex = localStorageTodos.findIndex((todo) => todo.id === id);

      if (todoIndex === -1) return null;

      localStorageTodos[todoIndex] = {
        ...localStorageTodos[todoIndex],
        completed,
      };

      localStorage.setItem("todos", JSON.stringify(localStorageTodos));
    },
    [setTodos]
  );

  useEffect(() => {
    const filterTodos = (): void => {
      const localStorageTodos = getLocalStorageTodos();

      const filteredTodos = localStorageTodos.filter((todo) => {
        return todo.title.toLowerCase().includes(searchInput.toLowerCase());
      });

      if (filteredTodos.length && searchInput !== "") {
        setTodos(filteredTodos);
      } else if (searchInput === "") {
        setTodos(JSON.parse(localStorage.getItem("todos") as string));
      } else if (!filteredTodos.length) {
        setTodos([]);
      }
    };

    filterTodos();

  }, [searchInput]);

  return (
    <div className={styles.todo}>
      <h1 className={styles.todo__title}>Todo List</h1>
      <TodoSearcher setSearchInput={setSearchInput} />
      <CardList
        todos={todos}
        loading={loading}
        error={error}
        onClick={changeTodoCompleted}
      />
    </div>
  );
};
