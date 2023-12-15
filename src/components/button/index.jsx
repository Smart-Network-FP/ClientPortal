import Loading from "../loading";
import "./button.css";

export default function Button({ children, secondary, isLoading, ...props }) {
  return (
    <button {...props} className={`${secondary && "secondary"}`}>
      {isLoading ? <Loading /> : children}
    </button>
  );
}
