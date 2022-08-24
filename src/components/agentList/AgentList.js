import React, { useEffect, useState } from 'react'
import Sidebar from '../sidebar/Sidebar'
import { useDispatch } from 'react-redux';
import { deleteAgent, getAllAgents } from '../../features/admins/adminSlice';
import DataTable from '../dataTable/DataTable';
import './agentListStyle.css'
import { Link, useNavigate } from 'react-router-dom';

export default function AgentList() {
    const [agents,setAgents]=useState([]);
    const [deleted,setDeleted]=useState(0);
    const dispatch = useDispatch();
    const navigate=useNavigate();
    /*const fetchData = async () => {
        const data = await dispatch(getAllAgents()).unwrap();
        setAgents(data)
        // console.table(agents);
    }*/
    async function fetchData() {
        const data = await dispatch(getAllAgents()).unwrap();
        setAgents(data.map(item =>{
            let container={};
            container=item
            container.roles=item.roles.map(role=>{
                return " "+role.name.replace("ROLE_","")
            })
            container.agence=item.agence !==null ? item.agence.nom : " "
            return container
        }))
    }
    useEffect(()=>{
        fetchData();
    }, [deleted])
    const columns = [
        { key: 'username',_style: { width: '15%' },_props: { className: 'fw-semibold' }},
        { key: 'nom',_style: { width: '15%' },_props: { className: 'fw-semibold' }},
        { key: 'prenom',_style: { width: '15%' },_props: { className: 'fw-semibold' }},
        { key: 'agence',_style: { width: '35%' },_props: { className: 'fw-semibold' }},
        { key: 'roles', sorter: false, _style: { width: '20%' },_props: { className: 'fw-semibold' } },
        { key: 'show_details',label: '',_style: { width: '1%' },filter: false,sorter: false,_props: {className: 'fw-semibold' },},
    ]
    async function handleDeleteClick(id){
        const res=await dispatch(deleteAgent(id)).unwrap();
        setDeleted(deleted+1);
    }
    const handleShowUserClick = (id,agent) => {
        navigate("/editAgent",{ replace: true, state: {id,agent} })
    }
    return (
        <>
            <Sidebar/>
            <div className='agent-dataTable container rounded shadow p-4  h-100 w-75 text-capitalize'>
                <div className='addBtn-table d-flex justify-content-end'>
                    <Link to='/addAgent' class=" btn btn-outline-primary">Add Agent</Link>
                </div>
                <DataTable 
                    itemsPerPage={10} itemsPerPageOptions={[10,15,20,25,30]} columns={columns} usersData={agents} 
                    handleShowUserClick={handleShowUserClick} handleDeleteClick={handleDeleteClick} detailsBtn={true}
                    />
            </div>
        </>
    )
}
