import "./App.css";
import { Nav } from "./Components/Header/Nav";
import { RoutesPage } from "./Pages/Routes/RoutesPage";
import { UserContextProvider } from "./Components/UserContext/UserContext";
import { useEffect, useState } from "react";
import { Footer } from "./Components/Footer/Footer";

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
        />
        <RoutesPage setIsLogedIn={setIsLogedIn} setMenu={setMenu} />
        {/* <Footer /> */}
      </main>
    </UserContextProvider>
  );
}

export default App;
