import { useEffect, useState } from "react";
import NewEndeavour from "../../../../forms/newEndeavour";
import "../all-quests/quests.css";
import NewQuest from "../../../../forms/newQuest";
import "./endeavour.css";
const Endeavour = () => {
  const [toRender, setToRender] = useState("list");
  const [endeavour, setEndeavour] = useState([]);
  const [currentEndeavour, setCurrentEndeavour] = useState(null);
  const [addQuestToThis, setAddQuestToThis] = useState(false);

  useEffect(() => {
    if (!localStorage.getItem("endeavour")) {
      setEndeavour([
        {
          index: 0,
          title: "example-Group Project (click me)",
          description: "Plane and complete Economics Group Project",
          deadline: "2024-10-31",
          quests: [
            {
              is: "quest",
              title: "Choose Topic",
              description: "Discuss on which topic we want to make project on.",
              deadline: "",
              type: "dad",
              done: true,
            },
            {
              is: "quest",
              title: "Research",
              description: "Do basic research and see what we can make on it.",
              deadline: "",
              type: "dad",
              done: true,
            },
            {
              is: "quest",
              title: "Confirm Topic",
              description: "Confirm with everyone if they think topic is good.",
              deadline: "",
              type: "dad",
              done: true,
            },
            {
              is: "quest",
              title: "Divide Work",
              description:
                "Discuss what has to be done and divide work accordingly.",
              deadline: "",
              type: "dad",
              done: true,
            },
            {
              is: "quest",
              title: "Complete my task",
              description: "",
              deadline: "",
              type: "dad",
              done: true,
            },
            {
              is: "quest",
              title: "Presentation and review ",
              description: "Make Presentation and review it with professor.",
              deadline: "",
              type: "dad",
              done: false,
            },
            {
              is: "quest",
              title: "Report and review",
              description: "Make Report and review it with professor.",
              deadline: "",
              type: "dad",
              done: false,
            },
            {
              is: "quest",
              title: "Practice",
              description: "Practice how we want to give our presentation.",
              deadline: "",
              type: "dad",
              done: false,
            },
            {
              is: "quest",
              title: "Do it!!",
              description: "Submit report and give presentation. ",
              deadline: "",
              type: "dad",
              done: false,
            },
          ],
        },
      ]);
    } else {
      const storedEndeavour = localStorage.getItem("endeavour");
      if (storedEndeavour) {
        setEndeavour(JSON.parse(storedEndeavour));
      }
    }
  }, []);

  function handleNewEndeavour() {
    setToRender("addEndeavour");
  }

  function submitE(newEndeavour) {
    if (newEndeavour === "cancel") {
      setToRender("list");
      return;
    }
    const updatedEndeavour = [...endeavour, newEndeavour];
    localStorage.setItem("endeavour", JSON.stringify(updatedEndeavour));
    setEndeavour(updatedEndeavour);
    setToRender("list");
  }

  function openEndeavour(data, index) {
    setToRender("endeavour");
    setCurrentEndeavour({ index, ...data });
  }

  function renderEndeavourList() {
    if (endeavour.length === 0) {
      return <>No Endeavor Found</>;
    }
    return (
      <>
        {endeavour.map((data, index) => (
          <div
            className="endeavour"
            onClick={() => openEndeavour(data, index)}
            key={data.title + index}
          >
            <div className="title">{data.title}</div>
            <div className="deadline">{data.deadline || "No Deadline"}</div>
            <div className="description">{data.description || "..."}</div>
          </div>
        ))}
      </>
    );
  }

  const showDeadline = (quest) => {
    switch (quest.type) {
      case "dad":
        return quest.deadline || "No Deadline";
      case "daily":
        return "Daily Quest";
      case "weekly":
        return "Weekly Quest";
      default:
        return "No Deadline";
    }
  };

  const renderQuests = (quests) => {
    return quests.map((quest, index) => {
      const questClass = quest.done ? "quest isdone" : "quest";

      return (
        <div key={quest.id} id={index} className={questClass}>
          {" "}
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

  function renderEndeavour(end) {
    if (!end) return null;
    return (
      <>
        <button className="back-btn" onClick={() => setToRender("list")}>
          Back
        </button>{" "}
        <button className="del-btn" onClick={deleteE}>
          del
        </button>
        <h1 style={{ color: "aqua" }}>{end.title}</h1>
        {renderQuests(end.quests || [])}
        {!addQuestToThis && <button onClick={addQuest}>add quest</button>}
        {addQuestToThis && <NewQuest submit={submit} />}
      </>
    );
  }
  const submit = (data) => {
    console.log(data);
    setAddQuestToThis(false);
    let updatedEndeavour = currentEndeavour;
    if (currentEndeavour && data !== "cancel") {
      updatedEndeavour.quests.push(data);
    }
  };
  const deleteE = () => {
    if (currentEndeavour) {
      const newEndeavourList = endeavour.filter(
        (_, index) => index !== currentEndeavour.index
      );
      setEndeavour(newEndeavourList);
      localStorage.setItem("endeavour", JSON.stringify(newEndeavourList));
      console.log(newEndeavourList);
      setCurrentEndeavour(null);
      setToRender("list");
    }
  };

  const toggleDone = (id) => {
    if (currentEndeavour) {
      const updatedEndeavour = { ...currentEndeavour };
      if (updatedEndeavour.quests && id < updatedEndeavour.quests.length) {
        updatedEndeavour.quests[id].done = !updatedEndeavour.quests[id].done;
        const updatedEndeavourList = [...endeavour];
        updatedEndeavourList[currentEndeavour.index] = updatedEndeavour;
        setEndeavour(updatedEndeavourList);
        setCurrentEndeavour(updatedEndeavour);
        localStorage.setItem("endeavour", JSON.stringify(updatedEndeavourList));
        console.log(updatedEndeavourList);
      }
    }
  };
  const deleteQuest = (questIndex) => {
    if (currentEndeavour) {
      const updatedEndeavour = { ...currentEndeavour };

      if (
        updatedEndeavour.quests &&
        questIndex < updatedEndeavour.quests.length
      ) {
        updatedEndeavour.quests = updatedEndeavour.quests.filter(
          (_, index) => index !== questIndex
        );

        const updatedEndeavourList = [...endeavour];
        updatedEndeavourList[currentEndeavour.index] = updatedEndeavour;

        setEndeavour(updatedEndeavourList);
        setCurrentEndeavour(updatedEndeavour);

        localStorage.setItem("endeavour", JSON.stringify(updatedEndeavourList));
      }
    }
  };
  const addQuest = () => {
    setAddQuestToThis(true);
  };
  return (
    <>
      {toRender === "list" && (
        <>
          <button
            onClick={() => setTimeout(() => handleNewEndeavour(), 200)}
            className="add-endeavor"
          >
            +
          </button>
          <br />
          <br />
          <br />
          {renderEndeavourList()}
        </>
      )}
      {toRender === "addEndeavour" && <NewEndeavour submitE={submitE} />}
      {toRender === "endeavour" && renderEndeavour(currentEndeavour)}
    </>
  );
};

export default Endeavour;
