import "./input.css";

export default function Input({
  label,
  value,
  setValue,
  type,
  error,
  ...props
}) {
  return (
    <div id="input" {...props}>
      <div
        className={`${!!error && "error-label"}`}
        style={{
          display: "flex",
          flexDirection: "row",
          justifyContent: "space-between",
        }}
      >
        <label>{label}</label>
        {error && (
          <span
            style={{
              fontSize: "13px",
            }}
          >
            {error}
          </span>
        )}
      </div>
      <input
        type={type}
        value={value}
        className={`${!!error && "error-input"}`}
        onChange={(e) => setValue(e.target.value)}
      />
    </div>
  );
}
