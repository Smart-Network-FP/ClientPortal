import { useState, useContext, useEffect } from "react";
import _ from "lodash";

import Loading from "../loading";
import Input from "../input";
import TextArea from "../textarea";
import Button from "../button";
import "./form.css";

import UserContext from "../../context/UserContext";
import { saveExpertProfile, getProfile } from "../../plugins/api/profile";
import { useNavigate } from "react-router-dom";

const Experience = ({ removeExperience, onChange }) => {
  const [experience, setExperience] = useState({
    company: "",
    location: "",
    role: "",
    startDate: "",
    endDate: "",
    description: "",
  });

  const setExperienceAttr = (attribute, value) => {
    setExperience((experience) => ({
      ...experience,
      [attribute]: value,
    }));
    onChange(experience);
  };

  return (
    <div className="experience flex-col">
      <div className="flex-row">
        <Input
          label="Company"
          value={experience.company}
          setValue={(company) => setExperienceAttr("company", company)}
        />
        <Input
          label="Role"
          value={experience.role}
          setValue={(role) => setExperienceAttr("role", role)}
        />
      </div>
      <Input
        label="Location"
        value={experience.location}
        setValue={(location) => setExperienceAttr("location", location)}
      />
      <div className="flex-row">
        <Input
          label="Start Date"
          value={experience.startDate}
          setValue={(startDate) => setExperienceAttr("startDate", startDate)}
        />
        <Input
          label="End Date"
          value={experience.endDate}
          setValue={(endDate) => setExperienceAttr("endDate", endDate)}
        />
      </div>

      <TextArea
        label="Description"
        value={experience.description}
        setValue={(description) =>
          setExperienceAttr("description", description)
        }
      />

      <Button onClick={removeExperience} style={{ marginTop: "2rem" }}>
        Remove Experience
      </Button>
    </div>
  );
};

export default function Form({}) {
  const [user, setUser] = useContext(UserContext);
  const [isLoading, setLoading] = useState(true);
  const navigate = useNavigate();
  const [form, setForm] = useState({
    "personal-info": {
      firstName: "",
      lastName: "",
      industry: "",
      city: "",
      state: "",
      country: "",
      language: "",
      phoneNumber: "",
    },
    summary: "",
    experience: [],
  });

  const addExperience = () => {
    setForm((form) => ({
      ...form,
      experience: {
        ...form.experience,
        [Date.now()]: {},
      },
    }));
  };

  const removeExperience = (key) => {
    const experience = form.experience;
    delete experience[key];
    setForm((form) => ({
      ...form,
      experience,
    }));
  };

  const onExperienceChange = (key, data) => {
    setForm((form) => ({
      ...form,
      experience: {
        ...form.experience,
        [key]: data,
      },
    }));
  };

  const setPersonalInfoAttr = (label, value) => {
    setForm((form) => ({
      ...form,
      "personal-info": {
        ...form["personal-info"],
        [label]: value,
      },
    }));
  };

  const submit = () => {
    saveExpertProfile(user.tokens.access.token, form).then((response) => {
      console.log(response);
      // navigate(`/`);
    });
  };

  useEffect(() => {
    console.log(user);
    if (_.isEmpty(user.tokens)) {
      navigate("/login");
    }

    const id = _.get(user, "expert.id", null);
    const token = _.get(user, "tokens.access.token", null);
    getProfile(token, id)
      .then((response) => {
        console.log(response.data);
        setForm({
          "personal-info": _.pick(response.data, [
            "firstName",
            "lastName",
            "industry",
            "city",
            "state",
            "country",
            "language",
            "phoneNumber",
          ]),
          summary: _.get(response.data, "summary", ""),
          experience: _.fromPairs(
            _.map(response.data.experience, (exp) => [Date.now(), exp])
          ),
        });
      })
      .finally(() => {
        setLoading(false);
      });
  }, []);

  if (isLoading) {
    return (
      <div id="form">
        <Loading />
      </div>
    );
  }

  return (
    <div id="form flex-col">
      <div className="flex-row">
        <Input
          label="First Name"
          setValue={setPersonalInfoAttr.bind(this, "firstName")}
        />
        <Input
          label="Last Name"
          setValue={setPersonalInfoAttr.bind(this, "lastName")}
        />
      </div>

      <Input
        label="Phone Number"
        setValue={setPersonalInfoAttr.bind(this, "phoneNumber")}
      />

      <Input
        label="Country"
        setValue={setPersonalInfoAttr.bind(this, "country")}
      />
      <div className="flex-row">
        <Input
          label="State"
          setValue={setPersonalInfoAttr.bind(this, "state")}
        />
        <Input label="City" setValue={setPersonalInfoAttr.bind(this, "city")} />
      </div>
      <div className="flex-row">
        <Input
          label="Industry"
          setValue={setPersonalInfoAttr.bind(this, "industry")}
        />
        <Input
          label="language"
          setValue={setPersonalInfoAttr.bind(this, "language")}
        />
      </div>
      <TextArea
        label="Summary"
        setValue={(summary) => setForm((form) => ({ ...form, summary }))}
        style={{ margin: "1rem 0" }}
      />

      {Object.keys(form.experience).map((key) => (
        <Experience
          key={key}
          removeExperience={() => removeExperience(key)}
          onChange={onExperienceChange.bind(this, key)}
        />
      ))}

      <Button onClick={addExperience} secondary>
        Add Experience
      </Button>
      <Button onClick={submit} style={{ marginTop: "1rem" }}>
        Save
      </Button>
    </div>
  );
}
