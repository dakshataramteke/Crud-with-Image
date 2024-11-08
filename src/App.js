

import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Student from "./Component/Student.js";
import AddStudent from "./Component/AddStudent.js";
import UpdateStudent from "./Component/UpdateStudent.js";

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Navigate to="/home" />} /> {/* Redirect from '/' to '/home' */}
          <Route path="/home" element={<Student />} />
          <Route path="/create" element={<AddStudent />} />
          <Route path="/home/update/:id" element={<UpdateStudent />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;