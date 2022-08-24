import React,{ useState } from 'react'
import * as bootstrap from 'bootstrap';
import "bootstrap/dist/css/bootstrap.min.css";
import "./SideBarStyle.css";
import '@fortawesome/fontawesome-free/js/all.js';
import "bootstrap-icons/font/bootstrap-icons.css";
import Logo from '../../images/textLessLogo.png'
import AccLogo from '../../images/sideBarAccLogo.png'
import AgentIcon from '../../images/agentIcon.png'
import { Link } from 'react-router-dom';
import { useSelector, useDispatch } from "react-redux";
import { selectCurrentUser,selectCurrentRoles, logOut } from '../../features/auth/authSlice';



(function () {
    'use strict'
    var tooltipTriggerList = [].slice.call(document.querySelectorAll('[data-bs-toggle="tooltip"]'))
    tooltipTriggerList.forEach(function (tooltipTriggerEl) {
      new bootstrap.Tooltip(tooltipTriggerEl)
    })
})()

export default function Sidebar() {
    const dispatch = useDispatch();
    const roles=useSelector(selectCurrentRoles)
    const currentUser=useSelector(selectCurrentUser)
    const [activeChoise, setActiveChoise] = useState("");
    const handleActiveChoise = (e) => {
        setActiveChoise(e.target.name);
        if(e.target.name==="Logout"){
            const logout=dispatch(logOut());
        }
    }
    const client=roles.some(role => role.authority === 'ROLE_ADMIN')?(<></>):
    (
        <>
            <a href="" className={activeChoise==="Clients" ? "nav-link active" : "nav-link link-dark choice"} name="Clients" 
            onClick={handleActiveChoise} data-bs-toggle="collapse" data-bs-target="#client-collapse" aria-expanded="false">
            <i className="bi bi-person"></i>
            <svg className="bi me-2" width="5" height="16"></svg>
            Clients 
            </a>
            <div className="collapse ml-15" id="client-collapse">
                <ul className="btn-toggle-nav list-unstyled fw-normal pb-1">
                    <li>
                        <Link to="/clientList" className="link-dark rounded w-25">
                            <i className="bi bi-list-ul"></i>
                            <svg className="bi me-2" width="5" height="16"></svg>
                            List
                        </Link>
                    </li>
                </ul>
            </div>
        </>
    )
    const demande=roles.some(role => role.authority === 'ROLE_ADMIN')?(<></>):
    (
        <>
            <a href="" className={activeChoise==="Demandes" ? "nav-link active" : "nav-link link-dark choice"} name="Demandes" 
            onClick={handleActiveChoise} data-bs-toggle="collapse" data-bs-target="#demande-collapse" aria-expanded="false">
            <i className="bi bi-person"></i>
            <svg className="bi me-2" width="5" height="16"></svg>
            Demandes 
            </a>
            <div className="collapse ml-15" id="demande-collapse">
                <ul className="btn-toggle-nav list-unstyled fw-normal pb-1">
                    <li>
                        <Link to="/demandeList" className="link-dark rounded w-25">
                            <i className="bi bi-list-ul"></i>
                            <svg className="bi me-2" width="5" height="16"></svg>
                            List
                        </Link>
                    </li>
                </ul>
            </div>
        </>
    )
    const Agents = roles.some(role => role.authority === 'ROLE_ADMIN')?(
        <div>
            <a href="" className={activeChoise==="Agents" ? "nav-link active" : "nav-link link-dark choice"} name="Agents" 
            onClick={handleActiveChoise} data-bs-toggle="collapse" data-bs-target="#agent-collapse" aria-expanded="false">
            <img src={AgentIcon} alt="logo-img" className="sidebar-agent-icon"/>
            <svg className="bi me-2" width="5" height="16"></svg>
            Agents
            </a>
            <div className="collapse ml-15" id="agent-collapse">
                <ul className="btn-toggle-nav list-unstyled fw-normal pb-1">
                    <li>
                        <Link to="/agentList" className="link-dark rounded">
                            <i className="bi bi-list-ul"></i>
                            <svg className="bi me-2" width="5" height="16"></svg>
                            List
                        </Link>
                    </li>
                    <li>
                        <Link to="/addAgent" className="link-dark rounded">
                            <i className="bi bi-plus-lg"></i>
                            <svg className="bi me-2" width="5" height="16"></svg>
                            Add
                        </Link>
                    </li>
                </ul>
            </div>
        </div>
    ):(<div></div>)
    const Agence = roles.some(role => role.authority === 'ROLE_ADMIN')?(
        <div>
            <a href="" className={activeChoise==="Agence" ? "nav-link active" : "nav-link link-dark choice"} name="Agence" 
            onClick={handleActiveChoise} data-bs-toggle="collapse" data-bs-target="#agence-collapse" aria-expanded="false">
            <i className="bi bi-shop"></i>
            <svg className="bi me-2" width="5" height="16"></svg>
            Agence
            </a>
            <div className="collapse ml-15" id="agence-collapse">
                <ul className="btn-toggle-nav list-unstyled fw-normal pb-1">
                    <li>
                        <Link to="/agenceList" className="link-dark rounded">
                            <i className="bi bi-list-ul"></i>
                            <svg className="bi me-2" width="5" height="16"></svg>
                            List
                        </Link>
                    </li>
                    <li>
                        <Link to="/addAgence" className="link-dark rounded">
                            <i className="bi bi-plus-lg"></i>
                            <svg className="bi me-2" width="5" height="16"></svg>
                            Add
                        </Link>
                    </li>
                </ul>
            </div>
        </div>
    ):(<div></div>)

    return (
        <div className="d-flex flex-column flex-shrink-0 p-3 bg-light side-bar shadow-lg sticky-top" >
            <Link to="/panel" className="d-flex align-items-center mb-3 mb-md-0 me-md-auto link-dark text-decoration-none">
            <img src={Logo} alt="logo-img" className="panel-logo"/>
            <svg className="bi me-2" width="5" height="32"></svg>
            <span className="fs-4"><strong>{roles.some(role => role.authority === 'ROLE_ADMIN')? "ADMIN PANEL" : "AGENT PANEL"}</strong></span>
            </Link>
            <hr/>
            <ul className="nav nav-pills flex-column mb-auto">
                <li >
                    <Link to="/home" className={activeChoise==="Home" ? "nav-link active" : "nav-link link-dark choice"} aria-current="page"
                    name="Home" onClick={handleActiveChoise}>
                    <i className="bi bi-house-door"></i>
                    <svg className="bi me-2" width="5" height="16"></svg>
                    Home
                    </Link>
                </li>
                <li>
                    {client}
                </li>
                <li>
                    {demande}
                </li>
                <li>
                    {Agents}
                </li>
                <li>
                    {Agence}
                </li>
            </ul>
            <div >
                <ul className="nav nav-pills flex-column mb-auto">
                    <li>
                        <Link to="" className={activeChoise==="Profile" ? "nav-link active" : "nav-link link-dark choice" } name="Profile" onClick={handleActiveChoise} >
                        <i className="bi bi-person-bounding-box"></i>
                            <svg className="bi me-2" width="5" height="16"></svg>
                            Profile
                        </Link>
                    </li>
                    <li>
                        <a href="/login" className={activeChoise==="Logout" ? "nav-link active" : "nav-link link-dark choice"} name="Logout" onClick={handleActiveChoise} >
                        <i className="bi bi-box-arrow-left"></i>
                            <svg className="bi me-2" width="5" height="16"></svg>
                            Logout
                        </a>
                    </li>
                </ul>
            </div>
            <hr/>
            <div >
            <a className="d-flex align-items-center link-dark text-decoration-none">
                <img src={AccLogo} alt="" width="32" height="32" className="rounded-circle me-2"/>
                <p className="text-secondary hello-text">Hello!</p>
                <svg className="bi me-2" width="0" height="14"></svg>
                <strong className="username-text text-uppercase">{currentUser}</strong>
            </a>
            </div>
        </div>
    )
}
