import React from 'react'
import Sidebar from '../sidebar/Sidebar'
import './forbiddenStyle.css'

export default function Forbidden() {
  return (
    <div >
        <Sidebar/>
        <div className='forbidden-adjust'>
            <div className="forbidden ">
                <i className="fa fa-exclamation-triangle logo" style={{fontSize: '15em'}}>  </i>
            </div>
            <div className="forbidden" >
                <h2> 403 Forbidden </h2>
            </div>
            <div className="forbidden">
                <h4> You do not have access to this resource. <br/> Please contact your administrator for privileges</h4>
            </div>
        </div>
    </div>
  )
}
