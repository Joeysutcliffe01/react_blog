import "./App.css";
import { Home } from "./Pages/Home";
import { Nav } from "./Components/Header/Nav";
import { Route, Routes } from "react-router-dom";
import { Login } from "./Pages/Login/Login";
import { Register } from "./Pages/Register";
import { CreatePost } from "./Pages/CreatePost";
import { UserContextProvider } from "./Components/UserContext/UserContext";
import { useEffect, useState } from "react";
import { SinglePost } from "./Pages/Single_post/SinglePost";

const isLogedInFromLocalStorage =
  window.localStorage.getItem("isLogedIn_localStorage") || true;

function App() {
  const [menu, setMenu] = useState();
  const [isLogedIn, setIsLogedIn] = useState(
    JSON.parse(isLogedInFromLocalStorage)
  );

  useEffect(() => {
    localStorage.setItem("isLogedIn_localStorage", JSON.stringify(isLogedIn));
  }, [isLogedIn]);

  return (
    <UserContextProvider>
      <main className={menu ? "main_content fixed" : "main_content"}>
        <Nav
          menu={menu}
          setMenu={setMenu}
          setIsLogedIn={setIsLogedIn}
          isLogedIn={isLogedIn}
          // showBanner={showBanner}
          // setShowBanner={setShowBanner}
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
          <Route path={"/post/:id"} element={<SinglePost />} />
        </Routes>
      </main>
    </UserContextProvider>
  );
}

export default App;
