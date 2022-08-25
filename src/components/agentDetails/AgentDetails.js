import React ,{useEffect}from 'react'
import 'bootstrap/dist/css/bootstrap.min.css'
import 'bootstrap/dist/js/bootstrap.min.js'
import AccLogo from '../../images/sideBarAccLogo.png'
import { Link, useLocation, useNavigate } from 'react-router-dom';
import Sidebar from '../sidebar/Sidebar';
import './agentDetailsStyle.css'

export default function AgentDetails() {
    const location = useLocation();
    const agent=location.state.agent
    useEffect(()=>{
        console.log(location.state)
    }, [])
    const navigate=useNavigate();
    const handleEditAgentClick = (agent) => {
        navigate("/editAgent",{ state: {agent} })
    }
    const handleGoBackClick = () => {
        navigate("/agentList")
    }
  return (
    <>
        <Sidebar/>
        <div className="agent-details-info container agent-details">
            <div className="agent-details-info main-body">
                <div className="agent-details-info row gutters-sm">
                    <div className="agent-details-info  card w-25 mr-4">
                        <div className="agent-details-info  card-body d-flex justify-content-center ml-4">
                            <div className="agent-details-info  d-flex flex-column align-items-center text-center">
                                <img src={AccLogo} alt="Admin" className="agent-details-info rounded-circle" width={150}/>
                                <div className="agent-details-info mt-3">
                                    <h4 className='text-capitalize'>{agent.nom} {agent.prenom}</h4>
                                    <p className="agent-details-info text-secondary mb-1">{agent.roles}</p>
                                    <p className="agent-details-info text-muted font-size-sm text-capitalize">  {agent.agence} </p>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="agent-details-info  card w-50">
                        <div className="agent-details-info  card-body ml-3">
                            <div className="agent-details-info row">
                                <div className="agent-details-info col-sm-3">
                                    <h6 className="agent-details-info  mb-0">Nom</h6>
                                </div>
                                <div className="agent-details-info  col-sm-9 text-secondary text-capitalize">{agent.nom}</div>
                            </div>
                            <hr />
                            <div className="agent-details-info row">
                                <div className="agent-details-info col-sm-3">
                                    <h6 className="agent-details-info mb-0">Prénom</h6>
                                </div>
                                <div className="agent-details-info col-sm-9 text-secondary text-capitalize">{agent.prenom}</div>
                            </div>
                            <hr />
                            <div className="agent-details-info row">
                                <div className="agent-details-info col-sm-3">
                                    <h6 className="agent-details-info mb-0">Username</h6>
                                </div>
                                <div className="agent-details-info col-sm-9 text-secondary text-capitalize">{agent.username}</div>
                            </div>
                            <hr />
                            <div className="agent-details-info row">
                                <div className="agent-details-info col-sm-3">
                                    <h6 className="agent-details-info mb-0">Roles</h6>
                                </div>
                                <div className="agent-details-info col-sm-9 text-secondary text-capitalize">{agent.roles}</div>
                            </div>
                            <hr />
                            <div className="agent-details-info row">
                                <div className="agent-details-info col-sm-3">
                                    <h6 className="agent-details-info mb-0">Agence</h6>
                                </div>
                                <div className="agent-details-info col-sm-9 text-secondary text-capitalize">{agent.agence}</div>
                            </div>
                            <hr />
                            <div className="agent-details-info row">
                                <div className="agent-details-info col-sm-12 ">
                                    <input type="button" className="btn btn-secondary px-3 mr-2" value="Go Back" onClick={handleGoBackClick}/>
                                    <button className="agent-details-info btn btn-primary " target="__blank" onClick={()=>handleEditAgentClick(agent)}>
                                    Edit
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </>

  )
}
