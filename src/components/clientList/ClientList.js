import React, { useEffect, useState } from 'react'
import Sidebar from '../sidebar/Sidebar'
import { useDispatch } from 'react-redux';
import DataTable from '../dataTable/DataTable';
import './clientListStyle.css'
import { getAllClients } from '../../features/agents/agentSlice';

export default function ClientList() {
    const [clients,setClients]=useState([]);
    const dispatch = useDispatch();
    async function fetchData() {
        const data = await dispatch(getAllClients()).unwrap();
        console.table(data)
        setClients(data.map(item =>{
            let container={};
            container=item
            container.agence=item.agence !==null ? item.agence.nom : " "
            container.profession=item.profession !==null ? item.profession : " "
            container.ecole=item.ecole !==undefined ? item.ecole : " "
            container.travail=item.travail !==undefined ? item.travail : " "
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
        { key: 'cin',_props: { className: 'fw-semibold' }},
        { key: 'nom',_props: { className: 'fw-semibold' }},
        { key: 'prenom',_props: { className: 'fw-semibold' }},
        { key: 'email',_props: { className: 'fw-semibold' }},
        { key: 'telephone',_props: { className: 'fw-semibold' }},
        { key: 'dateNaissance',_props: { className: 'fw-semibold' }},
        { key: 'dateExpiration',_props: { className: 'fw-semibold' }},
        { key: 'adresse',_props: { className: 'fw-semibold' }},
        { key: 'profession',_props: { className: 'fw-semibold' }},
        { key: 'agence',_props: { className: 'fw-semibold' }},
        { key: 'pack',_props: { className: 'fw-semibold' }},
        { key: 'ecole',_props: { className: 'fw-semibold' }},
        { key: 'travail',_props: { className: 'fw-semibold' }},
        { key: 'status',_props: { className: 'fw-semibold' }},  
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
                    itemsPerPage={10} itemsPerPageOptions={[10,15,20,25,30]} columns={columns} usersData={clients} 
                    handleShowUserClick={handleShowUserClick} handleDeleteClick={handleDeleteClick}
                    />
            </div>
        </>
    )
}
