import styles from "./Todo.module.css";
import { useEffect, useState } from "react";
import { useFetchTodos, type ITodo } from "../../hooks/useFetchTodos";
import { CardList } from "../CardList/CardList";
import { TodoSearcher } from "../TodoSearcher/TodoSearcher";

// TODO: вынести в отдельную сущность
type TodoIDType = ITodo["id"];

type TodoCompletedType = ITodo["completed"];

export type ChangeTodoCompletedFunction = (
  id: TodoIDType,
  completed: TodoCompletedType
) => void;

export type SetTodoFunction = React.Dispatch<React.SetStateAction<ITodo[]>>;

export const Todo = () => {
  const { fetchedTodos, loading, error } = useFetchTodos(3);

  const [todos, setTodos] = useState<ITodo[]>([]);


  useEffect(() => {
    if (fetchedTodos) {
      setTodos(fetchedTodos);
      localStorage.setItem('todos', JSON.stringify(fetchedTodos));
    }
  }, [fetchedTodos]);

  const changeTodoCompleted: ChangeTodoCompletedFunction = (id, completed) => {
    setTodos((prevTodos) => {
      return prevTodos.map((todo) => {
        if (todo.id === id) {
          return { ...todo, completed };
        }
        return todo;
      });
    });
  };


  return (
    <div className={styles.todo}>
      <h1 className={styles.todo__title}>Todo List</h1>
      <TodoSearcher todos={todos} setTodos={setTodos}/>
      <CardList
        todos={todos}
        loading={loading}
        error={error}
        onClick={changeTodoCompleted}
      />
    </div>
  );
};
