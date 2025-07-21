import { create } from "zustand";
import { type ITodo } from "../hooks/useFetchTodos";

export interface ITodosStore {
  todos: ITodo[];
  searchInput: string;
  setTodos: (todos: ITodo[]) => void;
  setSearchInput: (input: string) => void;
}

// TODO: добавить метод фильтрации
export const useTodosStore = create<ITodosStore>((set, get) => ({
  todos: [],
  searchInput: "",
  setTodos: (todos) => set({ todos }),
  setSearchInput: (input) => set({ searchInput: input }),
}));