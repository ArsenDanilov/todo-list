import { create, type StateCreator } from "zustand";
import { createJSONStorage, devtools, persist } from "zustand/middleware";
import { immer } from "zustand/middleware/immer";

export interface ITodo {
  userId: number;
  id: number;
  title: string;
  completed: boolean;
} 

interface IActions {
  setTodos: (todos: ITodo[]) => void;
  setSearchInput: (input: string) => void;
  getFilteredTodos: (searchInput: string) => ITodo[];
}

interface IInitialState  {
  todos: ITodo[];
  searchInput: string;
}

interface ITodosState extends IActions, IInitialState {};

const todosStore: StateCreator<ITodosState, [
  ["zustand/immer", never],
  ["zustand/devtools", never],
  ["zustand/persist", unknown]
]> = ((set, get) => ({
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
}))

export const useTodosStore = create<ITodosState>()(
  immer(
    devtools(
      persist(
        todosStore, {
          name: "todos-storage",
          storage: createJSONStorage(() => localStorage),
        }
      )
    )
  )
)