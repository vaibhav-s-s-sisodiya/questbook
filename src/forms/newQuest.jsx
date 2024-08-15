import { useState } from "react";
import PropTypes from "prop-types";
import "./newQuest.css";

const NewQuest = (props) => {
  const [questTitle, setQuestTitle] = useState("");
  const [questDescription, setQuestDescription] = useState("");
  const [questDeadline, setQuestDeadline] = useState("");
  const [questType, setQuestType] = useState("");

  const handleCancel = () => {
    setQuestTitle("");
    setQuestDescription("");
    setQuestDeadline("");
    setQuestType("");
    props.submit("cancel");
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const data = {
      is: "quest",
      title: questTitle,
      description: questDescription,
      deadline: questDeadline,
      type: questType || "dad",
      done: false,
    };
    setTimeout(() => props.submit(data), 300);
  };

  return (
    <form onSubmit={handleSubmit} className="new-quest">
      <div style={{ marginBottom: "20px" }}>
        <button
          className="cancel"
          type="button"
          onClick={() => {
            setTimeout(() => handleCancel(), 300);
          }}
        >
          {"  "}X{"  "}
        </button>
        <input type="submit" value="Add Quest" />
      </div>

      <input
        type="text"
        placeholder="Quest's Title"
        value={questTitle}
        className="new-quest-title"
        onChange={(e) => setQuestTitle(e.target.value)}
        maxLength={30}
        minLength={1}
        required
      />
      <br />
      <textarea
        placeholder="Quest's Description"
        value={questDescription}
        className="new-quest-description"
        onChange={(e) => setQuestDescription(e.target.value)}
        maxLength={125}
      />
      <br />
      <br />

      <fieldset
        style={{
          width: "50%",
          padding: "20px",
          marginTop: "none",
          boxShadow: " .2rem .2rem rgba(120,30,110,1)",
        }}
      >
        <legend style={{ fontSize: "1.25rem", marginBottom: "0px" }}>
          Type of Quest
        </legend>
        <div>
          <input
            type="radio"
            id="doneAndDusted"
            name="questType"
            value="dad"
            style={{ padding: "5px" }}
            checked={questType === "dad"}
            onChange={() => setQuestType("dad")}
          />
          <label style={{ padding: "5px" }} htmlFor="doneAndDusted">
            Done & Dusted
          </label>
        </div>
        <div>
          <input
            type="radio"
            id="daily"
            name="questType"
            value="daily"
            style={{ padding: "5px" }}
            checked={questType === "daily"}
            onChange={() => setQuestType("daily")}
          />
          <label style={{ padding: "5px" }} htmlFor="daily">
            Daily
          </label>
        </div>
        <div>
          <input
            type="radio"
            id="weekly"
            name="questType"
            value="weekly"
            style={{ padding: "5px" }}
            checked={questType === "weekly"}
            onChange={() => setQuestType("weekly")}
          />
          <label style={{ padding: "5px" }} htmlFor="weekly">
            Weekly
          </label>
        </div>
      </fieldset>
      <br />
      {questType === "dad" && (
        <input
          type="date"
          id="questDeadline"
          name="questDeadline"
          value={questDeadline}
          onChange={(e) => setQuestDeadline(e.target.value)}
        />
      )}
    </form>
  );
};

NewQuest.propTypes = {
  submit: PropTypes.func.isRequired,
};

export default NewQuest;
