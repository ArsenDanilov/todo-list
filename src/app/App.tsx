import { Todo } from "../modules/Todo/Todo";
import styles from "./App.module.css";

function App() {
  return (
    <>
      <div className={styles.container}>
        <Todo />
      </div>
    </>
  );
}

export default App;
