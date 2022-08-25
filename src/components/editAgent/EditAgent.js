import React, { useEffect, useState } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
import { useDispatch } from 'react-redux/es/exports'
import Sidebar from '../sidebar/Sidebar'
import AccLogo from '../../images/sideBarAccLogo.png'
import { getAllRoles , editAgent } from '../../features/admins/adminSlice'
import './editAgentStyle.css'
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.min.js'

export default function EditAgent() {
    const location = useLocation();
    const dispatch = useDispatch();
    const navigate=useNavigate();
    const agentEdit=location.state.agent
    const [rolesList, setRolesList] = useState([]);
    const [id, setID] = useState(agentEdit.id);
    const [nom, setNom] = useState(agentEdit.nom);
    const [prenom, setPrenom] = useState(agentEdit.prenom);
    const [username, setUsername] = useState(agentEdit.username);
    useEffect(()=>{
        async function fetchData() {
            const dataRole = await dispatch(getAllRoles()).unwrap();
            let dataRolefilter=dataRole.filter(role=>{
                return role.name !== "ROLE_CLIENT" && role.name !== "ROLE_"+(''+agentEdit.roles).substring(1)
            })
            setRolesList(dataRolefilter.map(role=>{
                role.name=role.name.replace("ROLE_","")
                return role
            }))
        }
        fetchData();
    }, [])
    const handleEditAgentClick = (agent) => {
        navigate("/agentDetails",{ state: {agent} })
    }
    const handleNomInput = (e) => setNom(e.target.value)
    const handlePrenomInput = (e) => setPrenom(e.target.value)
    const handleUsernameInput = (e) => setUsername(e.target.value)
    const handleEditAgent = async (e) => {
        try{
            const agent=await dispatch(editAgent({ id, nom , prenom , username })).unwrap();
            const agence=agentEdit.agence;
            const roles=agentEdit.roles
            navigate("/agentDetails",{ state: {agent:{id, nom , prenom , username,agence,roles}} })
            console.log(agentEdit)
            setNom('');
            setPrenom('');
            setUsername('');
           
        }catch(err){
            if(!err){
                alert('No Server Response');
            }else if(err.message.includes('400')){
                alert('Missing Nom or Prenom or Username or Password');
            }else if(err.message.includes('409')){
                alert('Username already exists');
            }else{
                alert('Add Agent Failed');
            }
        }
        
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
                                    <h4 className='text-capitalize'>{agentEdit.nom} {agentEdit.prenom}</h4>
                                    <p className="agent-details-info text-secondary mb-1">{agentEdit.roles}</p>
                                    <p className="agent-details-info text-muted font-size-sm text-capitalize">  {agentEdit.agence} </p>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="card w-50" >
						<div className="card-body">
							<div className="row mb-3">
								<div className="col-sm-3">
									<h6 className="mb-0">Nom</h6>
								</div>
								<div className="col-sm-9 text-secondary">
									<input type="text" className="form-control" placeholder={agentEdit.nom} value={nom} onChange={handleNomInput}/>
								</div>
							</div>
							<div className="row mb-3">
								<div className="col-sm-3">
									<h6 className="mb-0">Prénom</h6>
								</div>
								<div className="col-sm-9 text-secondary">
									<input type="text" className="form-control" placeholder={agentEdit.prenom} value={prenom} onChange={handlePrenomInput}/>
								</div>
							</div>
							<div className="row mb-3">
								<div className="col-sm-3">
									<h6 className="mb-0">Username</h6>
								</div>
								<div className="col-sm-9 text-secondary">
									<input type="text" className="form-control" placeholder={agentEdit.username} value={username} onChange={handleUsernameInput} />
								</div>
							</div>
							<div className="row mb-3">
								<div className="col-sm-3">
									<h6 className="mb-0">Role</h6>
								</div>
                                <div className="agent-details-info col-sm-9 text-secondary text-capitalize">{agentEdit.roles}</div>
								{/* <div className="col-sm-9 text-secondary">
                                    <select className="form-select add-nameInput rounded-right"  required>
                                    <option defaultValue value={agent.roles}>{agent.roles}</option>
                                    {rolesList.map(role=>{
                                        return <option key={role.id} value={role.id}>{role.name}</option>
                                    })}
                                </select>
								</div> */}
							</div>
							<div className="row mb-3">
								<div className="col-sm-3">
									<h6 className="mb-0">Agence</h6>
								</div>
								<div className="agent-details-info col-sm-9 text-secondary text-capitalize">{agentEdit.agence}</div>
							</div>
							<div className="row">
								<div className="col-sm-3"></div>
								<div className="col-sm-9 text-secondary">
                                    <input type="button" className="btn btn-secondary px-3 mr-2" value="Cancel" onClick={()=>handleEditAgentClick(agentEdit)}/>
									<input type="button" className="btn btn-primary px-4" value="Save Changes" data-bs-toggle="modal" data-bs-target="#EditModal"/>
								</div>
							</div>
                            <div className="modal fade" id="EditModal" tabIndex="-1" aria-labelledby="EditModalLabel" aria-hidden="true">
                                <div className="modal-dialog">
                                    <div className="modal-content">
                                        <div className="modal-header">
                                            <h5 className="modal-title" id="EditModalLabel">Edit this Agent</h5>
                                            <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                                        </div>
                                        <div className="modal-body">
                                            <div className="alert alert-warning">
                                                <span className="">
                                                    <p className='d-flex justify-content-center fs-5 m-0'>Are you sure you want to edit this Agent?</p>
                                                </span>
                                            </div>
                                        </div>
                                        <div className="modal-footer">
                                            <button type="button" className="btn btn-success" data-bs-dismiss="modal" onClick={handleEditAgent}>
                                                <i className="fa fa-square-check"></i>
                                                <svg className="bi me-2" width="0" height="0"></svg>
                                                Yes
                                            </button>
                                            <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">
                                                <i className="fa fa-square-xmark"></i>
                                                <svg className="bi me-2" width="0" height="0"></svg>
                                                No
                                            </button>
                                            
                                        </div>
                                    </div>
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
