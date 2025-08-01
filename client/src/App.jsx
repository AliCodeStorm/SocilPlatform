import { Login } from "./pages/Login";
import { Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Profile from "./pages/Profile";
import { Register } from "./pages/Register";
import ProtectedRoute from "./components/authComponent/ProtectedRoute";

function App() {
  return (
    <div className="relative min-h-screen overflow-hidden">
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        
        <Route
          path="/profile"
          element={
            <ProtectedRoute>
              <Profile />
            </ProtectedRoute>
          }
        />
      </Routes>
    </div>
  );
}

export default App;
