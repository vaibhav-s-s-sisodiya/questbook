import { useState, useEffect } from "react";
import NewQuest from "../../../../forms/newQuest";
import "./quests.css";

const Quests = () => {
  const [addQuest, setAddQuest] = useState(false);
  const [allQuest, setAllQuest] = useState([]);

  useEffect(() => {
    if (!localStorage.getItem("quest")) {
      setAllQuest([
        {
          done: false,
          title: "example 1- Exercise",
          description: "example 1- Exercise 3 times a day",
          deadline: "No Deadline",
          type: "weekly",
        },
        {
          done: false,
          title: "example 2 - Homework",
          description: "Complete physics homework",
          deadline: "2024-08-31",
          type: "dad",
        },
        {
          done: false,
          title: "example 3 -Water Plants",
          description: "",
          deadline: "No Deadline",
          type: "daily",
        },
      ]);
    } else {
      const storedQuests = localStorage.getItem("quest");
      if (storedQuests) {
        setAllQuest(JSON.parse(storedQuests));
      }
    }
  }, []);

  const submit = (data) => {
    if (data === "cancel") {
      setAddQuest(false);
      return;
    }

    const newQuest = {
      done: false,
      title: data.title,
      description: data.description,
      deadline: data.deadline || "No Deadline",
      type: data.type,
    };

    const updatedQuests = [...allQuest, newQuest];
    localStorage.setItem("quest", JSON.stringify(updatedQuests));
    setAllQuest(updatedQuests);
    setAddQuest(false);
  };

  const deleteQuest = (i) => {
    const updatedQuests = allQuest.filter((_, index) => index !== i);
    localStorage.setItem("quest", JSON.stringify(updatedQuests));
    setAllQuest(updatedQuests);
  };

  const toggleDone = (i) => {
    const updatedQuests = allQuest.map((quest, index) =>
      index === i ? { ...quest, done: !quest.done } : quest
    );
    localStorage.setItem("quest", JSON.stringify(updatedQuests));
    setAllQuest(updatedQuests);
  };

  const showDeadline = (quest) => {
    switch (quest.type) {
      case "dad":
        return quest.deadline;
      case "daily":
        return "Daily Quest";
      case "weekly":
        return "Weekly Quest";
      default:
        return "No deadline";
    }
  };

  const renderQuests = (quests) => {
    return quests.map((quest, index) => {
      const questClass = quest.done ? "quest isdone" : "quest";

      return (
        <div key={quest.index} id={index} className={questClass}>
          <div className="done">
            <input
              type="checkbox"
              checked={quest.done}
              onChange={() => toggleDone(index)}
            />
            <button onClick={() => deleteQuest(index)}>Delete</button>
          </div>
          <div className="title">{quest.title}</div>
          <div className="deadline">{showDeadline(quest)}</div>
          <div className="description">{quest.description}</div>
        </div>
      );
    });
  };

  return (
    <>
      {!addQuest && (
        <button
          className="add-quest"
          onClick={() => {
            setTimeout(() => setAddQuest(true), 100);
          }}
        >
          <strong style={{ fontSize: "1.5rem" }}>+</strong>
        </button>
      )}
      <br />
      <div className="form">{addQuest && <NewQuest submit={submit} />}</div>

      {!addQuest && (
        <>
          {renderQuests(allQuest)}
          {allQuest.length === 0 && (
            <div style={{ marginBottom: "20px", marginTop: "10px" }}>
              No current Quests
            </div>
          )}
        </>
      )}
    </>
  );
};

export default Quests;
