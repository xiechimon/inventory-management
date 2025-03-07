import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import Auth from "./pages/auth/Auth";
import Register from "./pages/auth/Register";

function App() {
    return (
        <BrowserRouter>
            <Routes>
              <Route path="/" element={<Navigate to="/auth" replace />} />
              <Route path="/auth" element={<Auth/>} />
              <Route path="/register" element={<Register/>} />
            </Routes>
        </BrowserRouter>
    );
}

export default App;
