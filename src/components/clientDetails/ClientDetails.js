import React ,{useEffect}from 'react'
import 'bootstrap/dist/css/bootstrap.min.css'
import 'bootstrap/dist/js/bootstrap.min.js'
import AccLogo from '../../images/sideBarAccLogo.png'
import { Link, useLocation, useNavigate } from 'react-router-dom';
import Sidebar from '../sidebar/Sidebar';

export default function ClientDetails() {
    const location = useLocation();
    const client=location.state.client
    useEffect(()=>{
        console.log(client)
    }, [])
    const navigate=useNavigate();
    const handleGoBackClick = () => {
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
                                    <h4 className='text-capitalize'>{client.nom} {client.prenom}</h4>
                                    <p className="agent-details-info text-secondary mb-1">{client.type}</p>
                                    <p className="agent-details-info text-muted font-size-sm text-capitalize">  {client.adresse} </p>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="agent-details-info  card w-50">
                        <div className="agent-details-info  card-body ml-3">
                            <div className="agent-details-info row">
                                <div className="agent-details-info col-sm-3">
                                    <h6 className="agent-details-info  mb-0">RIB</h6>
                                </div>
                                <div className="agent-details-info  col-sm-9 text-secondary text-capitalize">{client.rib}</div>
                            </div>
                            <hr />
                            <div className="agent-details-info row">
                                <div className="agent-details-info col-sm-3">
                                    <h6 className="agent-details-info  mb-0">Nom</h6>
                                </div>
                                <div className="agent-details-info  col-sm-9 text-secondary text-capitalize">{client.nom}</div>
                            </div>
                            <hr />
                            <div className="agent-details-info row">
                                <div className="agent-details-info col-sm-3">
                                    <h6 className="agent-details-info mb-0">Prénom</h6>
                                </div>
                                <div className="agent-details-info col-sm-9 text-secondary text-capitalize">{client.prenom}</div>
                            </div>
                            <hr />
                            <div className="agent-details-info row">
                                <div className="agent-details-info col-sm-3">
                                    <h6 className="agent-details-info mb-0">Email</h6>
                                </div>
                                <div className="agent-details-info col-sm-9 text-secondary text-capitalize">{client.email}</div>
                            </div>
                            <hr />
                            <div className="agent-details-info row">
                                <div className="agent-details-info col-sm-3">
                                    <h6 className="agent-details-info mb-0">Account Number</h6>
                                </div>
                                <div className="agent-details-info col-sm-9 text-secondary text-capitalize">{client.accountNumber}</div>
                            </div>
                            <hr />
                            <div className="agent-details-info row">
                                <div className="agent-details-info col-sm-3">
                                    <h6 className="agent-details-info mb-0">Telephone</h6>
                                </div>
                                <div className="agent-details-info col-sm-9 text-secondary text-capitalize">{client.telephone}</div>
                            </div>
                            <hr />
                            <div className="agent-details-info row">
                                <div className="agent-details-info col-sm-3">
                                    <h6 className="agent-details-info mb-0">Adresse</h6>
                                </div>
                                <div className="agent-details-info col-sm-9 text-secondary text-capitalize">{client.adresse}</div>
                            </div>
                            <hr />
                            <div className="agent-details-info row">
                                <div className="agent-details-info col-sm-3">
                                    <h6 className="agent-details-info mb-0">CIN</h6>
                                </div>
                                <div className="agent-details-info col-sm-9 text-secondary text-capitalize">{client.cin}</div>
                            </div>
                            <hr />
                            <div className="agent-details-info row">
                                <div className="agent-details-info col-sm-3">
                                    <h6 className="agent-details-info mb-0">Date Naissance</h6>
                                </div>
                                <div className="agent-details-info col-sm-9 text-secondary text-capitalize">{client.dateNaissance}</div>
                            </div>
                            <hr />
                            <div className="agent-details-info row">
                                <div className="agent-details-info col-sm-3">
                                    <h6 className="agent-details-info mb-0">Date Inscription</h6>
                                </div>
                                <div className="agent-details-info col-sm-9 text-secondary text-capitalize">{client.dateInscription}</div>
                            </div>
                            <hr />
                            <div className="agent-details-info row">
                                <div className="agent-details-info col-sm-3">
                                    <h6 className="agent-details-info mb-0">Date Expiration</h6>
                                </div>
                                <div className="agent-details-info col-sm-9 text-secondary text-capitalize">{client.dateExpiration}</div>
                            </div>
                            <hr />
                            {contentType}
                            <hr />
                            
                            <div className="agent-details-info row">
                                <div className="agent-details-info col-sm-3">
                                    <h6 className="agent-details-info mb-0">Pack</h6>
                                </div>
                                <div className="agent-details-info col-sm-9 text-secondary text-capitalize">{client.pack}</div>
                            </div>
                            <hr />
                            <div className="agent-details-info row">
                                <div className="agent-details-info col-sm-3">
                                    <h6 className="agent-details-info mb-0">Agence</h6>
                                </div>
                                <div className="agent-details-info col-sm-9 text-secondary text-capitalize">{client.agence.nom}</div>
                            </div>
                            <hr />
                            <div className="agent-details-info row">
                                <div className="agent-details-info col-sm-12 ">
                                    <input type="button" className="btn btn-secondary px-3 mr-2" value="Go Back" onClick={handleGoBackClick}/>
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
