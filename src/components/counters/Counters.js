import React, {useState , useEffect} from 'react'
import './countersStyle.css'
import { useSelector, useDispatch } from 'react-redux';
import { countAgence, countAgents } from '../../features/admins/adminSlice';
import { countClients, countDemandes } from '../../features/agents/agentSlice';
import { Link } from 'react-router-dom';
import { selectCurrentRoles } from '../../features/auth/authSlice';

export default function Counters() {
    const dispatch = useDispatch();
    const roles=useSelector(selectCurrentRoles)
    
    const [agentsNumber , setAgentNumber] = useState(0);
    const [clientsNumber , setClientNumber] = useState(0);
    const [demandsNumber , setDemandsNumber] = useState(0);
    const [agencesNumber , setAgenceNumber] = useState(0);

    async function getCountNumbers() {
        let agentNumber = await dispatch(countAgents()).unwrap();
        let clientNumber = await dispatch(countClients()).unwrap();
        let demandeNumber = await dispatch(countDemandes()).unwrap();
        let agenceNumber = await dispatch(countAgence()).unwrap();
        setAgentNumber(agentNumber);
        setClientNumber(clientNumber);
        setDemandsNumber(demandeNumber);
        setAgenceNumber(agenceNumber);
    }
    useEffect(() => {
        getCountNumbers();
    },[]);
    const content=roles.some(role => role.authority === 'ROLE_ADMIN') ?(
        <div className="row text-center">
            <Link to="/agentList" style={{ textDecoration: 'none' }} className="col link-dark">
                <div className="counter shadow-sm" >
                    <i className="fa fa-solid fa-user-tie fa-2x"></i>
                    <h2>{agentsNumber}</h2>
                    <p className="count-text text-uppercase">Agents</p>
                </div>
            </Link>
            <Link to="/agenceList" style={{ textDecoration: 'none' }} className="col link-dark">
                <div className="counter shadow-sm">
                    <i class="fa fa-shop fa-2x"></i>
                    <h2>{agencesNumber}</h2>
                    <p className="count-text text-uppercase">Agences</p>
                </div>
            </Link>
        </div>
    ):(
        <div className="row text-center">
            <Link to="/clientList" style={{ textDecoration: 'none' }} className="col link-dark">
                <div className="counter shadow-sm " >
                    <i className="fa fa-users fa-2x"></i>
                    <h2>{clientsNumber}</h2>
                    <p className="count-text text-uppercase">Clients</p>
                </div>
            </Link>
            <Link to="/clientList" style={{ textDecoration: 'none' }} className="col link-dark">
                <div className="counter shadow-sm">
                    <i className="fa fa-clipboard fa-2x"></i>
                    <h2>{demandsNumber}</h2>
                    <p className="count-text text-uppercase">Demandes</p>
                </div>
            </Link>
        </div>
    )
    return content
}