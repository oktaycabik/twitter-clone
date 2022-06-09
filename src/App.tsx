import React, { useState,useEffect } from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Container from "./components/Container/Container";
import Content from "./components/Content/Content";
import Menu from "./components/Menu/Menu";
import Sidebar from "./components/Sidebar/Sidebar";
import Login from "./pages/Login/Login";

function App() {
  const [loggedIn, setLoggedIn] = useState<boolean>(false);
  
  useEffect(() => {
    const tokens1 = localStorage.getItem("access_token");

    if (tokens1) {
      setLoggedIn(true);
    } else {
      setLoggedIn(false);
    }
  }, []);
  
  return (
    <div>
      <BrowserRouter>
        {loggedIn && (
          <>
            <Container>
              <Menu loggedIn={loggedIn} setLoggedIn={setLoggedIn} />
              <Content />
              <Sidebar />
            </Container>
          </>
        )}
        {
          !loggedIn && (
    
               
             <Login loggedIn={loggedIn} setLoggedIn={setLoggedIn} ></Login>
     
          )
        }
      </BrowserRouter>
    </div>
  );
}

export default App;
