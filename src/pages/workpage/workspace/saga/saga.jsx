import { useState, useEffect } from "react";
import NewSaga from "../../../../forms/newSaga";
import NewEndeavour from "../../../../forms/newEndeavour";
import NewQuest from "../../../../forms/newQuest";

const Saga = () => {
  const [toRender, setToRender] = useState("list");
  const [saga, setSaga] = useState(() => {
    const savedSaga = localStorage.getItem("saga");
    return savedSaga ? JSON.parse(savedSaga) : [];
  });
  const [currentSaga, setCurrentSaga] = useState(null);
  const [addQuestToThis, setAddQuestToThis] = useState(false);
  const [addEndeavourToThis, setAddEndeavourToThis] = useState(false);

  const handleNewSaga = () => {
    setToRender("addSaga");
  };

  const submit = (newSaga) => {
    if (newSaga === "cancel") {
      setToRender("list");
      return;
    }
    const updatedSagas = [...saga, newSaga];
    localStorage.setItem("saga", JSON.stringify(updatedSagas));
    setSaga(updatedSagas);
    setToRender("list");
  };

  useEffect(() => {
    localStorage.setItem("saga", JSON.stringify(saga));
  }, [saga]);

  const deleteSaga = () => {
    if (currentSaga) {
      const updatedSagas = saga.filter(
        (_, index) => index !== currentSaga.index
      );
      localStorage.setItem("saga", JSON.stringify(updatedSagas));
      setSaga(updatedSagas);
      setCurrentSaga(null);
      setToRender("list");
    }
  };

  const renderSagaList = () => {
    if (saga.length === 0) {
      return <p>No sagas available</p>;
    }

    return (
      <ul>
        {saga.map((s, index) => (
          <li
            key={index}
            style={{
              marginBottom: "10px",
              border: "1px solid #ddd",
              padding: "10px",
              cursor: "pointer",
            }}
            onClick={() => viewSaga(index)}
          >
            <div>
              <strong>Title:</strong> {s.title}
            </div>
            <div>
              <strong>Description:</strong> {s.description || "No Description"}
            </div>
          </li>
        ))}
      </ul>
    );
  };

  const viewSaga = (index) => {
    setCurrentSaga({ index, ...saga[index] });
    setToRender("sagaDetail");
  };

  const handleAddQuest = () => {
    setAddQuestToThis(true);
  };

  const handleAddEndeavour = () => {
    setAddEndeavourToThis(true);
  };

  const addQuest = (quest) => {
    if (currentSaga && quest !== "cancel") {
      const updatedSaga = {
        ...currentSaga,
        quests: [...currentSaga.quests, quest],
      };
      const updatedSagas = [...saga];
      updatedSagas[currentSaga.index] = updatedSaga;
      setSaga(updatedSagas);
      setCurrentSaga(updatedSaga);
      localStorage.setItem("saga", JSON.stringify(updatedSagas));
      setAddQuestToThis(false);
    }
  };

  const addEndeavour = (endeavour) => {
    if (currentSaga && endeavour !== "cancel") {
      const updatedSaga = {
        ...currentSaga,
        endeavours: [...(currentSaga.endeavours || []), endeavour],
      };
      const updatedSagas = [...saga];
      updatedSagas[currentSaga.index] = updatedSaga;
      setSaga(updatedSagas);
      setCurrentSaga(updatedSaga);
      localStorage.setItem("saga", JSON.stringify(updatedSagas));
      setAddEndeavourToThis(false);
    }
  };

  const renderSagaDetail = () => {
    if (!currentSaga) return null;

    return (
      <>
        <button onClick={() => setToRender("list")}>Back</button>
        <button onClick={deleteSaga}>Delete Saga</button>
        <h1 style={{ color: "aqua" }}>{currentSaga.title}</h1>
        <div>
          <strong>Description:</strong>{" "}
          {currentSaga.description || "No Description"}
        </div>
        <div>
          <strong>Deadline:</strong> {currentSaga.deadline || "No Deadline"}
        </div>
        <div>
          <strong>Tasks:</strong>{" "}
          {currentSaga.quests ? currentSaga.quests.length : 0}
        </div>
        {currentSaga.quests &&
          currentSaga.quests.map((quest, idx) => (
            <div key={idx}>
              <div>
                <strong>Quest Title:</strong> {quest.title}
              </div>
              <div>
                <strong>Description:</strong>{" "}
                {quest.description || "No Description"}
              </div>
            </div>
          ))}
        <div>
          <strong>Endeavours:</strong>{" "}
          {currentSaga.endeavours ? currentSaga.endeavours.length : 0}
        </div>
        {currentSaga.endeavours &&
          currentSaga.endeavours.map((endeavour, idx) => (
            <div key={idx}>
              <div>
                <strong>Endeavour Title:</strong> {endeavour.title}
              </div>
              <div>
                <strong>Description:</strong>{" "}
                {endeavour.description || "No Description"}
              </div>
            </div>
          ))}
        {!addQuestToThis && (
          <button onClick={handleAddQuest}>Add new quest</button>
        )}
        {!addEndeavourToThis && (
          <button onClick={handleAddEndeavour}>Add new Endeavour</button>
        )}
        {addQuestToThis && <NewQuest submit={addQuest} />}
        {addEndeavourToThis && <NewEndeavour submitE={addEndeavour} />}
      </>
    );
  };

  return (
    <>
      {toRender === "list" && (
        <>
          <button onClick={handleNewSaga}>New Saga</button>
          <br />
          <br />
          <br />
          {renderSagaList()}
        </>
      )}
      {toRender === "addSaga" && <NewSaga submit={submit} />}
      {toRender === "sagaDetail" && renderSagaDetail()}
    </>
  );
};

export default Saga;
