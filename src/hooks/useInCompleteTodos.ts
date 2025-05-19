import { useSelector } from "react-redux";
import type { RootState } from "../redux/store";

import { useEffect, useState } from "react";
import type { FormEntry } from "../redux/slice/formDataSlice";

export const useInCompleteTodos = (): FormEntry[] => {
  const todoData = useSelector((state: RootState) => state.formData.data);
  const [inCompleteTodo, setInCompleteTodo] = useState<FormEntry[]>([]);
  // console.log(todoData, "todoData");

  useEffect(() => {
    const filterData = todoData.filter((item) => item.status === false);
    setInCompleteTodo(filterData);
  }, [todoData]);

  return inCompleteTodo;
};
