import React, {useState , useEffect} from 'react'
import './countersStyle.css'
import { useDispatch } from 'react-redux';
import { countAgents, countClients, countDemandes } from '../../features/admins/adminSlice';

export default function Counters() {
    const dispatch = useDispatch();
    
    const [AgentNumber , setAgentNumber] = useState(0);
    const [ClientNumber , setClientNumber] = useState(0);
    const [demandsNumber , setDemandsNumber] = useState(0);

    async function getAgentNumber() {
        let number = await dispatch(countAgents()).unwrap();
        setAgentNumber(number);
    }
    async function getClientNumber() {
        let number = await dispatch(countClients()).unwrap();
        setClientNumber(number);
    }
    async function getDemandsNumber() {
        let number = await dispatch(countDemandes()).unwrap();
        setDemandsNumber(number);
    }


    useEffect(() => {
        getAgentNumber();
        getClientNumber();
        getDemandsNumber();
    },[]); 
    return (
        <div className="container w-100">
            <div className="row text-center">
                <div className="col">
                    <div className="counter shadow-sm ">
                        <i className="fa fa-users fa-2x"></i>
                        <h2>{ClientNumber}</h2>
                        <p className="count-text text-uppercase">Clients</p>
                    </div>
                </div>
                <div className="col">
                    <div className="counter shadow-sm">
                        <i className="fa fa-solid fa-user-tie fa-2x"></i>
                        <h2>{AgentNumber}</h2>
                        <p className="count-text text-uppercase">Agents</p>
                    </div>
                </div>
                <div className="col">
                    <div className="counter shadow-sm">
                        <i className="fa fa-clipboard fa-2x"></i>
                        <h2>{demandsNumber}</h2>
                        <p className="count-text text-uppercase">Demandes</p>
                    </div>
                </div>
            </div>
        </div>
    )
}