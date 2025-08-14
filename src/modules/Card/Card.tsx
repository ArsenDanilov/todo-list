import { memo } from "react";
import { type ChangeTodoCompletedFunction } from "../Todo/Todo";
import { Flex, Text } from "@chakra-ui/react";

interface ICard {
  id: number;
  title: string;
  completed: boolean;
  onClick: ChangeTodoCompletedFunction;
}

export const Card = memo(({ id, title, completed, onClick }: ICard) => {
  const toggleStatus = () => {
    onClick(id, !completed);
  };

  return (
    <Flex
      flexWrap="wrap"
      gap="5px"
      borderRadius="5px"
      mb="1.2rem"
      p="0.4rem"
      w="100%"
    >
      <input type="checkbox" checked={completed} onChange={toggleStatus} />
      <Text textDecoration={completed ? "line-through" : "none"}>{title}</Text>
    </Flex>
  );
});
