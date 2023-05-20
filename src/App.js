import { BrowserRouter, Route, Routes } from "react-router-dom";
import "./App.css";
import { AuthenticationForm } from "./components/Login";
import { Paper } from "@mantine/core";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<AuthenticationForm />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
