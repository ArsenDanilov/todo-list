import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { useEffect } from "react";

export interface ITodo {
  userId: number;
  id: number;
  title: string;
  completed: boolean;
}

const axiosInstance = axios.create({
  baseURL: "https://jsonplaceholder.typicode.com/",
});

export const useFetchTodos = (limit: number, setTodos: (todos: ITodo[]) => void) => {
  const query = useQuery<ITodo[], Error>({
    queryKey: ['todos', limit],
    queryFn: async () => {
      const response = await axiosInstance.get<ITodo[]>('/todos', {
        params: { _limit: limit },
      });
      return response.data;
    },
  });

  useEffect(() => {
    if (query.isSuccess && query.data) {
      setTodos(query.data as ITodo[]); 
    }
  }, [query.isSuccess, query.data, setTodos]);

  return query;
};
