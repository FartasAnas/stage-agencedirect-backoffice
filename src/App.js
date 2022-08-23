import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import { Routes , Route, Navigate } from "react-router-dom";
import Layout from "./components/Layout";
import Public from "./components/Public";
import Login from "./components/login/Login";
import RequireAuth from "./features/auth/RequireAuth";
import AdminPanel from "./components/adminPanel/AdminPanel";
import AddAgent from "./components/addAgent/AddAgent";
import Forbidden from "./components/forbidden/Forbidden";
import AgentList from "./components/agentList/AgentList";
import Home from "./components/home/Home";
import ClientList from "./components/clientList/ClientList";

function App() {
  return (
    <Routes>
      <Route>
        {/* public routes */}
        <Route index element={<Navigate to="login"/>}/>
        <Route path="login" element={<Login />}/>
        <Route path="forbidden" element={<Forbidden />}/>

        {/* protected routes */}
        <Route element={<RequireAuth allowedRoles={["ROLE_ADMIN","ROLE_AGENT"]}/>}>
          <Route path="home" element={<Home  />}/>
          <Route path="clientList" element={<ClientList  />}/>
        </Route>
        <Route element={<RequireAuth allowedRoles={["ROLE_ADMIN"]}/>}>
          <Route path="adminPanel" element={<AdminPanel  />}/>
          <Route path="addAgent" element={<AddAgent  />}/>
          <Route path="agentList" element={<AgentList  />}/>
        </Route>
      </Route>
    </Routes>
  );
}

export default App;
