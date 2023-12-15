import "./textarea.css";

export default function TextArea({
  label,
  value,
  setValue,
  type,
  error,
  ...props
}) {
  return (
    <div id="textarea" {...props}>
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
      <textarea
        type={type}
        value={value}
        className={`${!!error && "error-input"}`}
        onChange={(e) => setValue(e.target.value)}
      />
    </div>
  );
}
