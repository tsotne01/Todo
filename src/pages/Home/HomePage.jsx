import { useContext,useEffect } from "react";
import { TodoProvider } from "../../Context/TodoContext";
import { UserContext } from "../../Context/UserContext";
import { useNavigate } from "react-router-dom";

const HomePage = () => {
  const { authToken, setAuthToken } = useContext(UserContext);
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.setItem("authToken","")
    setAuthToken("");
  };
  useEffect(() => {
    if (authToken == "") {
      navigate("/");
    }
  }, [authToken, navigate]);

  return (
    <TodoProvider>
      <div>auth token:{authToken}</div>
      <button onClick={handleLogout}> Log out</button>
    </TodoProvider>
  );
};

export default HomePage;
