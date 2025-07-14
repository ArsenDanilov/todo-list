import { type ITodo } from "../../hooks/useFetchTodos";
import { Card } from "../Card/Card";
import styles from "./CardList.module.css"
import { type ChangeTodoCompletedFunction } from "../Todo/Todo";

interface ICardList {
  todos: ITodo[];
  loading: boolean;
  error: Error | null;
  onClick: ChangeTodoCompletedFunction;
}

export const CardList = ({ todos, loading, error, onClick }: ICardList) => {
  console.log(todos);

  if (loading) {
    return <h3 className={styles.cardList__loadingMessage}>Loading todo list...</h3>
  }

  if (error) {
    return <h3 className={styles.cardList__errorMessage}>{error.message}</h3>;
  }

  return (
    <div className={styles.cardList}>
      {todos.map((todo) => (
        <Card key={todo.id} id={todo.id} title={todo.title} completed={todo.completed} onClick={onClick}/>
      ))}
    </div>
  );
};
