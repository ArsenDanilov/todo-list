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
