import "./App.css";
import { Home } from "./Pages/Home";
import { Nav } from "./Components/Header/Nav";
import { Route, Routes } from "react-router-dom";
import { Login } from "./Pages/Login";
import { Register } from "./Pages/Register";

function App() {
  return (
    <main>
      <Nav />
      <Routes>
        <Route index element={<Home />} />
        <Route path={"/login"} element={<Login />} />
        <Route path={"/register"} element={<Register />} />
      </Routes>
    </main>
  );
}

export default App;
