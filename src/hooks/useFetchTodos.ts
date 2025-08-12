import { useInfiniteQuery } from "@tanstack/react-query";
import axios from "axios";
import { useEffect } from "react";
import { useTodosStore } from "../store/store";

export interface ITodo {
  userId: number;
  id: number;
  title: string;
  completed: boolean;
}

const axiosInstance = axios.create({
  baseURL: "https://jsonplaceholder.typicode.com/",
});

export const useFetchTodos = () => {
  const { setTodos } = useTodosStore();

  const query = useInfiniteQuery<ITodo[], Error>({
    queryKey: ["todos"],
    queryFn: async ({ pageParam }) => {
      const response = await axiosInstance.get<ITodo[]>("/todos", {
        params: { 
          _page: pageParam,
          _limit: 10,
        },
      })
      return response.data;
    },
    initialPageParam: 1,
     getNextPageParam: (lastPage, allPages) => {
      return lastPage.length === 10 ? allPages.length + 1 : undefined;
    },
  });

  useEffect(() => {
    if (query.isSuccess && query.data?.pages) {
      setTodos(query.data.pages.flat());
    }
  }, [query.isSuccess, query.data, setTodos]);

  return query;
};

// export const useFetchTodos = (limit: number) => {
//   const { setTodos } = useTodosStore();

//   const query = useQuery<ITodo[], Error>({
//     queryKey: ["todos", limit],
//     queryFn: async () => {
//       const response = await axiosInstance.get<ITodo[]>("/todos?_page=1&_per_page=10", {
//         params: { _limit: limit },
//       });
//       return response.data;
//     },
//   });

//   useEffect(() => {
//     if (query.isSuccess && query.data) {
//       setTodos(query.data as ITodo[]);
//     }
//   }, [query.isSuccess, query.data, setTodos]);

//   return query;
// };
