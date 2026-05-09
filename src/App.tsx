import React, { InputEventHandler, useState } from "react";
import { Routes, Route, useNavigate, useLocation } from "react-router-dom";
import { useTracerStore } from "@bka-stuff/pe-mfe-utils";
import "./index.css";

const App: React.FC = () => {
  const navigate = useNavigate();
  const location = useLocation();
  console.log("Remote App One render", location.pathname);

  function Home() {
    console.log("rendering Home");
    const navigate = useNavigate();
    const { addTraceId } = useTracerStore();
    const [label, setLabel] = useState("");
    const [id, setId] = useState(1234);

    return (
      <div>
        <h1>Hey there!</h1>
        <button onClick={() => navigate("feck")}>Feck!</button>
        <br />
        <form
          onSubmit={(e) => {
            e.preventDefault();
            addTraceId({
              id: id.toString(),
              label: `I declare a thumb ${label}!`,
            });
            setId(id + 1);
            setLabel("");
          }}
        >
          <input
            type="text"
            className="tw:border tw:border-blue"
            value={label}
            onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
              setLabel(e.target.value)
            }
            autoFocus
          />
          <button hidden></button>
        </form>
      </div>
    );
  }

  function Feck() {
    console.log("rendering Feck");
    return <div>Hey there, Feck!</div>;
  }

  function NotFound() {
    console.log("rendering NotFound");
    return <div>Error, Will Robinson!</div>;
  }

  return (
    <Routes>
      <Route index element={<Home />} />
      <Route path="feck" element={<Feck />} />
      <Route path="*" element={<NotFound />} />
    </Routes>
  );
};

export default App;
