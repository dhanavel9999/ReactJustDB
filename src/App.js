

import DispTbl from './HookPrac/fastAPISurface1';
import {BrowserRouter as BR, Routes, Route } from 'react-router-dom';
import './App.css';


function App() {
  //let jsxElem = op()
  let ret = someFunc()
  return (
    <div className="App">
      {/*
      
      <BR>
        <Routes>
          <Route path='/para' exact element = {} />
        </Routes>
      </BR>
      
      */}
      
      <BR>
        <Routes>
          <Route path='/'  element = {ret} />
          <Route path='/table'  element = {<DispTbl />} />
        </Routes>
      </BR>
    </div>
  );
}

export default App;

function someFunc(){
  return(<p>hello world</p>)
}
