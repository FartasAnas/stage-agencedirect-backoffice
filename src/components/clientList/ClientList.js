import React, { useEffect, useState } from 'react'
import Sidebar from '../sidebar/Sidebar'
import { useDispatch } from 'react-redux';
import DataTable from '../dataTable/DataTable';
import './clientListStyle.css'
import { getAllClients } from '../../features/agents/agentSlice';
import { useNavigate } from 'react-router-dom';

export default function ClientList() {
    const [clients,setClients]=useState([]);
    const dispatch = useDispatch();
    const navigate=useNavigate();
    async function fetchData() {
        const data = await dispatch(getAllClients()).unwrap();
        console.table(data)
        setClients(data.map(item =>{
            let container={};
            container=item
            container.agence=item.agence !==null ? item.agence.nom : " "
            container.profession=item.profession !==undefined ? item.profession : " "
            container.ecole=item.ecole !==undefined ? item.ecole : " "
            if(item.active===true){
                container.status="Active"
            }else{
                container.status="Inactive"
            }
            
            // container.roles=item.roles.map(role=>{
            //     return " "+role.name.replace("ROLE_","")
            // })
            return container
        }))
    }
    useEffect(()=>{
        fetchData();
    }, [])
    const columns = [
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
    const handleDeleteClick = (id) => {
        console.log("deleted id",id)
    }
    const handleShowUserClick = (client) => {
        navigate("/clientDetails",{ state: {client} })
    }
    return (
        <>
            <Sidebar/>
            <div className='dataTable container rounded shadow p-4 h-100 '>
                <DataTable 
                    itemsPerPage={10} itemsPerPageOptions={[10,15,20,25,30]} columns={columns} usersData={clients} 
                    handleShowUserClick={handleShowUserClick} handleDeleteClick={handleDeleteClick} detailsBtn={true}
                    />
            </div>
        </>
    )
}
