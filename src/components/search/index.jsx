import _ from "lodash";
import "./search.css";

export default function Search({ value = "", onChange = _.noop, ...props }) {
  return (
    <div className="search" {...props}>
      <label>Search Now</label>
      <input
        value={value}
        onChange={onChange}
        placeholder="Describe your Project, what expertise you’re looking for"
      />
    </div>
  );
}
