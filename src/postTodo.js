export const postTodo = async (data, user_id) => {
  const { title, description } = data;
  try {
    fetch("https://x8ki-letl-twmt.n7.xano.io/api:Rs1cOmM0/todo", {
      method: "POST",
      headers: {
        "Content-Type": "application/json;charset=utf-8",
      },
      body: JSON.stringify({
        title,
        description,
        completed: false,
        due_date: new Date().toDateString(),
        user_id,
      }),
    });
  } catch (error) {
    console.error(error);
  }
};
