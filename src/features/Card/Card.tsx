import { memo } from "react";
import styles from "./Card.module.css";
import { type ChangeTodoCompletedFunction } from "../Todo/Todo";

interface ICard {
  id: number;
  title: string;
  completed: boolean;
  onClick: ChangeTodoCompletedFunction;
}

export const Card = memo(({ id, title, completed, onClick }: ICard) => {

  const toggleStatus = () => {
    onClick(id, !completed);
  }  

  return (
    <div className={styles.card}>
      <input type="checkbox" checked={completed} onChange={toggleStatus} />
      <p className={completed ? styles.completed : ""}>Task: {title}</p>
    </div>
  );
});
