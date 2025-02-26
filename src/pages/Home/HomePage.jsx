import { useContext, useEffect } from "react";
import { TodosContext } from "../../Context/TodoContext";
import { UserContext } from "../../Context/UserContext";
import { useNavigate } from "react-router-dom";
import { RequestTodos } from "../../RequestTodos";
import Todo from "./components/Todo";
import TodoItem from "./components/TodoItem";

const HomePage = () => {
  const { authToken, setAuthToken, userId } = useContext(UserContext);
  const { todos } = useContext(TodosContext);
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.setItem("authToken", "");
    setAuthToken("");
  };
  useEffect(() => {
    if (authToken == "") {
      navigate("/");
    }
  }, [authToken, navigate]);
  RequestTodos();

  return (
    <>
      <header className="header">
        <button className="logout-button" onClick={handleLogout}>
          {" "}
          Log out
        </button>
      </header>
      <main>
        <Todo>
          {todos.length &&
            todos
              .filter((item) => {
                return item.user_id == userId;
              })
              .map((todoItem) => {
                return <TodoItem key={todoItem.id} todoItem={todoItem} />;
              })}
          {!todos.length && <span className="loading-text">Loading....</span>}
        </Todo>
      </main>
    </>
  );
};

export default HomePage;
