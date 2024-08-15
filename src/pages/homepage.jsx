import PropTypes from "prop-types";
import "./homepage.css";

const Homepage = ({ nextIs }) => {
  function sendData(data) {
    nextIs(data);
  }
  return (
    <div className="homepage">
      <h1 className="homepage">QUESTBOOK</h1>
      <p className="homepage">
        {" "}
        Questbook is a task planer and project manager. Here you can create many
        different types of &apos;Quests&apos; and set xp it provides. If you
        want You can ignore the whole xp things but then it will be just every
        old boring task planer. The main aim to make this was to :
      </p>
      <ul className="homepage">
        <li className="homepage">
          Make a task planner for myself which make me want to do things done
        </li>
        <li className="homepage">Practice coding</li>
      </ul>

      <br />
      <br />
      <div id="start">
        <hr />
        <button
          className="homepage"
          onClick={() => setTimeout(() => sendData("workpage"), 300)}
        >
          Let&apos;s Start
        </button>
        <hr />
      </div>
      {/* <br />
      <br />

      <p>
        If you want to know How it works you can look click below. I promise to
        keep it simple and short :
      </p>
      <div id="index">
        <div>
          <button onClick={() => sendData("about")}>
            About different Quests
          </button>
        </div>
        <div>
          <button onClick={() => sendData("about")}>
            About xp and Level Ups
          </button>
        </div>
        <div>
          <button onClick={() => sendData("about")}>About Me</button>
        </div>
      </div> */}
    </div>
  );
};
Homepage.propTypes = {
  nextIs: PropTypes.func.isRequired,
};
export default Homepage;
