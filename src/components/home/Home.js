import React , {useEffect , useState} from 'react'
import Sidebar from "../sidebar/Sidebar";
import './homelStyle.css'
import "bootstrap-icons/font/bootstrap-icons.css";
import AgentIcon from '../../images/agentIcon.png'
import { useDispatch } from 'react-redux/es/exports'
import { countAgents, countClients } from '../../features/admins/adminSlice';
import { useNavigate } from 'react-router-dom';
import Counters from '../counters/Counters';

const Home = () => {
    
    return (
        <div>
            <Sidebar/>
            <div className="counters">
                <Counters/>    
            </div>
        </div>
    )
}

export default Home;