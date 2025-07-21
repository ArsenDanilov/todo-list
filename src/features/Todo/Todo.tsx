import styles from "./Todo.module.css";
import { useCallback, useEffect } from "react";
import { useFetchTodos, type ITodo } from "../../hooks/useFetchTodos";
import { CardList } from "../CardList/CardList";
import { TodoSearcher } from "../TodoSearcher/TodoSearcher";
import { useFilterTodos } from "../../hooks/useFilterTodos";
import { useTodosStore } from "../../store/store";

type TodoIDType = ITodo["id"];
type TodoCompletedType = ITodo["completed"];
export type ChangeTodoCompletedFunction = (
  id: TodoIDType,
  completed: TodoCompletedType
) => void;

// TODO: проверить, везде ли используются методы стора 
export const Todo = () => {
  const { fetchedTodos, loading, error } = useFetchTodos(3);
  const { setTodos, searchInput, setSearchInput } = useTodosStore();


  useEffect(() => {
    if (fetchedTodos) {
      setTodos(fetchedTodos);
      localStorage.setItem("todos", JSON.stringify(fetchedTodos));
    }
  }, [fetchedTodos, setTodos]);

  const changeTodoCompleted = useCallback(
    (id: TodoIDType, completed: TodoCompletedType) => {

      const { todos } = useTodosStore.getState();

      const index = todos.findIndex((todo) => todo.id === id);

      const newTodos = [...todos];
      newTodos[index] = { ...newTodos[index], completed };
      setTodos(newTodos);
    },
    [setTodos]
  );

  const { todos } = useTodosStore();

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
