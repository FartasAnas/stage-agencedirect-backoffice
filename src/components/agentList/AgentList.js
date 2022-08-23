import React, { useEffect, useState } from 'react'
import Sidebar from '../sidebar/Sidebar'
import { useDispatch } from 'react-redux';
import { getAllAgents } from '../../features/admins/adminSlice';
import DataTable from '../dataTable/DataTable';
import './agentListStyle.css'

export default function AgentList() {
    const [agents,setAgents]=useState([]);
    const dispatch = useDispatch();
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
    }, [])
    const columns = [
        { key: 'username',_style: { width: '15%' },_props: { className: 'fw-semibold' }},
        { key: 'nom',_style: { width: '15%' },_props: { className: 'fw-semibold' }},
        { key: 'prenom',_style: { width: '15%' },_props: { className: 'fw-semibold' }},
        { key: 'agence',_style: { width: '35%' },_props: { className: 'fw-semibold' }},
        { key: 'roles', sorter: false, _style: { width: '20%' } },
        { key: 'show_details',label: '',_style: { width: '1%' },filter: false,sorter: false,_props: {className: 'fw-semibold' },},
    ]
    const handleDeleteClick = (id) => {
        console.log("deleted id",id)
    }
    const handleShowUserClick = (id) => {
        console.log("Edited id",id)
    }
    return (
        <>
            <Sidebar/>
            <div className='dataTable container rounded shadow p-4  h-100 w-75 text-capitalize'>
                <DataTable 
                    itemsPerPage={10} itemsPerPageOptions={[10,15,20,25,30]} columns={columns} usersData={agents} 
                    handleShowUserClick={handleShowUserClick} handleDeleteClick={handleDeleteClick}
                    />
            </div>
        </>
    )
}
