import React, { useState, useEffect } from "react";
import { BrowserRouter } from "react-router-dom";
import Container from "./components/Container/Container";
import Content from "./components/Content/Content";
import Menu from "./components/Menu/Menu";
import Sidebar from "./components/Sidebar/Sidebar";
import Login from "./pages/Login/Login";

function App() {
  const [loggedIn, setLoggedIn] = useState<boolean>(false);
  const tokens1 = localStorage.getItem("access_token");
  useEffect(() => {
   
    const tokens1 = localStorage.getItem("access_token");
    if (tokens1) {
      setLoggedIn(true);
    } else {
      setLoggedIn(false);
    }
  }, []);
    //  if(tokens1){
    //   return (
    //       <BrowserRouter>
    //     <Container>
    //     <Menu loggedIn={loggedIn} setLoggedIn={setLoggedIn} />
    //     <Content />
    //     <Sidebar />
    //   </Container>
    //      </BrowserRouter>
    //   )
    //  }
    //  return (
    //   <BrowserRouter>
    //   <Login loggedIn={loggedIn} setLoggedIn={setLoggedIn}></Login>
    //   </BrowserRouter>
    //  )
  return (
    <div>
      <BrowserRouter>
        {tokens1 && (
          <>
            <Container>
              <Menu loggedIn={loggedIn} setLoggedIn={setLoggedIn} />
              <Content />
              <Sidebar />
            </Container>
          </>
        )}
        {!tokens1 && (
          <Login loggedIn={loggedIn} setLoggedIn={setLoggedIn}></Login>
        )}
      </BrowserRouter>
    </div>
  );
}

export default App;
