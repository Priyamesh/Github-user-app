
import React from "react"
import { BrowserRouter } from "react-router-dom";
import './App.css';
import AddUsers from './components/AddUsers'
import UserCard from './components/UserCard'
import Router from "./Router";

function App() {

  return (
    <div>
      <BrowserRouter>
        <Router />
        {/* <AddUsers /> */}
        {/* <UserCard /> */}
      </BrowserRouter>
    </div>
  );
}

export default App;
