import "./App.css";
import { Routes, Route } from "react-router-dom";
import Survey from "./Pages/Survey";
import NotFound from "./Pages/NotFound";
import Submitted from "./Pages/Submitted";

function App() {
  return (
    <div>
      <Routes>
        <Route path="/survey" element={<Survey />} />
        <Route path="/*" element={<NotFound />} />
        <Route path="/500" element={<Submitted />} />
      </Routes>
    </div>
  );
}

export default App;
