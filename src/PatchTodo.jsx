const PatchTodo = async ({ id, ...data }) => {
  console.log("RemoveTodo");
  try {
    fetch(`https://x8ki-letl-twmt.n7.xano.io/api:Rs1cOmM0/todo/${id}`, {
      method: "PATCH",
      body: JSON.stringify(data),
    }).then((data) => {
      return data.ok;
    });
  } catch (err) {
    console.error(err);
  }
  return;
};

export default PatchTodo;
