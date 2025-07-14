import { useState, type KeyboardEvent } from "react";
import type { ITodo } from "../../hooks/useFetchTodos";
import type { SetTodoFunction } from "../Todo/Todo";

interface ITodoSearcher {
  todos: ITodo[];
  setTodos: SetTodoFunction;
}

export const TodoSearcher = ({ todos, setTodos }: ITodoSearcher) => {
  const [userInput, setUserInput] = useState("");

    // const handleSearch = (event: KeyboardEvent<HTMLInputElement>): void => {
    //   const inputElement = event.target as HTMLInputElement;
    //   setUserInput(inputElement.value);

    //   const filteredTodos = todos.filter((todo) => {
    //     return todo.title.toLowerCase().includes(userInput.toLowerCase());
    //   });

    //   if (filteredTodos.length && userInput !== "") {
    //     setTodos(filteredTodos);
    //   }
    // };

  const handleSearch = (event: KeyboardEvent<HTMLInputElement>): void => {
    const inputElement = event.target as HTMLInputElement;
    setUserInput(inputElement.value);

    const filteredTodos = todos.filter((todo) => {
      return todo.title.includes(userInput);
    });

    if (filteredTodos.length && userInput !== "") {
      setTodos(filteredTodos);
    }
  };

  return (
    <div>
      <input
        type="text"
        placeholder="Type todo title for search"
        onKeyUp={handleSearch}
      />
    </div>
  );
};
