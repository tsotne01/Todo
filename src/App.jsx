import { Route, Routes } from "react-router-dom";
import HomePage from "./pages/Home/HomePage";
import LoginPage from "./pages/Login/LoginPage";
import SignUp from "./pages/SignUp/SignUp";
import NotFound from "./pages/NotFound/NotFound";
import { UserProvider } from "./Context/UserContext";
import { TodoProvider } from "./Context/TodoContext";
// import { UserProvider } from "./Context/UserContext";

const App = () => {
  return (
    <UserProvider>
      <Routes>
        <Route path="/" element={<LoginPage />} index />
        <Route path="/signup" element={<SignUp />} />
        <Route path="/home" element={<TodoProvider><HomePage /></TodoProvider>} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </UserProvider>
  );
};

export default App;
