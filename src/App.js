import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import { Routes , Route, Navigate } from "react-router-dom";
import Login from "./components/login/Login";
import RequireAuth from "./features/auth/RequireAuth";
import AdminPanel from "./components/adminPanel/AdminPanel";
import AddAgent from "./components/addAgent/AddAgent";
import Forbidden from "./components/forbidden/Forbidden";
import AgentList from "./components/agentList/AgentList";
import Home from "./components/home/Home";
import ClientList from "./components/clientList/ClientList";
import EditAgent from "./components/editAgent/EditAgent";
import AgenceList from "./components/agenceList/AgenceList";
import AddAgence from "./components/addAgence/AddAgence";
import DemandeList from "./components/demandeList/DemandeList";

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
          <Route path="editAgent" element={<EditAgent  />}/>
          <Route path="demandeList" element={<DemandeList  />}/>
        </Route>
        <Route element={<RequireAuth allowedRoles={["ROLE_ADMIN"]}/>}>
          <Route path="adminPanel" element={<AdminPanel  />}/>
          <Route path="addAgent" element={<AddAgent  />}/>
          <Route path="agentList" element={<AgentList  />}/>
          <Route path="agenceList" element={<AgenceList  />}/>
          <Route path="addAgence" element={<AddAgence  />}/>
        </Route>
      </Route>
    </Routes>
  );
}

export default App;
