import { faker } from "@faker-js/faker";
import Navbar from "../../components/navbar";
import Search from "../../components/search";
import Action from "../../components/action";
import Footer from "../../components/footer";

import "./search.css";

const SearchSection = () => {
  return (
    <div className="search-section">
      <h1>We have found the Best Experts for you!</h1>

      <Search />

      <img src="/hero-image-1.png" />

      <p>
        From your project details seems like you are looking for a front end
        developer who is expert in CSS, HTML and JavaScript. Here are the best
        matched EXPERT profiles.
      </p>
    </div>
  );
};

const Results = ({ results }) => {
  const Result = ({
    avatarUrl,
    name,
    skills,
    summary,
    experience,
    designations,
  }) => {
    return (
      <div className="result">
        <div
          className="result-avatar"
          style={{ backgroundImage: `url("${avatarUrl}")` }}
        ></div>
        <div className="details">
          <div className="detail">
            <b>{name}</b>
          </div>
          <div className="detail">
            <label>Skills</label>
            <p>{skills}</p>
          </div>
          <div className="detail">
            <label>Summary</label>
            <p>{summary}</p>
          </div>
          <div className="detail">
            <label>Experience</label>
            <p>{experience}</p>
          </div>
          <div className="detail">
            <label>Designations</label>
            <p>{designations}</p>
          </div>

          <span style={{ width: "100%" }}>
            <a href="/profile/1">View Profile</a>
          </span>
        </div>
      </div>
    );
  };

  return (
    <>
      <h2>Top Results</h2>
      <div className="results">
        {results.map((result, index) => (
          <Result key={index} {...result} />
        ))}
      </div>
    </>
  );
};

export default function SearchPage() {
  const results = [...Array(40).keys()].map(() => ({
    avatarUrl: faker.image.avatar({ height: 640, width: 480 }),
    name: faker.name.firstName() + " " + faker.name.lastName(),
    skills: "HTML, CSS, JavaScript",
    summary:
      "My passion lies in the art of creating customer-centric products that have a meaningful impact on people's lives. With years of experience in the startup world, I've had the privilege of learning from both successes and challenges, which have shaped my approach to Product Management.",
    experience: "4Years and 8 Months",
    designations: "Head of Development, Meta",
  }));

  return (
    <div className="search-page">
      <Navbar />
      <SearchSection />
      <Results results={results} />
      <Action />
      <Footer />
    </div>
  );
}
