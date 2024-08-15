import { useState } from "react";
import "./navbar.css";
import PropTypes from "prop-types";

const Navbar = ({ select }) => {
  const [selected, setSelected] = useState("");

  const handleClick = (buttonName) => {
    setSelected(buttonName);
    select(buttonName);
  };

  return (
    <>
      <div id="taskbar">
        <ul>
          {/* <li className={selected === "urgent" ? "selected" : ""}>
            <button onClick={() => handleClick("urgent")}>Urgent Tasks</button>
          </li>
          <li className={selected === "daily" ? "selected" : ""}>
            <button onClick={() => handleClick("daily")}>Daily Quests</button>
          </li> */}
          <li className={selected === "quests" ? "selected" : ""}>
            <button onClick={() => handleClick("quests")}>Your Quests</button>
          </li>
          <li className={selected === "endeavour" ? "selected" : ""}>
            <button onClick={() => handleClick("endeavour")}>
              Your Endeavor
            </button>
          </li>
          {/* <li className={selected === "saga" ? "selected" : ""}>
            <button onClick={() => handleClick("saga")}>Your Saga</button>
          </li> */}
          <li>Made by Vaibhav Sisodiya</li>
        </ul>
      </div>
    </>
  );
};
Navbar.propTypes = {
  select: PropTypes.func.isRequired,
};
export default Navbar;
