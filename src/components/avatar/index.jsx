import "./avatar.css";

export default function Avatar({ avatarUrl, title, detail, profileId }) {
  return (
    <div className="avatar">
      <div
        className="avatar-image"
        style={{ backgroundImage: `url("${avatarUrl}")` }}
      ></div>
      <h3>{title}</h3>
      <p>{detail}</p>

      <a href={`/profile/${profileId}`}>View Profile</a>
    </div>
  );
}
