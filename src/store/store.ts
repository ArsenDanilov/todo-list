import { create } from "zustand";
import { type ITodo } from "../hooks/useFetchTodos";

export interface ITodosStore {
  todos: ITodo[];
  searchInput: string;
  setTodos: (todos: ITodo[]) => void;
  setSearchInput: (input: string) => void;
}

export const useTodosStore = create<ITodosStore>((set) => ({
  todos: [],
  searchInput: "",
  setTodos: (todos) => set({ todos }),
  setSearchInput: (input) => set({ searchInput: input }),
}));