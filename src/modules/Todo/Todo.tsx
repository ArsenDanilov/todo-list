import { useCallback } from "react";
import { useFetchTodos, type ITodo } from "../../hooks/useFetchTodos";
import { CardList } from "../CardList/CardList";
import { TodoSearcher } from "../TodoSearcher/TodoSearcher";
import { useTodosStore } from "../../store/store";
import { Box, Heading } from "@chakra-ui/react";

type TodoIDType = ITodo["id"];
type TodoCompletedType = ITodo["completed"];
export type ChangeTodoCompletedFunction = (
  id: TodoIDType,
  completed: TodoCompletedType
) => void;

export const Todo = () => {
  const { isLoading: loading, error } = useFetchTodos();
  const { todos, setTodos, searchInput, setSearchInput, getFilteredTodos } =
    useTodosStore();

  const changeTodoCompleted = useCallback(
    (id: TodoIDType, completed: TodoCompletedType) => {
      const { todos } = useTodosStore.getState();

      const index = todos.findIndex((todo) => todo.id === id);

      const newTodos = [...todos];
      newTodos[index] = { ...newTodos[index], completed };
      setTodos(newTodos);
    },
    [setTodos]
  );

  const filteredTodos = getFilteredTodos(searchInput);

  return (
    <Box borderRadius="5px" p="20px" position="relative">
      <Heading textAlign="center" size="4xl">Todo List</Heading>
      <TodoSearcher setSearchInput={setSearchInput} />
      <CardList
        todos={searchInput ? filteredTodos : todos}
        loading={loading}
        error={error}
        onClick={changeTodoCompleted}
      />
    </Box>
  );
};
