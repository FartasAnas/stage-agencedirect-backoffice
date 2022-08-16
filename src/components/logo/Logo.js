import React from "react";
import "./Logo.css";
import mainLogo from '../../images/logo.png';
import "bootstrap/dist/css/bootstrap.min.css";
export default function Logo() {
  return <img src={mainLogo} className="logo_login " alt="" />;
}
