import styles from "../styles/App.module.css";
import { Todo } from "../../features/Todo/Todo";

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
