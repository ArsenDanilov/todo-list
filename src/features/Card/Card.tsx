import { useState } from "react";
import styles from "./Card.module.css";
import { type ChangeTodoCompletedFunction } from "../Todo/Todo";

// TODO: переписать
interface ICard {
    id: number,
    title: string,
    completed: boolean,
    onClick: ChangeTodoCompletedFunction
}

export const Card = ({ id, title, completed, onClick }: ICard) => {

  const [status, setStatus] = useState(completed)

  const toggleStatus = () => {
    onClick(id, status)
    setStatus(!status);
  }

  return (
    <div className={styles.card}>
      <input type="checkbox" checked={status} onClick={toggleStatus}/>
      <p>Task: {title}</p>
    </div>
  );
};
