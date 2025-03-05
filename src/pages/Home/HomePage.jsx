import { useContext, useEffect } from "react";
import { TodosContext } from "../../Context/TodoContext";
import { UserContext } from "../../Context/UserContext";
import { useNavigate } from "react-router-dom";
import { RequestTodos } from "../../RequestTodos";
import { postTodo } from "../../postTodo";
import Todo from "./components/Todo";
import TodoItem from "./components/TodoItem";
import Form from "../../components/Form";
import Input from "../../components/Input";
import Button from "../../components/Button";
import { useForm } from "react-hook-form";

const HomePage = () => {
  const { authToken, setAuthToken, userId } = useContext(UserContext);
  const { todos, setTodos } = useContext(TodosContext);
  const navigate = useNavigate();
  
  const {
    handleSubmit,
    register,
    formState: { isSubmitting, errors },
  } = useForm({ mode: "all" });

  const handleLogout = () => {
    localStorage.setItem("authToken", "");
    setAuthToken("");
  };

  useEffect(() => {
    if (authToken == "") {
      navigate("/");
    }
  }, [authToken, navigate]);

  useEffect(() => {
    RequestTodos().then((res) => setTodos(res));
  }, [setTodos]);
  const onSubmit = (data) => {
    postTodo(data, userId).then(() => {
      setTodos((prev) => [...prev, data]);
    });
    console.log(todos);
  };

  return (
    <>
      <header className="header">
        <button className="logout-button" onClick={handleLogout}>
          {" "}
          Log out
        </button>
      </header>
      <Form onSubmit={handleSubmit(onSubmit)} className="add-todo-form">
        <legend>Add Todo</legend>
        <Input
          {...register("title", {
            required: "title is requred",
          })}
          label="Title:"
          placeholder="write todo title"
          id="todotitle"
          type="text"
        />
        {errors?.title && <p className="error"> {errors.title?.message}</p>}
        <Input
          {...register("description", {
            required: "description is requred",
          })}
          label="Description:"
          placeholder="Write Todo Description"
          id="tododescription"
          type="text"
        />
        {errors?.description && (
          <p className="error"> {errors.description?.message}</p>
        )}

        <Button disabled={isSubmitting}>Add Todo</Button>
      </Form>
      <main>
        <Todo>
          {todos.length &&
            todos
              .filter((item) => {
                return item.user_id == userId;
              })
              .map((todoItem,i) => {
                return <TodoItem key={todoItem.id || i} todoItem={todoItem} />;
              })}
          {!todos.length && <span className="loading-text">Loading....</span>}
        </Todo>
      </main>
    </>
  );
};

export default HomePage;
