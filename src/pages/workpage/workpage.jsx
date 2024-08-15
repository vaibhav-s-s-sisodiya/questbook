import Navbar from "./navbar";
import Quests from "./workspace/all-quests/quests";
import Endeavour from "./workspace/endeavour/endeavor";
import Saga from "./workspace/saga/saga";
import "./workpage.css";
import { useState } from "react";

const Workpage = () => {
  const [selected, setSelected] = useState("");
  function isSelected(name) {
    setSelected(name);
  }
  return (
    <div id="main">
      <Navbar select={isSelected} />
      <div id="workspace">
        {selected === "quests" && <Quests />}
        {selected === "endeavour" && <Endeavour />}
        {selected === "saga" && <Saga />}
      </div>
    </div>
  );
};

export default Workpage;
