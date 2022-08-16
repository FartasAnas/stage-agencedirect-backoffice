import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import { Routes , Route } from "react-router-dom";
import Layout from "./components/Layout";
import Public from "./components/Public";
import Login from "./features/auth/login/Login";
import RequireAuth from "./features/auth/RequireAuth";
import Welcome from "./features/auth/Welcome";

function App() {
  return (
    <Routes>
      <Route path="/" element={<Layout />}>
        {/* public routes */}
        <Route index element={<Public />}/>
        <Route path="login" element={<Login />}/>

        {/* protected routes */}
        <Route element={<RequireAuth allowedRoles={["ROLE_ADMIN"]}/>}>
          <Route path="welcome" element={<Welcome  />}/>
        </Route>
      </Route>
    </Routes>
  );
}

export default App;
