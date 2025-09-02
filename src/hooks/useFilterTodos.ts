import { useEffect, useState } from "react";
import { type ITodo } from "../store/store";

export const useFilterTodos = (
  todos: ITodo[],
  searchInput: string
): ITodo[] => {
  const [filteredTodos, setFilteredTodos] = useState<ITodo[]>([]);

  useEffect(() => {
    const todosAfterFilter = todos.filter((todo) =>
      todo.title.toLowerCase().includes(searchInput.toLowerCase())
    );

    if (todosAfterFilter.length && searchInput !== "") {
      setFilteredTodos(todosAfterFilter);
    } else if (!todosAfterFilter.length) {
      setFilteredTodos([]);
    }
  }, [todos, searchInput]); 

  return filteredTodos;
};
