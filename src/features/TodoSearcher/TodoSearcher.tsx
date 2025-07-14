import { type KeyboardEvent } from "react";
import type { ITodo } from "../../hooks/useFetchTodos";

type TodoSearcherProps = {
  setTodos: React.Dispatch<React.SetStateAction<ITodo[]>>;
};


export const TodoSearcher = ({ setTodos }: TodoSearcherProps) => {

  const localStorageTodos = JSON.parse(localStorage.getItem('todos') as string) as ITodo[];

  const handleSearch = (event: KeyboardEvent<HTMLInputElement>): void => {

    const inputElement = event.target as HTMLInputElement;
    const inputValue = inputElement.value; 

    const filteredTodos = localStorageTodos.filter((todo) => {
      return todo.title.toLowerCase().includes(inputValue.toLowerCase());
    });

    if (filteredTodos.length && inputValue !== "") {
      setTodos(filteredTodos);
    } else if (inputValue === "") {
        setTodos(JSON.parse(localStorage.getItem('todos') as string));
    } else if (!filteredTodos.length) {
        setTodos([]);
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
