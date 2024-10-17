import { CssBaseline, ThemeProvider } from "@mui/material";
import { ColorModeContext, useMode } from "./theme";
import {Route, Routes} from 'react-router-dom'
import Header from "./components/Header";
import Dashboard from "./pages/Dashboard";
import Sidebar from "./components/Sidebar";
import Login from "./pages/Login"

import Bank from "./pages/Bank"
import Received from "./pages/Received"
import Send from "./pages/Send"
import Registro from "./pages/Registro"

import { useState } from "react";
//import Login from "./pages/Login";

function App() {

  const [theme, colorMode] = useMode();
  const [isSidebar, setIsSidebar] = useState(true);

  return (
    <ColorModeContext.Provider value={colorMode}>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <div className="app">
          <Sidebar/> 
          <main className="content">
          <Header/>
          <Dashboard/>
            <Routes>
              <Route path="/Login" element={<Login/>} />
              <Route path="/Bank" element={<Bank/>} />
              <Route path="/Dashboard" element={<Dashboard/>} />
              <Route path="/Received" element={<Received/>} />
              <Route path="/Send" element={<Send/>} />
              <Route path="/Send" element={<Bank/>} />
              <Route path="/Registro" element={<Registro/>} />
            </Routes>
          </main>
        </div>
      </ThemeProvider>
    </ColorModeContext.Provider>
  );
}

export default App;
