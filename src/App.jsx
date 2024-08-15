import { useState } from "react";
import Homepage from "./pages/homepage";
import Workpage from "./pages/workpage/workpage";

function App() {
  const [page, setPage] = useState("homepage");
  function next(page) {
    if (page === "homepage" || page === "workpage") {
      setPage(page);
    }
  }
  return (
    <>
      {page === "homepage" && <Homepage nextIs={next} />}
      {page === "workpage" && <Workpage />}
    </>
  );
}

export default App;
