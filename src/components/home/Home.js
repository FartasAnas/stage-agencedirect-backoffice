import React , {useEffect , useState} from 'react'
import Sidebar from "../sidebar/Sidebar";
import './homelStyle.css'
import "bootstrap-icons/font/bootstrap-icons.css";
import AgentIcon from '../../images/agentIcon.png'
import { useDispatch, useSelector } from 'react-redux/es/exports'
import { countAgents, countClients, deleteAgent, getAllAgents } from '../../features/admins/adminSlice';
import { Link, useNavigate } from 'react-router-dom';
import Counters from '../counters/Counters';
import { selectCurrentRoles } from '../../features/auth/authSlice';
import { deleteClient, getAllClients } from '../../features/agents/agentSlice';
import DataTable from '../dataTable/DataTable';

const Home = () => {
    const currentUserRole=useSelector(selectCurrentRoles)
    const dispatch=useDispatch();
    const navigate=useNavigate();
    const [user,setUser]=useState([])
    const [deleted,setDeleted]=useState(0);
    useEffect(()=>{
        console.log(currentUserRole.some(role => role.authority === 'ROLE_ADMIN'))
    })

    useEffect(()=>{
        fetchData();
    }, [deleted])

    async function fetchData(){
        if(currentUserRole.some(role => role.authority === 'ROLE_ADMIN')){
            const data = await dispatch(getAllAgents()).unwrap();
            setUser(data.map(item =>{
            let container={};
            container=item
            container.roles=item.roles.map(role=>{
                return " "+role.name.replace("ROLE_","")
            })
            return container
        }))
        }else{
            const data = await dispatch(getAllClients()).unwrap();
            setUser(data.map(item =>{
                let container={};
                container=item
                container.profession=item.profession !==undefined ? item.profession : " "
                container.ecole=item.ecole !==undefined ? item.ecole : " "
                if(item.active===true){
                    container.status="Active"
                }else{
                    container.status="Inactive"
                }
                return container
            }))
        }
    }
    async function handleDeleteClick(id){
        if(currentUserRole.some(role => role.authority === 'ROLE_ADMIN')){
            const res=await dispatch(deleteAgent(id)).unwrap();
            setDeleted(deleted+1);
        }else{
            const res=await dispatch(deleteClient(id)).unwrap();
            setDeleted(deleted+1);
        }
        
    }
    const handleShowUserClick = (client) => {
        if(currentUserRole.some(role => role.authority === 'ROLE_ADMIN')){
            const agent=user
            navigate("/agentDetails",{ state: {agent} })
        }
        else{
            const client=user
            navigate("/clientDetails",{ state: {client , from:"Home"}})
        }
    }

    const columns= currentUserRole.some(role => role.authority === 'ROLE_ADMIN') ?[
        { key: 'username',_style: { width: '15%' },_props: { className: 'fw-semibold' }},
        { key: 'nom',_style: { width: '15%' },_props: { className: 'fw-semibold' }},
        { key: 'prenom',_style: { width: '15%' },_props: { className: 'fw-semibold' }},
        { key: 'agence',_style: { width: '35%' },_props: { className: 'fw-semibold' }},
        { key: 'roles', sorter: false, _style: { width: '20%' },_props: { className: 'fw-semibold' } },
        { key: 'show_details',label: '',_style: { width: '1%' },filter: false,sorter: false,_props: {className: 'fw-semibold' },},
    ]:[
        { key: 'rib',label: 'RIB',_props: { className: 'fw-semibold' }},
        { key: 'cin',label: 'CIN',_props: { className: 'fw-semibold' }},
        { key: 'type',sorter: false,_props: { className: 'fw-semibold' }},
        { key: 'nom',_props: { className: 'fw-semibold' }},
        { key: 'prenom',_props: { className: 'fw-semibold' }},
        { key: 'email',sorter: false,_props: { className: 'fw-semibold' }},
        { key: 'dateNaissance',_props: { className: 'fw-semibold' }},
        { key: 'agence',sorter: false,_props: { className: 'fw-semibold' }},
        { key: 'status',sorter: false,_props: { className: 'fw-semibold' }},  
        { key: 'show_details',label: '',_style: { width: '1%' },filter: false,sorter: false,_props: {className: 'fw-semibold' },},
    ]

    const dataTablecontent= currentUserRole.some(role => role.authority === 'ROLE_ADMIN') ?(
        <>
            <div className='dataTable container rounded shadow p-4'>
                <div className='addBtn-table d-flex justify-content-end'>
                    <Link to='/addAgent' className=" btn btn-outline-primary">Add Agent</Link>
                </div>
                <DataTable 
                    itemsPerPage={5} itemsPerPageOptions={[5]} columns={columns} usersData={user} 
                    handleShowUserClick={handleShowUserClick} handleDeleteClick={handleDeleteClick} detailsBtn={true}
                    />
            </div>
        </>
    ):(
        <>
            <div className='dataTable container rounded shadow p-4 h-100 '>
                <DataTable 
                    itemsPerPage={3} itemsPerPageOptions={[3]} columns={columns} usersData={user} 
                    handleShowUserClick={handleShowUserClick} handleDeleteClick={handleDeleteClick} detailsBtn={true}
                    />
            </div>
        </>
    )
    
    return (
        <div>
            <Sidebar/>
            <div className="counters w-75">
                <Counters/>
                <div className='home-dataTable'>
                    {dataTablecontent}  
                </div>
            </div>
        </div>
    )
}

export default Home;