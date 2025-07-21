import { type ITodo } from "../../hooks/useFetchTodos";
import { Card } from "../Card/Card";
import styles from "./CardList.module.css"
import { type ChangeTodoCompletedFunction } from "../Todo/Todo";
import { memo } from "react";

interface ICardList {
  todos: ITodo[];
  loading: boolean;
  error: Error | null;
  onClick: ChangeTodoCompletedFunction;
}

// TODO: проверить, можно ли не передавать функцию-onClick в пропсе
export const CardList = memo(({ todos, loading, error, onClick }: ICardList) => {

  if (loading) {
    return <h3 className={styles.cardList__loadingMessage}>Loading todo list...</h3>
  }

  if (error) {
    return <h3 className={styles.cardList__errorMessage}>{error.message}</h3>;
  }

  return (
    <div className={styles.cardList}>
      {todos.length > 0 ? (
        todos.map((todo) => (
        <Card key={todo.id} id={todo.id} title={todo.title} completed={todo.completed} onClick={onClick}/>
      ))
      ) : (<p>No todos to display</p>)}
    </div>
  );
});
