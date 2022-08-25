import React, { useState, useEffect } from "react";
import { CSmartTable, CBadge, CButton, CCollapse, CCardBody } from '@coreui/react-pro'
import 'bootstrap/dist/css/bootstrap.min.css'
import 'bootstrap/dist/js/bootstrap.min.js'
import "./dataTableStyle.css"

export default function DataTable(props) {
    
    const [details, setDetails] = useState([])
    const [deleteItemId,setDeleteItemId]=useState()

    const handleDeleteItem = (id) => setDeleteItemId(id)
    const handleConfirmDelete=(id)=>{
        props.handleDeleteClick(id);
        // toggleDetails(id)
    }
    
    const getBadge = (status) => {
    switch (status) {
        case 'Active':
            return 'success'
        case 'Inactive':
            return 'secondary'
    }
    }
    const toggleDetails = (index) => {
    const position = details.indexOf(index)
    let newDetails = details.slice()
    if (position !== -1) {
        newDetails.splice(position, 1)
    } else {
        newDetails = [...details, index]
    }
    setDetails(newDetails)
    }
    return (
        <div>
            <CSmartTable
                tableHeadProps={{ color: 'light' }}
                columns={props.columns}
                columnFilter
                columnSorter
                items={props.usersData}
                itemsPerPageSelect
                itemsPerPage={props.itemsPerPage}
                itemsPerPageOptions={props.itemsPerPageOptions}
                pagination
                scopedColumns={{
                    status: (item) => (
                        <td>
                            <CBadge color={getBadge(item.status)}>{item.status}</CBadge>
                        </td>
                    ),
                    show_details: (item) => {
                        return (
                        <td className="py-2">
                            <CButton
                                variant="outline"
                                shape="square"
                                size="sm"
                                onClick={() => {toggleDetails(item.id)}}
                                >
                                {details.includes(item.id) ? 'Hide' : 'Show'}
                            </CButton>
                        </td>
                        )
                    },
                    details: (item) => {
                        return (
                        <CCollapse visible={details.includes(item.id)}>
                            <CCardBody className="d-flex flex-end m-1" >
                                <h3>{item._name}</h3>   
                                <CButton  size="sm" color="danger" className="ml-1"  data-bs-toggle="modal" data-bs-target="#deleteModal"
                                    onClick={() => {handleDeleteItem(item.id)}}
                                >
                                    Delete
                                </CButton>
                                <svg className="bi me-2" width="0" height="0"></svg> 
                                {
                                    props.detailsBtn===true ? (
                                        <CButton size="sm" color="primary" onClick={() => {props.handleShowUserClick(item)}}>
                                            Details
                                        </CButton>
                                    ):(null)
                                }
                               
                            </CCardBody>
                        </CCollapse>
                        )
                    },
                }}
                sorterValue={{ column: 'name', state: 'asc' }}
                tableFilter
                tableProps={{
                    responsive: true,
                }}
            />
            {/* Delete Modal */}
            <div className="modal fade" id="deleteModal" tabIndex="-1" aria-labelledby="deleteModalLabel" aria-hidden="true">
                <div className="modal-dialog">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h5 className="modal-title" id="deleteModalLabel">Delete this User</h5>
                            <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                        </div>
                        <div className="modal-body">
                            <div className="alert alert-danger fs-5">
                                <span className="d-flex justify-content-center alert-icon"><i className="fa fa-triangle-exclamation fa-3x "></i></span>
                                <span className="d-flex justify-content-center">Are you sure you want to delete this User?</span>
                            </div>
                        </div>
                        <div className="modal-footer">
                            <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">
                                <i className="fa fa-square-xmark"></i>
                                <svg className="bi me-2" width="0" height="0"></svg>
                                No
                            </button>
                            <button type="button" className="btn btn-danger" data-bs-dismiss="modal" onClick={() => {handleConfirmDelete(deleteItemId)}}>
                                <i className="fa fa-square-check"></i>
                                <svg className="bi me-2" width="0" height="0"></svg>
                                Yes
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}
