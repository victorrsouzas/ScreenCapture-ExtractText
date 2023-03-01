import './App.css';
import * as React from "react";
import Home from './View/Home/index.tsx';

export interface IHomeProps { }

const App: React.FunctionComponent<IHomeProps> = (props) => {

  return (
    <>
    <Home />
    </>
  );
};
export default App;
