import PropTypes from "prop-types";

const FormQuestList = ({ quests }) => {
  function typeIs(type) {
    switch (type) {
      case "dad":
        return "Done and Dusted Quest";
      case "daily":
        return "Daily Quest";
      case "weekly":
        return "Weekly Quest";
      default:
        return "Unknown Type";
    }
  }

  const showDeadline = (quest) => {
    switch (quest.type) {
      case "dad":
        return quest.deadline || "None";
      case "daily":
        return "Daily Quest";
      case "weekly":
        return "Weekly Quest";
      default:
        return "None";
    }
  };

  if (quests.length === 0) {
    return <h3>No Quests here...</h3>;
  }

  return (
    <div className="quest-list-container">
      {quests.map((quest, index) => {
        if (quest.is === "quest") {
          return (
            <div key={quest.id || `quest-${index}`} className="quest-item">
              Quest -{" "}
              <strong style={{ color: "rgba(215,120,150,.8)" }}>
                {quest.title}
              </strong>{" "}
              deadline is {showDeadline(quest)} and it is a {typeIs(quest.type)}
              <div className="description">{quest.description}</div>
            </div>
          );
        }
      })}
    </div>
  );
};

FormQuestList.propTypes = {
  quests: PropTypes.array.isRequired,
};

export default FormQuestList;
