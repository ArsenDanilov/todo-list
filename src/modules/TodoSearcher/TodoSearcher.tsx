import { memo, useCallback, type KeyboardEvent } from "react";
import { useDebounce } from "../../hooks/useDebounce";
import { type ITodosStore } from "../../store/store";
import { Box, Flex, Input } from "@chakra-ui/react";

type SetSearchInputType = ITodosStore["setSearchInput"];

export const TodoSearcher = memo(
  ({ setSearchInput }: { setSearchInput: SetSearchInputType }) => {
    const handleSearch = useCallback(
      (event: KeyboardEvent<HTMLInputElement>): void => {
        const inputElement = event.target as HTMLInputElement;
        const inputValue = inputElement.value;

        setSearchInput(inputValue);
      },
      [setSearchInput]
    );

    const debouncedHandleSearch = useDebounce(handleSearch, 500);

    return (
      <Box
        mb="1rem"
        position="sticky"
        top="0"
        left="0"
        p="50px 0 20px"
        bg="white"
        w="100%"
      >
        <Flex>
          <Input
            type="text"
            placeholder="Type todo title for search"
            onKeyUp={debouncedHandleSearch}
            w="25%"
            m="0 auto"
          />
        </Flex>
      </Box>
    );
  }
);
