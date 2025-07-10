import axios from "axios";
import { useEffect, useState } from "react";

export interface ITodo {
  userId: number;
  id: number;
  title: string;
  completed: boolean;
}

const axiosInstance = axios.create({
  baseURL: "https://jsonplaceholder.typicode.com/",
});

export const useFetchTodos = (limit: number) => {
  const [fetchedTodos, setFetchedTodos] = useState<ITodo[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    const fetchTodos = async () => {
      try {
        const response = await axiosInstance.get<ITodo[]>("todos",
          {
            params: {
              _limit: limit,
            },
          }
        );
        setFetchedTodos(response.data);
      } catch (error) {
        if (axios.isAxiosError(error)) {
          setError(new Error(error.message || "Unknown error"));
        } else if (error instanceof Error) {
          setError(new Error(error.message));
        }
      } finally {
        setLoading(false);
      }
    };

    fetchTodos();
  }, [limit]);

  return { fetchedTodos, loading, error }
};

