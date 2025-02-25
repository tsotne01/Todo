import { TodoProvider } from "../../Context/TodoContext";

const HomePage = () => {
  return (
    <TodoProvider>
      <div>HomePage</div>
    </TodoProvider>
  );
};

export default HomePage;
