import React ,{useEffect}from 'react'
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.min.js'
import { useLocation, useNavigate } from 'react-router-dom';
import Sidebar from '../sidebar/Sidebar';
import CINrecto from '../../images/rectoCin.jpg'
import CINverso from '../../images/VersoCin.jpg'
import Selfi from '../../images/selfi.jpg'
import "./clientDetailsStyle.css"
import { useDispatch } from 'react-redux';
import { activateStudent, activateNormalUser } from '../../features/agents/agentSlice';

export default function ClientDetails() {
    const location = useLocation();
    const dispatch = useDispatch();
    const client=location.state.client
    useEffect(()=>{
        console.log(location)
        console.log(client)
    }, [])
    const navigate=useNavigate();
    const handleGoBackClick = () => {
        if(location.state.from==="clientList"){
            navigate("/clientList")
        }
        else if(location.state.from==="Home"){
            navigate("/Home")
        }
        else
            navigate("/demandeList")
    }
    async function handleActivateAccount(id){
        if(client.type==="Etudiant"){
            await dispatch(activateStudent(id)).unwrap();
        }
        else{
            await dispatch(activateNormalUser(id)).unwrap();
        }
        navigate("/clientList")
    }
    const contentType=client.type==="Etudiant" ? (
        <div className="agent-details-info row">
            <div className="agent-details-info col-sm-3">
                <h6 className="agent-details-info mb-0">Ecole</h6>
            </div>
            <div className="agent-details-info col-sm-9 text-secondary text-capitalize">{client.ecole}</div>
        </div>
    ):(
        <div className="agent-details-info row">
            <div className="agent-details-info col-sm-3">
                <h6 className="agent-details-info mb-0">Profession</h6>
            </div>
            <div className="agent-details-info col-sm-9 text-secondary text-capitalize">{client.profession}</div>
        </div>
    )
    const contentStatus=client.status==="Active" ?(
        <div className="col-sm-9 text-success"><span className="badge text-bg-success" > {client.status} </span></div>
    ):(
        <div className="col-sm-9 text-secondary"><span className="badge text-bg-secondary" > {client.status} </span></div>  
    )
    const contentBtn=client.status==="Active" ?(<></>
    ):(
        <>
            <button className="btn btn-success" data-bs-toggle="modal" data-bs-target="#ActivateAccModal">Activate Account</button>
            <div className="modal fade" id="ActivateAccModal" tabIndex="-1" aria-labelledby="ActivateAccLabel" aria-hidden="true">
                <div className="modal-dialog">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h5 className="modal-title" id="ActivateAccLabel">Activate This Client</h5>
                            <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                        </div>
                        <div className="modal-body">
                            <div className="alert alert-success">
                                <span className="">
                                    <p className='d-flex justify-content-center fs-5 m-0'>Are you sure you want to Activate this Client?</p>
                                </span>
                            </div>
                        </div>
                        <div className="modal-footer">
                            <button type="button" className="btn btn-success" data-bs-dismiss="modal" onClick={()=>handleActivateAccount(client.id)}>
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
        </>
    )
  return (
    <div className='clientDetails'>
        <Sidebar/>
        <div className="container informations">
            <div className="main-body w-100">
                <div className="row">
                    <div className="col-md-4 mb-4">
                        <div className="card ">
                        <div className="card-body">
                            <div className="d-flex flex-column align-items-center text-center">
                            <img src={Selfi} alt="Admin" className="rounded-5" width={125} />
                            <div className="mt-3">
                                <h4 className='text-capitalize'>{client.nom} {client.prenom}</h4>
                                <p className="text-secondary mb-1">{client.type}</p>
                                <p className="text-muted font-size-sm"> {client.adresse} </p>
                            </div>
                            </div>
                        </div>
                        </div>
                        <div className="card mt-3">
                            <h5 className="d-flex align-items-center mt-3 m-4 mb-1">
                                Carte Nationale
                            </h5>
                            <ul className="list-group list-group-flush">
                                <li className="list-group-item d-flex justify-content-center align-items-center flex-wrap">
                                    <img src={CINrecto} alt="Admin" className="rounded shadow-sm" width={300}/>
                                </li>
                                <li className="list-group-item d-flex justify-content-center align-items-center flex-wrap">
                                    <img src={CINverso} alt="Admin" className="rounded shadow-sm" width={300}/>
                                </li>
                            </ul>
                        </div>
                    </div>
                    <div className="col-md-8">
                        <div className="card mb-3">
                        <div className="card-body">
                            <div className="row">
                                <div className="col-sm-3">
                                    <h6 className="mb-0">Full Name</h6>
                                </div>
                                <div className="col-sm-9 text-secondary text-capitalize">{client.nom} {client.prenom}</div>
                            </div>
                            <hr />
                            <div className="row">
                                <div className="col-sm-3">
                                    <h6 className="mb-0">Email</h6>
                                </div>
                                <div className="col-sm-9 text-secondary">{client.email}</div>
                                </div>
                            <hr />
                            <div className="row">
                                <div className="col-sm-3">
                                    <h6 className="mb-0">Telephone</h6>
                                </div>
                                <div className="col-sm-9 text-secondary">{client.telephone}</div>
                            </div>
                            <hr />
                                    {contentType}
                            <hr />
                            <div className="row">
                                <div className="col-sm-3">
                                    <h6 className="mb-0">Address</h6>
                                </div>
                                <div className="col-sm-9 text-secondary"> {client.adresse} </div>
                            </div>
                            <hr />
                            <div className="row">
                                <div className="col-sm-3">
                                    <h6 className="mb-0">Date Naissance</h6>
                                </div>
                                <div className="col-sm-9 text-secondary">{client.dateNaissance}</div>
                            </div>
                            <hr />
                            <div className="row">
                                <div className="col-sm-3">
                                    <h6 className="mb-0">Date Inscription</h6>
                                </div>
                                <div className="col-sm-9 text-secondary">{client.dateInscription}</div>
                            </div>
                            <hr />
                            <div className="row">
                                <div className="col-sm-3">
                                    <h6 className="mb-0">Date Expiration</h6>
                                </div>
                                <div className="col-sm-9 text-secondary">{client.dateExpiration}</div>
                            </div>
                        </div>
                        </div>
                        <div className="row">
                            <div className="col-sm-6 mb-3">
                                <div className="card">
                                    <div className="card-body">
                                        <div className="row">
                                            <div className="col-sm-3">
                                                <h6 className="mb-0">CIN</h6>
                                            </div>
                                            <div className="col-sm-9 text-secondary">{client.cin}</div>
                                        </div>
                                        <hr/>
                                        <div className="row">
                                            <div className="col-sm-3">
                                                <h6 className="mb-0">RIB</h6>
                                            </div>
                                            <div className="col-sm-9 text-secondary">{client.rib}</div>
                                        </div>
                                        <hr/>
                                        <div className="row">
                                            <div className="col-sm-3">
                                                <h6 className="mb-0">Compt Number</h6>
                                            </div>
                                            <div className="col-sm-9 text-secondary">{client.accountNumber}</div>
                                        </div>
                                        <hr/>
                                        <div className="row">
                                            <div className="col-sm-3">
                                                <h6 className="mb-0">Clé RIB</h6>
                                            </div>
                                            <div className="col-sm-9 text-secondary">{client.cleRIB}</div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="col-sm-6 mb-3">
                                <div className="card ">
                                    <div className="card-body">
                                        <div className="row">
                                            <div className="col-sm-3">
                                                <h6 className="mb-0">Agence</h6>
                                            </div>
                                            <div className="col-sm-9 text-secondary">{client.agence.nom}</div>
                                        </div>
                                        <hr/>
                                        <div className="row">
                                            <div className="col-sm-3">
                                                <h6 className="mb-0">Pack</h6>
                                            </div>
                                            <div className="col-sm-9 text-secondary">{client.pack.nom}</div>
                                        </div>
                                        <hr/>
                                        <div className="row ">
                                            <div className="col-sm-3">
                                                <h6 className="mb-0">Status</h6>
                                            </div>
                                            {contentStatus}
                                        </div>
                                    </div>
                                </div>
                                <div className="mt-2">
                                    <div className="btn-group">
                                        <div className="">
                                            <button className="btn btn-secondary mr-2" onClick={handleGoBackClick} >Go Back</button>
                                        </div>
                                        <div className="">
                                            {contentBtn}
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>

  )
}
