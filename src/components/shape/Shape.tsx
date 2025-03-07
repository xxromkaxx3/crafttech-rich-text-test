import html2canvas from "html2canvas";
import Konva from "konva";
import { KeyboardEvent, MutableRefObject, useEffect, useRef, useState } from "react";
import { Group, Rect } from "react-konva";
import { Html } from "react-konva-utils";
import HtmlText from "../htmlText/HtmlText";
import { Editor, EditorTextChangeEvent } from 'primereact/editor';
import { IEditingFigureValues, IFigure } from "../../tyoes/types";
import { Stage } from "konva/lib/Stage";
import { Image } from "konva/lib/shapes/Image";
import { Group as GroupType } from "konva/lib/Group";
import { FigureEditor } from "../figureEditor/FigureEditor";

interface IShapeProps extends IFigure {
  tool: string
  stageRef: MutableRefObject<Stage | null>
  handleTextChange(text: string, html: string, id: string): void
  handleFigureChange(id: string, value: IEditingFigureValues): void
}

const Shape = (props: IShapeProps) => {
  const { 
    x, 
    y, 
    width, 
    height, 
    tool, 
    html, 
    id, 
    text, 
    borderRadius,
    fill,
    stroke,
    handleFigureChange,
    handleTextChange
  } = props;
  const [isEditing, setIsEditing] = useState(false);
  const [value, setValue] = useState(text);
  const [htmlValue, setHtmlValue] = useState(html);
  const [image, setImage] = useState<Image | null>(null)

  const groupRef = useRef<GroupType>(null);
  const htmlRef = useRef<HTMLDivElement>(null);
  const renderImage = async () => {
    const htmltext = document.getElementById(`htmltext_${id}`);
    if (htmltext) {
      const innerhtml = htmltext.innerHTML;
      if (innerhtml) {
        const canvas = await html2canvas(htmltext, {
          backgroundColor: "rgba(0,0,0,0)",
        });
        const shape = new Konva.Image({
          x: 0,
          y: +height / 2,
          scaleX: 1 / window.devicePixelRatio,
          scaleY: 1 / window.devicePixelRatio,
          image: canvas,
        });
        groupRef.current?.add(shape);
        if (image !== null) image.destroy();
        setImage(shape);
      } else return;
    } else return;
  };

  useEffect(() => {
    if (!isEditing) {
      renderImage()
      handleTextChange(value, htmlValue, id)
    };
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isEditing]);

  const handleClick = () => {
    if (tool === "shape") {
      return;
    } else {
      setIsEditing((prev) => !prev);
      if (image) {
        if (isEditing) {
          image.show();
        } else {
          image.hide();
        }
      } else return;
    }
  };

  const handleSelect = (e: KeyboardEvent<HTMLDivElement>) => {
    if (e.key === 'Enter') {
      e.preventDefault()
      handleClick()
    }
  }
  const handleInput = (e: EditorTextChangeEvent) => {
    setValue(e.textValue);
    if (e.htmlValue) setHtmlValue(e.htmlValue)
  };

  return (
    <>
      <Group x={x} y={y} onClick={handleClick} ref={groupRef} draggable>
        <Rect fill={fill} cornerRadius={+borderRadius} stroke={stroke} width={+width} height={+height} />
        {isEditing && (
          <>
            <Html>
              <Editor value={value} onTextChange={handleInput} onKeyDown={handleSelect} />
              <button className="button" onClick={handleClick}>
                <label>Применить</label>
              </button>
              <FigureEditor 
                width={width} 
                height={height} 
                borderRadius={borderRadius} 
                fill={fill}
                stroke={stroke}
                handleFigureChange={(figure) => handleFigureChange(id, figure)}
              />
            </Html>
          </>
        )}
      </Group>
      <Html>
        <HtmlText ref={htmlRef} html={htmlValue} id={id} />
      </Html>
      
    </>
  );
};

export default Shape;
