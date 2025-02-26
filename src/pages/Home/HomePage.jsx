import { useContext, useEffect } from "react";
import { TodosContext } from "../../Context/TodoContext";
import { UserContext } from "../../Context/UserContext";
import { useNavigate } from "react-router-dom";
import { RequestTodos } from "../../RequestTodos";

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
      <div>
        {/* auth token:{authToken}
        user id: {userId} */}

        {todos.length &&
          todos
            .filter((item) => {
              return item.user_id == userId;
            })
            .map((todoItem) => {
              return (
                <li key={todoItem.id}>
                  <h1>title: {todoItem.title}</h1>
                  <p>description: {todoItem.description}</p>
                </li>
              );
            })}
        {!todos.length && <span className="loading-text">Loading....</span>}
      </div>
      <button className="logout-button" onClick={handleLogout}>
        {" "}
        Log out
      </button>
    </>
  );
};

export default HomePage;
