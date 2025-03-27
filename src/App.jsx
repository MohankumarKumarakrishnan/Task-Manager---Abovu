 import { Route, Routes } from "react-router-dom";
import Navbar from "./components/Navbar"
import TaskManager from "./components/TaskManager"
import Login from "./components/Login";
import Signup from "./components/Signup";
 const App = () => {
  return (
    <div>
      <Navbar />
      <Routes>
        <Route path="/" element={<TaskManager />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
      </Routes>
      </div>
  );
  }
  
  export default App
  