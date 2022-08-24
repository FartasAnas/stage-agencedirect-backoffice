import React, { useEffect, useState } from 'react'
import { useDispatch } from 'react-redux';
import { getAllDemandes } from '../../features/agents/agentSlice';
import DataTable from '../dataTable/DataTable';
import Sidebar from '../sidebar/Sidebar';

export default function DemandeList() {
    const [demandes,setDemandes]=useState([]);
    const dispatch = useDispatch();
    async function fetchData() {
        const data = await dispatch(getAllDemandes()).unwrap();
        console.table(data)
        setDemandes(data.map(item =>{
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
            return container
        }))
    }
    useEffect(()=>{
        fetchData();
    }, [])
    const columns = [
        { key: 'cin',_props: { className: 'fw-semibold' }},
        { key: 'type',_props: { className: 'fw-semibold' }},
        { key: 'nom',_props: { className: 'fw-semibold' }},
        { key: 'prenom',_props: { className: 'fw-semibold' }},
        { key: 'email',_props: { className: 'fw-semibold' }},
        { key: 'telephone',_props: { className: 'fw-semibold' }},
        { key: 'dateNaissance',_props: { className: 'fw-semibold' }},
        { key: 'agence',_props: { className: 'fw-semibold' }},
        { key: 'pack',_props: { className: 'fw-semibold' }},
        { key: 'status',sorter: false,_props: { className: 'fw-semibold' }},  
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
            <div className='dataTable container rounded shadow p-4 h-100 '>
                <DataTable 
                    itemsPerPage={10} itemsPerPageOptions={[10,15,20,25,30]} columns={columns} usersData={demandes} 
                    handleShowUserClick={handleShowUserClick} handleDeleteClick={handleDeleteClick}
                    />
            </div>
        </>
    )
}
