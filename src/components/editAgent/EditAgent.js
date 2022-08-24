import React, { useEffect } from 'react'
import { useLocation } from 'react-router-dom'
import Sidebar from '../sidebar/Sidebar'
import './editAgentStyle.css'

export default function EditAgent(id) {
    const location = useLocation();
    const agent=location.state.agent
    useEffect(()=>{
        console.log(agent)
    }, [])
    return (
        <div>
            <div>
                <Sidebar/>
            </div>
            <div className='editForm w-75 h-50 p-5 rounded shadow'>
                <form>
                    <div className="row mb-4">
                    <div className="col">
                        <div className="form-outline">
                        <input type="text" id="form6Example1" className="form-control" placeholder={agent.nom} />
                        <label className="form-label" htmlFor="form6Example1">Nom</label>
                        </div>
                    </div>

                    <div className="col">
                        <div className="form-outline">
                        <input type="text" id="form6Example2" className="form-control" placeholder={agent.prenom}/>
                        <label className="form-label" htmlFor="form6Example2">Prenom</label>
                        </div>
                    </div>

                    </div>
                    <div className="form-outline mb-4">
                        <input type="text" id="form6Example3" className="form-control" placeholder={agent.username}/>
                        <label className="form-label" htmlFor="form6Example3">Username</label>
                    </div>

                    <div className="form-outline mb-4">
                        <input type="text" id="form6Example4" className="form-control" placeholder={agent.agence}/>
                        <label className="form-label" htmlFor="form6Example4">Agence</label>
                    </div>
                
                    <div className="form-outline mb-4">
                    <input type="email" id="form6Example5" className="form-control" placeholder={agent.roles}/>
                    <label className="form-label" htmlFor="form6Example5">Roles</label>
                    </div>
                    <button type="submit" className="btn btn-primary btn-block mb-4">Apply Change</button>
                </form>
            </div>
        </div>
    )
}
