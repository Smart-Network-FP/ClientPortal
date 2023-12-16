import { useState, useEffect } from "react";
import { en, faker } from "@faker-js/faker";
import _ from "lodash";

import Navbar from "../../components/navbar";
import Search from "../../components/search";
import Action from "../../components/action";
import Footer from "../../components/footer";

import "./search.css";
import { getHomeExperts } from "../../plugins/api/search";

const SearchSection = ({ value, setValue }) => {
  return (
    <div className="search-section">
      <h1>We have found the Best Experts for you!</h1>

      <Search value={value} onChange={setValue} />

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
    id,
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
            <a href={`/profile/${id}`}>View Profile</a>
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
  const [searchText, setSearchText] = useState("");
  const [results, setResults] = useState([]);

  useEffect(() => {
    getHomeExperts(searchText).then((response) => {
      setResults(
        response.data.map((entry) => ({
          avatarUrl: faker.image.avatar({ height: 640, width: 480 }),
          name: _.get(entry, "firstName", "-") + _.get(entry, "lastName", "-"),
          summary: _.get(entry, "summary"),
          designations: _.get(entry, "industry"),
          skills: "",
          experience: "",
          id: _.get(entry, "id"),
        }))
      );
      console.log(response.data);
    });
  }, [searchText]);

  return (
    <div className="search-page">
      <Navbar />
      <SearchSection value={searchText} setValue={setSearchText} />
      <Results results={results} />
      <Action />
      <Footer />
    </div>
  );
}
