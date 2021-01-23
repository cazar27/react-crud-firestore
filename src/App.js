import React from "react";
import Objects from "./components/Objects";
import "./App.css";

import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function App() {
  return (
    <div>
      <Objects />
      <ToastContainer />
    </div>
  );
}

export default App;
