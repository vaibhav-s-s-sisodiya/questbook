import FormQuestList from "./form-quest-list";

const FormSagaList = ({ tasks }) => {
  return tasks.map((task, index) => {
    if (task.is == "quest") {
      return (
        <div
          key={`task-${index + Math.random()}`}
          style={{ marginTop: "20px" }}
        >
          <FormQuestList quests={[task]} />
        </div>
      );
    } else {
      return (
        <div
          key={`task-${index + Math.random()}`}
          style={{ marginTop: "20px" }}
        >
          <h2>{task.title}</h2>

          <FormQuestList quests={task.quests} />
        </div>
      );
    }
  });
};

export default FormSagaList;
