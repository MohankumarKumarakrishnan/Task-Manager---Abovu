import { Route, Routes } from "react-router-dom";
import Navbar from "./components/Navbar";
import TaskManager from "./components/TaskManager";
import Login from "./components/Login";
import Signup from "./components/Signup";
import { useState } from "react";

const App = () => {
  const [isLoggedIn, setIsloggedIn] = useState(
    localStorage.getItem("jwtToken") !== null
  );

  return (
    <div>
      <Navbar isLoggedIn={isLoggedIn} setIsloggedIn={setIsloggedIn} />
      <Routes>
        <Route path="/" element={<TaskManager />} />
        <Route
          path="/login"
          element={<Login setIsloggedIn={setIsloggedIn} />}
        />
        <Route path="/signup" element={<Signup />} />
      </Routes>
    </div>
  );
};

export default App;
