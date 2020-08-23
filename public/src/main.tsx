

import * as React from 'react';
import * as ReactDOM from 'react-dom';
import HelloWorld from "./HelloWorld";
import { useState, useCallback, useRef } from 'react';


const InputSample: React.FC = () => {
  const [inputText, setInputText] = useState<string>('');
  const inputRef = useRef<HTMLInputElement>(document.createElement("input"));
  
  const handleSubmit = useCallback((event) => {
    setInputText(inputRef.current.value);
  }, []);
  return <div>
    <input type='text' ref={inputRef} />
    <input type='submit' onSubmit={handleSubmit} />
  </div>
}

const MainView: React.FC = () => {
    const style = {
      margin: '0px',
      padding: '0px',
      width: '100%'
    }
    return <div style={style}>
      <HelloWorld />
      <InputSample />
    </div>
}

// MainView を app という id の Elementの子として描画する
ReactDOM.render(<MainView />, document.getElementById("app"));
