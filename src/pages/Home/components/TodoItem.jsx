import { useState } from "react";

// eslint-disable-next-line react/prop-types
const TodoItem = ({ todoItem }) => {
  // eslint-disable-next-line react/prop-types
  const { id, title, description, completed } = todoItem;
  const [checkboxStatus, setCheckboxStatus] = useState(completed);
  const handleRemoveTodo = () => {
    console.log("remove todoo");
  };
  const handleStatusChange = () => {
    console.log("todo status change handler");
    setCheckboxStatus((prev) => !prev);
  };

  return (
    <li className="todo-item">
      <div key={id}>
        <span className="todo-title">title:</span>
        <h1 className="todo-item-title">{title}</h1>
        <span className="todo-description">description:</span>
        <p className="todo-description"> {description}</p>
      </div>
      <div className="buttons-wrapper">
        <button onClick={handleRemoveTodo} className="delete-button">
          Delete
        </button>
        <div className="checkbox-wrapper">
          <span className="status-text">status</span>
          <input
            checked={checkboxStatus ? true : false}
            onChange={handleStatusChange}
            className="status-checkbox"
            type="checkbox"
          />
        </div>
      </div>
    </li>
  );
};

export default TodoItem;
