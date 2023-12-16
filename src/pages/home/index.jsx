import { useEffect, useState } from "react";
import { faker } from "@faker-js/faker";

import Navbar from "../../components/navbar";
import Search from "../../components/search";
import Avatar from "../../components/avatar";
import Button from "../../components/button";
import Action from "../../components/action";
import Footer from "../../components/footer";
import Loading from "../../components/loading";
import "./home.css";

import { getHomeExperts } from "../../plugins/api/search";
import { useNavigate } from "react-router-dom";

const Hero = () => {
  const navigate = useNavigate();
  return (
    <div className="hero">
      <h1>Are you Looking for Experts to Hire?</h1>

      <Search onClick={() => navigate("/search")} />

      <img src="/hero-image-1.png" />

      <p>
        Smart Network is a web platform enabling clients to find and hire
        Experts in different domain who match their needs and Experts can create
        profile, showcase their expertise and apply for jobs.
      </p>
    </div>
  );
};

const TopExperts = ({ profiles }) => {
  return (
    <>
      <h2>Top Experts</h2>
      <div className="top-experts">
        {profiles.map(
          ({ firstName = "-", lastName = "-", industry = "-", id }) => (
            <Avatar
              key={id}
              avatarUrl={faker.image.avatarLegacy()}
              title={firstName + " " + lastName}
              detail={industry}
              profileId={id}
            />
          )
        )}
      </div>
    </>
  );
};

const Banner = () => {
  return (
    <div className="banner-home">
      <h2>
        Start Posting Your Job <br />
        for FREE today.
      </h2>
      <Button>Post a Job</Button>
    </div>
  );
};

const Information = () => {
  const patches = [
    {
      image: "/patch1.png",
      title: "AI Enabled Search",
      description:
        "Search by describing your project and AI wil find the best matched Experts for you.",
    },
    {
      image: "/patch2.png",
      title: "Expert Portfolio",
      description:
        "Experts showcase their expertise and experience in a detailed portfolio profile.",
    },
    {
      image: "/patch3.png",
      title: "Schedule a Meeting",
      description:
        "Schedule a short interview or virtual meeting with your selected Experts.",
    },
  ];

  const Patch = ({ image, title, description }) => {
    return (
      <div className="patch">
        <div style={{ backgroundImage: `url("${image}")` }}></div>
        <h4>{title}</h4>
        <p>{description}</p>
      </div>
    );
  };

  return (
    <div className="information">
      <h2>Hiring has never been this EASY.</h2>
      <p>
        Smart Network gives you a platform to choose from expert people and
        schedule a meeting on your preferred platform. Rest is up-to your
        process of selection and interviewing. Here hiring can be done in two
        ways. First you need to sign up. Then, you can make a job post and
        select from applicants or directly schedule a meeting with your
        preferred expert.
      </p>

      <div className="patches">
        {patches.map(({ image, title, description }, index) => (
          <Patch
            key={index}
            image={image}
            title={title}
            description={description}
          />
        ))}
      </div>
    </div>
  );
};

const TopJobs = ({ jobs = [] }) => {
  return (
    <>
      <h2>Top Jobs</h2>
      <div className="top-jobs">
        {jobs.map(({ jobName, company, kind, pay }, idx) => (
          <div key={idx}>
            <h4>{jobName}</h4>
            <span>
              <p>{company}</p>
              <p>{kind}</p>
              <p>{pay}</p>
            </span>
          </div>
        ))}
      </div>
      <a className="more-jobs">View More</a>
    </>
  );
};

export default function Home() {
  const [isLoading, setLoading] = useState(true);
  const [profiles, setProfiles] = useState([]);

  useEffect(() => {
    getHomeExperts()
      .then((response) => {
        setProfiles(response.data);
      })
      .finally(() => {
        setLoading(false);
      });
  }, []);

  // const profiles = [...Array(12).keys()].map(() => ({
  //   avatarUrl: faker.image.avatarLegacy(),
  //   title: faker.person.jobTitle(),
  //   detail: faker.person.jobDescriptor(),
  // }));

  const jobs = [...Array(40).keys()].map(() => ({
    jobName: faker.person.jobType(),
    company: faker.company.name(),
    kind: faker.person.jobArea(),
    pay:
      faker.finance.amount({ min: 78, max: 95, symbol: "$", dec: 0 }) +
      "k/year",
  }));

  if (isLoading) {
    return (
      <div className="home">
        <Loading />
      </div>
    );
  }

  return (
    <div className="home">
      <Navbar />
      <Hero />
      <TopExperts profiles={profiles} />
      <Banner />
      <Information />
      <Action />
      <TopJobs jobs={jobs} />
      <Footer />
    </div>
  );
}
