import { useState } from "react";
import PropTypes from "prop-types";
import NewQuest from "./newQuest.jsx";
import FormQuestList from "../utilities/form-quest-list.jsx";
import "./newEndeavour.css";

const NewEndeavour = ({ submitE }) => {
  const [endeavourTitle, setEndeavourTitle] = useState("");
  const [endeavourDescription, setEndeavourDescription] = useState("");
  const [endeavourDeadline, setEndeavourDeadline] = useState("");
  const [endeavour, setEndeavour] = useState([]);
  const [addEQuest, setAddEQuest] = useState(false);

  const handleName = (e) => {
    setEndeavourTitle(e.target.value);
  };

  const handleDescription = (e) => {
    setEndeavourDescription(e.target.value);
  };

  const handleDeadline = (e) => {
    setEndeavourDeadline(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const newEndeavour = {
      title: endeavourTitle,
      description: endeavourDescription,
      deadline: endeavourDeadline,
      quests: endeavour,
    };
    submitE(newEndeavour);
  };

  const submit = (data) => {
    if (data === "cancel") {
      setAddEQuest(false);
    } else {
      setEndeavour([...endeavour, data]);
      setAddEQuest(false);
    }
  };

  const handleCancel = () => {
    submitE("cancel");
  };

  return (
    <div className="new-endeavour">
      <form onSubmit={handleSubmit} className="new-endeavour-form">
        <div>
          {" "}
          <button
            type="button"
            onClick={handleCancel}
            className="cancel"
            aria-label="Cancel"
          >
            X
          </button>{" "}
          <input type="submit" value="Submit Endeavor" />
        </div>
        <input
          type="text"
          placeholder="Endeavour's Title"
          className="new-endeavour-title"
          value={endeavourTitle}
          onChange={handleName}
          required
        />
        <textarea
          type="text"
          placeholder="Endeavour's Description"
          value={endeavourDescription}
          className="new-endeavour-description"
          onChange={handleDescription}
        />
        <br />
        <div>
          <label htmlFor="endeavourDeadline">Endeavour Deadline</label>
          <input
            type="date"
            id="endeavourDeadline"
            name="endeavourDeadline"
            value={endeavourDeadline}
            onChange={handleDeadline}
          />
        </div>
        {!addEQuest && (
          <button
            type="button"
            className="add-new-quest"
            onClick={() => setAddEQuest(true)}
          >
            Add new quest
          </button>
        )}
        <br />
      </form>
      <br />
      {addEQuest && <NewQuest submit={submit} />}
      <br />
      <br />
      <FormQuestList quests={endeavour} />
    </div>
  );
};

NewEndeavour.propTypes = {
  submitE: PropTypes.func.isRequired,
};

export default NewEndeavour;
