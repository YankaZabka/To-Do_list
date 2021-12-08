import React from 'react';
import classes from "./App.module.scss"
import Header from "./components/Header";
import NavBar from "./components/NavBar";

function App() {
  return (
    <div className={classes.App}>
      <Header/>
      <div className={classes.main}>
          <NavBar/>
      </div>
    </div>
  );
}

export default App;
