import { memo, useCallback, type KeyboardEvent } from "react";
import styles from "./TodoSearcher.module.css";
import { useDebounce } from "../../hooks/useDebounce";

type SetSearchInputType = React.Dispatch<React.SetStateAction<string>>;

export const TodoSearcher = memo(({ setSearchInput }: { setSearchInput: SetSearchInputType }) => {

    const handleSearch = useCallback(
      (event: KeyboardEvent<HTMLInputElement>): void => {
        const inputElement = event.target as HTMLInputElement;
        const inputValue = inputElement.value;

        setSearchInput(inputValue);
      },
      [setSearchInput]
    );

    const debouncedHandleSearch = useDebounce(handleSearch, 500)

    return (
      <div className={styles.todoSearcher__container}>
        <input
          className={styles.todoSearcher__input}
          type="text"
          placeholder="Type todo title for search"
          onKeyUp={debouncedHandleSearch}
        />
      </div>
    );
  }
);

// export const TodoSearcher = memo(({ setSearchInput }: SetSearchInputType) => {
//   const localStorageTodos = JSON.parse(localStorage.getItem("todos") as string) as ITodo[];

//     const handleSearch = (event: KeyboardEvent<HTMLInputElement>): void => {

//       const inputElement = event.target as HTMLInputElement;
//       const inputValue = inputElement.value;

//       const filteredTodos = localStorageTodos.filter((todo) => {
//         return todo.title.toLowerCase().includes(inputValue.toLowerCase());
//       });

//       if (filteredTodos.length && inputValue !== "") {
//         setTodos(filteredTodos);
//       } else if (inputValue === "") {
//           setTodos(JSON.parse(localStorage.getItem('todos') as string));
//       } else if (!filteredTodos.length) {
//           setTodos([]);
//       }
//     };

//   const debounce = <T extends (event: KeyboardEvent<HTMLInputElement>) => void>(
//     fn: T,
//     ms: number
//   ): T => {
//     let timeout: ReturnType<typeof setTimeout> | undefined;

//     return ((event: React.KeyboardEvent<HTMLInputElement>) => {
//       clearTimeout(timeout);
//       timeout = setTimeout(() => {
//         fn(event);
//       }, ms);
//     }) as T;
//   };

//   const debouncedHandleSearch = debounce(handleSearch, 500);

//   return (
//     <div className={styles.todoSearcher__container}>
//       <input
//         className={styles.todoSearcher__input}
//         type="text"
//         placeholder="Type todo title for search"
//         onKeyUp={debouncedHandleSearch}
//       />
//     </div>
//   );
// });
