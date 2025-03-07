import { ChangeEvent, useState } from "react";
import { IEditingFigureValues } from "../../tyoes/types";

interface IFigureEditorProps extends IEditingFigureValues {
  handleFigureChange(value: IEditingFigureValues): void
}

export const FigureEditor = ({ handleFigureChange, ...props}: IFigureEditorProps) => {
  const [isEditing, setIsEditing] = useState(false);
  const [newValues, setNewValues] = useState(props)

  const onClickHandler = () => {
    setIsEditing(prev => !prev)
  }

  const onChangeHandler = (e:ChangeEvent<HTMLInputElement>) => {
    setNewValues(prev => {
      return { ...prev, [e.target.name]: e.target.value}
    })
  }

  const handleSubmit = () => {
    handleFigureChange(newValues)
  }

  return (
    <>
      {!isEditing ?
        <div>
          <button className="button" onClick={onClickHandler}>
            <label htmlFor="cursor">Изменить фигуру</label>
          </button>
        </div> :
        <div className="form-wrap">
          <input 
            className="editor" 
            type="text" 
            value={newValues.fill} 
            onChange={onChangeHandler} 
            name='fill' 
            placeholder="цвет фигуры" 
          />
          <input 
            className="editor" 
            type="text" 
            value={newValues.stroke} 
            onChange={onChangeHandler} 
            name='stroke' 
            placeholder="цвет фона" 
          />
          <input 
            className="editor" 
            type="text" 
            value={newValues.height} 
            onChange={onChangeHandler} 
            name='height' 
            placeholder="высота" 
          />
          <input 
            className="editor" 
            type="text" 
            value={newValues.width} 
            onChange={onChangeHandler} 
            name='width' 
            placeholder="ширина" 
          />
          <input 
            className="editor" 
            type="text" 
            value={newValues.borderRadius} 
            onChange={onChangeHandler} 
            name='borderRadius' 
            placeholder="радиус" 
          />
          <button className="button form-button" onClick={handleSubmit}> 
            <label>Применить</label>
          </button>
        </div>

      }
    </>
  )
  
    
  
}

