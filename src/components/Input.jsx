// eslint-disable-next-line react/prop-types
const Input = ({ label, id,error, ...props }) => {
  return (
    <>
      <div className="input-wrapper">
        <label className="label" htmlFor={id}>{label}</label>
        <input className="input" id={id} {...props} />
        {error && <p className="error">{error}</p>}
      </div>
    </>
  );
};

export default Input;
