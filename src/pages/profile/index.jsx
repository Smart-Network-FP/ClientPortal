import { useEffect, useState } from "react";
import { Routes, Route, useParams } from "react-router-dom";

import Navbar from "../../components/navbar";
import Button from "../../components/button";
import Footer from "../../components/footer";
import Loading from "../../components/loading";
import "./profile.css";

const TopFrame = ({ avatarUrl, name, meta }) => {
  return (
    <div className="top-frame">
      <div
        className="profile-avatar"
        style={{ backgroundImage: `url("${avatarUrl}")` }}
      ></div>
      <h3 className="profile-name">{name}</h3>
      <p className="profile-meta">{meta}</p>
    </div>
  );
};

const Summary = ({ summary }) => {
  return (
    <div className="profile-sumamry">
      <h2>Summary</h2>
      <p>{summary}</p>
    </div>
  );
};

const WorkExperience = ({
  position,
  company,
  kind,
  duration,
  location,
  about = [],
}) => {
  return (
    <div className="work-exp">
      <h2>{position}</h2>
      <div style={{ display: "flex", flexDirection: "row" }}>
        <p>{company}</p> · <p>{kind}</p>
      </div>
      <p>{duration}</p>
      <p>{location}</p>

      <ul>
        {about.map((ab, idx) => (
          <li key={idx}>{ab}</li>
        ))}
      </ul>
    </div>
  );
};

const Skills = ({}) => {
  return (
    <div className="skills">
      <h2>Skills</h2>
    </div>
  );
};

export default function Profile() {
  const [isLoading, setLoading] = useState(true);
  const { id } = useParams();

  useEffect(() => {
    console.log(id);
    setLoading(false);
  }, []);

  const profile = {
    avatarUrl:
      "https://dfstudio-d420.kxcdn.com/wordpress/wp-content/uploads/2019/06/digital_camera_photo-1080x675.jpg",
    name: "John Doe",
    meta: "Sunnyvale, California, USA 92508",
    summary:
      "Smart Network is a web platform enabling clients to find and hire Experts in different domain who match their needs and Experts can create profile, showcase their expertise and apply for jobs.",
    workExperience: [
      {
        position: "Lead Product Designer",
        company: "Microsoft",
        kind: "Full-time",
        duration: "Jul 2021 - Present · 1 yr 9 mos",
        location: "Los Angles, California",
        about: [
          "Spearhead the product design and contributed to the development of 7+ digital products cutting across different industries and yielded great customer satisfaction.",
          "Spearhead the product design and contributed to the development of 7+ digital products cutting across different industries and yielded great customer satisfaction.",
          "Skills: Reactjs · JavaScript Libraries · Product Design · Product Development · Leadership · Prototyping · Figma (Software) · Communication · User Interface Prototyping · Adobe XD",
        ],
      },
      {
        position: "Lead Product Designer",
        company: "Microsoft",
        kind: "Full-time",
        duration: "Jul 2021 - Present · 1 yr 9 mos",
        location: "Los Angles, California",
        about: [
          "Spearhead the product design and contributed to the development of 7+ digital products cutting across different industries and yielded great customer satisfaction•Guide 4 Junior designers in the conceptualization and design of 2 digital products.",
          "Spearhead the product design and contributed to the development of 7+ digital products cutting across different industries and yielded great customer satisfaction •Guide 4 Junior designers in the conceptualization and design of 2 digital products.",
          "Skills: Reactjs · JavaScript Libraries · Product Design · Product Development · Leadership · Prototyping · Figma (Software) · Communication · User Interface Prototyping · Adobe XD",
        ],
      },
      {
        position: "Lead Product Designer",
        company: "Microsoft",
        kind: "Full-time",
        duration: "Jul 2021 - Present · 1 yr 9 mos",
        location: "Los Angles, California",
        about: [
          "Spearhead the product design and contributed to the development of 7+ digital products cutting across different industries and yielded great customer satisfaction•Guide 4 Junior designers in the conceptualization and design of 2 digital products.",
          "Spearhead the product design and contributed to the development of 7+ digital products cutting across different industries and yielded great customer satisfaction •Guide 4 Junior designers in the conceptualization and design of 2 digital products.",
          "Skills: Reactjs · JavaScript Libraries · Product Design · Product Development · Leadership · Prototyping · Figma (Software) · Communication · User Interface Prototyping · Adobe XD",
        ],
      },
    ],
  };

  if (isLoading) {
    return (
      <div
        style={{
          color: "#50E884",
          height: "100%",
          width: "100%",
          display: "grid",
          placeItems: "center",
        }}
      >
        <Loading />;
      </div>
    );
  }

  return (
    <div className="profile">
      <Navbar />
      <TopFrame {...profile} />
      <Summary {...profile} />

      {profile.workExperience.map((exp, index) => (
        <WorkExperience key={index} {...exp} />
      ))}

      <Skills />
      <div className="schedule-meeting-button">
        <Button>Schedule Meeting</Button>
      </div>

      <Footer />
    </div>
  );
}
