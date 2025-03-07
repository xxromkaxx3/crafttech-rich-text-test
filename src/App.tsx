import { useRef, useState } from "react";
import "./App.css";
import './styles/styles.sass'
import Canvas from "./components/canvas/Canvas";
import Control from "./components/control/Control";
import { Stage } from "konva/lib/Stage";

function App() {
  const [tool, setTool] = useState("cursor");
  const stageRef = useRef<Stage>(null);
  return (
    <div className="wrap">
      <Canvas tool={tool} stageRef={stageRef} />
      <Control tool={tool} setTool={setTool} />
    </div>
  );
}

export default App;
