import { useContext, useEffect } from "react";
import { TodosContext } from "./Context/TodoContext";

export const RequestTodos = () => {
  const { setTodos } = useContext(TodosContext);

  useEffect(() => {
    try {
      fetch("https://x8ki-letl-twmt.n7.xano.io/api:Rs1cOmM0/todo")
        .then((res) => res.json())
        .then((data) => setTodos(() => data));
    } catch (err) {
      console.error(err);
    }
  }, []);

  //   const filterTodos = ()=>{
  //     setTodos(todos.filter((item)=> item.user_id !== userId));
  //   }

  //   filterTodos();

  return;
};
