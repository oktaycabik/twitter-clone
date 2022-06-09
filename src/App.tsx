import { useState } from "react";
import { BrowserRouter } from "react-router-dom";
import Container from "./components/Container/Container";
import Content from "./components/Content/Content";
import Menu from "./components/Menu/Menu";
import Sidebar from "./components/Sidebar/Sidebar";
import Login from "./pages/Login/Login";

function App() {
  const [loggedIn, setLoggedIn] = useState<Boolean>(false);
  return (
    <div>
      <BrowserRouter>
        {loggedIn && (
          <>
            <Container>
              <Menu />
              <Content />
              <Sidebar />
            </Container>
          </>
        )}
        {
          !loggedIn && (
            <Login></Login>
          )
        }
      </BrowserRouter>
    </div>
  );
}

export default App;
