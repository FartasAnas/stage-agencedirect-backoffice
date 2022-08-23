import React, { useState, useEffect } from "react";
import { CSmartTable, CBadge, CButton, CCollapse, CCardBody } from '@coreui/react-pro'
import 'bootstrap/dist/css/bootstrap.min.css'

export default function DataTable(props) {
    const [details, setDetails] = useState([])
    
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
                                onClick={() => {toggleDetails(item._id)}}
                                >
                                {details.includes(item._id) ? 'Hide' : 'Show'}
                            </CButton>
                        </td>
                        )
                    },
                    details: (item) => {
                        return (
                        <CCollapse visible={details.includes(item._id)}>
                            <CCardBody className="d-flex flex-end m-1" >
                                <h3>{item._name}</h3>   
                                <CButton size="sm" color="danger" className="ml-1" onClick={() => {props.handleDeleteClick(item.id)}}>
                                    Delete
                                </CButton>
                                <svg className="bi me-2" width="0" height="0"></svg> 
                                <CButton size="sm" color="primary" onClick={() => {props.handleShowUserClick(item.id)}}>
                                    Details
                                </CButton>
                            </CCardBody>
                        </CCollapse>
                        )
                    },
                }}
                sorterValue={{ column: 'name', state: 'asc' }}
                tableFilter
                tableProps={{
                    responsive: true,
                    hover: true,
                }}
            />
        </div>
    )
}
