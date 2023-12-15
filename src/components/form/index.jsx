import { useState } from "react";
import Input from "../input";
import TextArea from "../textarea";
import Button from "../button";
import "./form.css";

export default function Form({}) {
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
    experience: {},
  });

  const Experience = ({ removeExperience, dict_key }) => {
    const setValue = (label, value) => {
      const Form = Object.assign({}, form);
      Form.experience[dict_key][label] = value;
      setForm(Form);
    };

    return (
      <div className="experience flex-col">
        <div className="flex-row">
          <Input
            label="Company"
            value={form.experience[dict_key].company}
            setValue={(company) => setValue("company", company)}
          />
          <Input
            label="Role"
            value={form.experience[dict_key].role}
            setValue={(email) => setForm({ ...form, email })}
          />
        </div>
        <Input
          label="Location"
          value={form.experience[dict_key].location}
          setValue={(email) => setForm({ ...form, email })}
        />
        <div className="flex-row">
          <Input
            label="Start Date"
            value={form.experience[dict_key].startDate}
            setValue={(email) => setForm({ ...form, email })}
          />
          <Input
            label="End Date"
            value={form.experience[dict_key].endDate}
            setValue={(email) => setForm({ ...form, email })}
          />
        </div>

        <TextArea
          label="Description"
          value={form.experience[dict_key].description}
          setValue={(email) => setForm({ ...form, email })}
        />

        <Button onClick={removeExperience} style={{ marginTop: "2rem" }}>
          Remove Experience
        </Button>
      </div>
    );
  };

  return (
    <div id="form flex-col">
      <div className="flex-row">
        <Input label="First Name" />
        <Input label="Last Name" />
      </div>

      <Input label="Phone Number" />

      <Input label="Country" />
      <div className="flex-row">
        <Input label="State" />
        <Input label="City" />
      </div>
      <div className="flex-row">
        <Input label="Industry" />
        <Input label="language" />
      </div>
      <TextArea label="Summary" style={{ margin: "1rem 0" }} />

      {Object.keys(form.experience).map((key) => (
        <Experience
          removeExperience={() => {
            const experience = form.experience;
            delete experience[key];
            setForm((form) => ({
              ...form,
              experience,
            }));
          }}
          key={key}
          dict_key={key}
        />
      ))}

      <Button
        onClick={() => {
          setForm((form) => ({
            ...form,
            experience: {
              ...form.experience,
              [Date.now()]: {
                company: "abc",
                location: "California",
                role: "SE",
                startDate: "Dec, 2023",
                endDate: "Dec, 2023",
                description: "qwertgfxcvbn",
              },
            },
          }));
        }}
        secondary
      >
        Add Experience
      </Button>
    </div>
  );
}
