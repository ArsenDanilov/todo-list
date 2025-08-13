import { useFetchTodos, type ITodo } from "../../hooks/useFetchTodos";
import { Card } from "../Card/Card";
import { type ChangeTodoCompletedFunction } from "../Todo/Todo";
import { memo } from "react";
import { useIntersection } from "../../hooks/useIntersection";
import { Spinner, Flex, Text, Heading } from "@chakra-ui/react";

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
        <Heading size="xl" color="blue.700">
          Loading todo list...
        </Heading>
      );
    }

    if (error) {
      return (
        <Heading size="xl" color="red.700">
          {error.message}
        </Heading>
      );
    }

    return (
      <Flex flexWrap="wrap" justifyContent="center">
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
          <Text>No todos to display</Text>
        )}
        <div ref={cursorRef}>
          {!hasNextPage && <Text>There is no data to loading</Text>}
          {isFetchingNextPage && <Spinner color="blue" />}
        </div>
      </Flex>
    );
  }
);
