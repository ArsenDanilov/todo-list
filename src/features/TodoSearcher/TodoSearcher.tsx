import { useState, type KeyboardEvent } from "react";
import type { ITodo } from "../../hooks/useFetchTodos";
import type { SetTodoFunction } from "../Todo/Todo";

interface ITodoSearcher {
  todos: ITodo[];
  setTodos: SetTodoFunction;
}

export const TodoSearcher = ({ todos, setTodos }: ITodoSearcher) => {
  const [userInput, setUserInput] = useState("");

  const handleSearch = (event: KeyboardEvent<HTMLInputElement>): void => {
    const inputElement = event.target as HTMLInputElement;
    setUserInput(inputElement.value);

    const filteredTodos = todos.filter((todo) => {
      return todo.title.toLowerCase().includes(userInput.toLowerCase());
    });

    if (filteredTodos.length && userInput !== "") {
      setTodos(filteredTodos);
    }
  };

  const debounce = <T extends (event: KeyboardEvent<HTMLInputElement>) => void>(fn: T, ms: number): T => {
    let timeout: ReturnType<typeof setTimeout> | undefined;
    
    return ((event: React.KeyboardEvent<HTMLInputElement>) => {
      clearTimeout(timeout);
      timeout = setTimeout(() => {
        fn(event);
      }, ms);
    }) as T;
  };

  const debouncedHandleSearch = debounce(handleSearch, 500);

  return (
    <div>
      <input
        type="text"
        placeholder="Type todo title for search"
        onKeyUp={debouncedHandleSearch}
      />
    </div>
  );
};
