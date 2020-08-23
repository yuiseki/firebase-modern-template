

import * as React from 'react';
import * as ReactDOM from 'react-dom';
import HelloWorld from "./HelloWorld";


const MainView: React.FC = () => {
    const style = {
      margin: '0px',
      padding: '0px',
      width: '100%'
    }
    return <div style={style}>
      <HelloWorld />
    </div>
}

// MainView を app という id の Elementの子として描画する
ReactDOM.render(<MainView />, document.getElementById("app"));
