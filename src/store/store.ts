import { create } from "zustand";
import { type ITodo } from "../hooks/useFetchTodos";

export interface ITodosStore {
  todos: ITodo[];
  searchInput: string;
  setTodos: (todos: ITodo[]) => void;
  setSearchInput: (input: string) => void;
  getFilteredTodos: (searchInput: string) => ITodo[];
}

export const useTodosStore = create<ITodosStore>((set, get) => ({
  todos: [],
  searchInput: "",
  setTodos: (todos) => set({ todos }),
  setSearchInput: (input) => set({ searchInput: input }),
  getFilteredTodos: (searchInput) => {
    const { todos } = get();
    return todos.filter((todo) =>
      todo.title.toLowerCase().includes(searchInput.toLowerCase())
    );
  },
}));