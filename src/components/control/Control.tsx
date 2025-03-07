interface IControlProps {
  tool: string
  setTool(e:string): void
}

const Control = ({ tool, setTool }: IControlProps) => {
  const handleOnChange = (value: string) => {
    setTool(value);
  };
  

  return (
    <div className="buttons-wrap" style={{ position: "absolute", top: 0 }}>
      <div className="button-wrap">
        <button
          style={{
            background: tool === 'cursor' ? '#4338CA' : '#6366F1'
          }}
          className="button"
          id="cursor"
          name="control"
          value="cursor"
          onClick={() => handleOnChange('cursor')}
        >
          <label htmlFor="cursor">Взаимодействие</label>
        </button>
      </div>

      <div className="button-wrap">
        <button
          style={{
            background: tool === 'shape' ? '#4338CA' : '#6366F1'
          }}
          className="button"
          id="shape"
          name="control"
          value="shape"
          onClick={() => handleOnChange('shape')}
        >
          <label htmlFor="shape">Добавление</label>
        </button>
      </div>
    </div>
  );
};

export default Control;
