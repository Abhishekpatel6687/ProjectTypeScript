import { useSelector } from "react-redux";
import { useEffect, useState } from "react";
import type { RootState } from "../redux/store";
import type { FormEntry } from "../redux/slice/formDataSlice";

export const useCompleteTodos = (): FormEntry[] => {
  const todoData = useSelector((state: RootState) => state.formData.data);
  const [completeTodo, setCompleteTodo] = useState<FormEntry[]>([]);

  useEffect(() => {
    const filterData = todoData.filter((item) => item.status === true);
    setCompleteTodo(filterData);
  }, [todoData]);

  return completeTodo;
};
