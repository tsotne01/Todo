export const RequestTodos = async () => {
  try {
    const data = fetch("https://x8ki-letl-twmt.n7.xano.io/api:Rs1cOmM0/todo")
      .then((res) => res.json())
      .then((data) => {
        return data;
      });
    return data;
  } catch (err) {
    console.error(err);
  }

  return;
};
