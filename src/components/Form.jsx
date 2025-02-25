// eslint-disable-next-line react/prop-types
function Form({ onSubmit,page, children }) {
  return (
    <form className="login-form" onSubmit={onSubmit}>
      <legend className="login-legend">{page}</legend>

      {children}
    </form>
  );
}

export default Form;
