import Button from "../button";
import "./action.css";

export default function Action() {
  return (
    <div className="action">
      <div className="img">
        <img src="/speakerphone.png" />
      </div>
      <div className="details">
        <h3>You Can Also Go the Old Way of Hiring with Job Posts.</h3>
        <p>and Scheduling Meetings from Interested Experts </p>
        <Button>Post a Job</Button>
      </div>
    </div>
  );
}
