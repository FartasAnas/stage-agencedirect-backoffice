import React, { useEffect, useState } from 'react'
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { deleteClient, getAllDemandes } from '../../features/agents/agentSlice';
import DataTable from '../dataTable/DataTable';
import Sidebar from '../sidebar/Sidebar';

export default function DemandeList() {
    const [demandes,setDemandes]=useState([]);
    const dispatch = useDispatch();
    const navigate=useNavigate();
    const [deleted,setDeleted]=useState(0);
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
    }, [deleted])
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
    async function handleDeleteClick(id){
        const res=await dispatch(deleteClient(id)).unwrap();
        setDeleted(deleted+1);
    }
    const handleShowUserClick = (client) => {
        navigate("/clientDetails",{ state: {client} })
    }
    return (
        <>
            <Sidebar/>
            <div className='dataTable container rounded shadow p-4 h-100 '>
                <DataTable 
                    itemsPerPage={10} itemsPerPageOptions={[10,15,20,25,30]} columns={columns} usersData={demandes} 
                    handleShowUserClick={handleShowUserClick} handleDeleteClick={handleDeleteClick} detailsBtn={true}
                    />
            </div>
        </>
    )
}
