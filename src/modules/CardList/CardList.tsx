import { useFetchTodos, type ITodo } from "../../hooks/useFetchTodos";
import { Card } from "../Card/Card";
import styles from "./CardList.module.css";
import { type ChangeTodoCompletedFunction } from "../Todo/Todo";
import { memo } from "react";
import { useIntersection } from "../../hooks/useIntersection";

interface ICardList {
  todos: ITodo[];
  loading: boolean;
  error: Error | null;
  onClick: ChangeTodoCompletedFunction;
}

export const CardList = memo(
  ({ todos, loading, error, onClick }: ICardList) => {
    const { fetchNextPage, hasNextPage, isFetchingNextPage } = useFetchTodos();

    const cursorRef = useIntersection(() => {
      fetchNextPage();
    });

    if (loading) {
      return (
        <h3 className={styles.cardList__loadingMessage}>
          Loading todo list...
        </h3>
      );
    }

    if (error) {
      return <h3 className={styles.cardList__errorMessage}>{error.message}</h3>;
    }

    return (
      <div className={styles.cardList}>
        {todos.length > 0 ? (
          todos.map((todo) => (
            <Card
              key={todo.id}
              id={todo.id}
              title={todo.title}
              completed={todo.completed}
              onClick={onClick}
            />
          ))
        ) : (
          <p>No todos to display</p>
        )}
        <div ref={cursorRef}>
          {!hasNextPage && <div>There is no data to loading</div>}
          {isFetchingNextPage && <div>... Loading</div>}
        </div>
      </div>
    );
  }
);
