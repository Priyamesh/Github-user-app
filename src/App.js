
import React, { useState } from "react"
import { BrowserRouter } from "react-router-dom";
import './App.css';
import AddContacts from './components/AddContacts'
import UserCard from './components/UserCard'
import Router from "./Router";

function App() {

  return (
    <div>
      <BrowserRouter>
        <Router />
        {/* <AddContacts /> */}
        {/* <UserCard /> */}
      </BrowserRouter>
    </div>
  );
}

export default App;
