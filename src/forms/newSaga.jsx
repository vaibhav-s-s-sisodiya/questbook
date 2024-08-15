import { useState } from "react";
import PropTypes from "prop-types";
import NewQuest from "./newQuest.jsx";
import NewEndeavour from "./newEndeavour.jsx";
import FormSagaList from "../utilities/form-saga-list.jsx";

const NewSaga = ({ submit }) => {
  const [sagaTitle, setSagaTitle] = useState("");
  const [sagaDescription, setSagaDescription] = useState("");
  const [sagaDeadline, setSagaDeadline] = useState("");
  const [tasks, setTasks] = useState([]);
  const [add, setAdd] = useState("");

  function handleName(e) {
    setSagaTitle(e.target.value);
  }

  function handleDescription(e) {
    setSagaDescription(e.target.value);
  }

  function handleDeadline(e) {
    setSagaDeadline(e.target.value);
  }

  function handleSubmit(e) {
    e.preventDefault();
    const newSaga = {
      title: sagaTitle,
      description: sagaDescription,
      deadline: sagaDeadline,
      quests: tasks,
    };
    submit(newSaga);
  }

  function dataGet(data) {
    if (data === "cancel") {
      setAdd("");
    } else {
      setTasks((prevTasks) => [...prevTasks, data]);
      setAdd("");
    }
  }

  const handleCancel = () => {
    submit("cancel");
  };

  return (
    <>
      <form onSubmit={handleSubmit}>
        <button type="button" onClick={handleCancel}>
          Cancel
        </button>
        <input type="submit" value="Submit" />

        <input
          type="text"
          placeholder="Saga's Title"
          value={sagaTitle}
          onChange={handleName}
          required
        />

        <input
          type="text"
          placeholder="Saga's Description"
          value={sagaDescription}
          onChange={handleDescription}
        />

        <div>
          <label htmlFor="sagaDeadline">Saga Deadline</label>
          <input
            type="date"
            id="sagaDeadline"
            name="SagaDeadline"
            value={sagaDeadline}
            onChange={handleDeadline}
          />
        </div>

        {!add && (
          <div>
            <button type="button" onClick={() => setAdd("quest")}>
              Add new quest
            </button>
            <button type="button" onClick={() => setAdd("endeavor")}>
              Add new Endeavor
            </button>
          </div>
        )}
      </form>

      {add === "quest" && (
        <fieldset>
          <NewQuest submit={dataGet} />
        </fieldset>
      )}
      {add === "endeavor" && (
        <fieldset>
          <NewEndeavour submitE={dataGet} />
        </fieldset>
      )}

      <FormSagaList tasks={tasks} />
    </>
  );
};

NewSaga.propTypes = {
  submit: PropTypes.func.isRequired,
};

export default NewSaga;
