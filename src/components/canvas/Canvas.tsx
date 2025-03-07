import { MutableRefObject, useState } from "react";
import { Layer, Stage } from "react-konva";
import Shape from "../shape/Shape";
import { IEditingFigureValues, IFigure } from "../../tyoes/types";
import { KonvaEventObject } from "konva/lib/Node";
import { Stage as StageType} from "konva/lib/Stage";

interface ICanvasProps {
  tool: string
  stageRef: MutableRefObject<StageType | null>
}

const Canvas = ({ tool, stageRef }: ICanvasProps) => {
  const [figures, setFigures] = useState<IFigure[]>([]);

  const handleOnClick = (e: KonvaEventObject<MouseEvent>) => {
    if (tool === "cursor") return;
    const stage = e.target.getStage();
    if (!stage) return
    const stageOffset = stage.absolutePosition();
    const point = stage.getPointerPosition();
    if (!point) return
    setFigures((prev: IFigure[]) => [
      ...prev,
      {
        id: Date.now().toString(36),
        width: '100',
        height: '100',
        type: "rect",
        x: point.x - stageOffset.x,
        y: point.y - stageOffset.y,
        html: '',
        text: "",
        borderRadius: '0',
        fill: '#FFFFFF00',
        stroke: 'black'
      },
    ]);
  };
  
  const handleTextChange = (text: string, html: string, id: string) => {
    setFigures(prev => {
      const currentFigure = prev.find(item => item.id === id)
      if (currentFigure) {
        currentFigure.text = text
        currentFigure.html = html
      }
      return [...prev]
    })
  };

  const handleFigureChange = (id: string, value: IEditingFigureValues) => {
    const newFigures = figures.map(item => {
      if (id === item.id) {
        return {...item, ...value}
      } else {
        return item
      }
    })
    setFigures(newFigures)
  }

  return (
    <Stage
      width={window.innerWidth}
      height={window.innerHeight}
      draggable={tool === "cursor"}
      onClick={handleOnClick}
      ref={stageRef}
    >
      <Layer>
        {figures.map((figure: IFigure, i: number) => {
          return <Shape key={i} {...figure} stageRef={stageRef} tool={tool} handleFigureChange={handleFigureChange} handleTextChange={handleTextChange} />;
        })}
      </Layer>
    </Stage>
  );
};

export default Canvas;
