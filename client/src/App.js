import "./App.css";
import { Home } from "./Pages/Home";
import { Nav } from "./Components/Header/Nav";
import { Route, Routes } from "react-router-dom";
import { Login } from "./Pages/Login/Login";
import { Register } from "./Pages/Register";
import { CreatePost } from "./Pages/CreatePost";
import { UserContextProvider } from "./Components/UserContext/UserContext";
import { useState } from "react";

function App() {
  const [menu, setMenu] = useState();
  const [isLogedIn, setIsLogedIn] = useState(false);

  return (
    <UserContextProvider>
      <main className={menu ? "main_content fixed" : "main_content"}>
        <Nav
          menu={menu}
          setMenu={setMenu}
          setIsLogedIn={setIsLogedIn}
          isLogedIn={isLogedIn}
        />
        <Routes>
          <Route index element={<Home />} />
          <Route
            path={"/login"}
            element={<Login setIsLogedIn={setIsLogedIn} />}
          />
          <Route path={"/register"} element={<Register />} />
          <Route
            path={"/create_post"}
            element={<CreatePost setMenu={setMenu} />}
          />
        </Routes>
      </main>
    </UserContextProvider>
  );
}

export default App;
