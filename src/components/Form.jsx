// eslint-disable-next-line react/prop-types
function Form({ onSubmit, children }) {
  return (
    <form className="login-form" onSubmit={onSubmit}>
      <legend className="login-legend">Login</legend>

      {children}
    </form>
  );
}

export default Form;
