export default function Input({ value, label, name, error, ...rest }) {
  // console.log(value);
  return (
    <div className="mb-3">
      <label htmlFor={name} className="form-label">
        {label}
      </label>

      <input
        name={name}
        // defaultValue={value}
        value={value}
        {...rest}
        id={name}
        autoComplete="on"
        className="form-control"
      />

      {error && <div className="alert alert-danger">{error}</div>}
    </div>
  );
}
