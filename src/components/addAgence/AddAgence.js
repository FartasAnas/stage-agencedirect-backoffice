import React, { useEffect, useRef, useState } from 'react'
import { addAgence } from '../../features/admins/adminSlice';
import { useDispatch } from 'react-redux/es/exports'
import Sidebar from '../sidebar/Sidebar';
import './addAgenceStyle.css'

export default function AddAgence() {
    const msgRef = useRef();
    const [nom, setNom] = useState('');
    const [ville, setVille] = useState('');
    const [adresse, setAdresse] = useState('');
    const [errMsg, setErrMsg] = useState('');
    const [sccMsg, setSccMsg] = useState('');
    const dispatch = useDispatch();

    useEffect(() => {
        setErrMsg('');
    } , [nom, ville, adresse])


    const handleSubmit = async (e) => {
        e.preventDefault();
        try{
            const agentdata=await dispatch(addAgence({ nom , ville , adresse})).unwrap();
            setNom('');
            setVille('');
            setAdresse('');
            setSccMsg('Agence Added');
            msgRef.current.focus();
        }catch(err){
            if(!err){
                setErrMsg('No Server Response');
            }else if(err.message.includes('400')){
                setErrMsg('Missing Nom or ville or adresse');
            }else if(err.message.includes('409')){
                setErrMsg('Agence already exists');
            }else{
                setErrMsg('Add Agence Failed');
            }
            msgRef.current.focus();
        }
        
    }
    const handleNomInput = (e) => setNom(e.target.value)
    const handleVilleInput = (e) => setVille(e.target.value)
    const handleAdresseInput = (e) => setAdresse(e.target.value)
    const handleClick = () => setSccMsg('')
    
    return (
        <div className='addAgent'>
            <Sidebar/>
            <div className="add-form d-flex justify-content-center">
                <div className="agence card d-flex row align-items-center Regular shadow #fff">
                    <div className="brand_logo_container">
                    <i className="fa fa-plus brand_logo"></i>
                    </div>
                    <article className="agence card-body spacing">
                    <hr className="hr-space"/>
                    <h4 className="card-title text-center mb-4 mt-1 add-title">Add Agence</h4>
                    <div className={errMsg ? "alert alert-danger p-0 ": "offscreen"}>
                        <p ref={msgRef} className={errMsg ? "text-danger text-center errmsg pt-3" : "offscreen"} aria-live="assertive"> {errMsg} </p>
                    </div>
                    <div className={sccMsg ? "alert alert-success p-0 ": "offscreen"}>
                        <p ref={msgRef} className={sccMsg ? "text-success text-center errmsg pt-3" : "offscreen"} aria-live="assertive"> {sccMsg} </p>
                    </div>
                    <form onSubmit={handleSubmit}>
                        <div className="form-group">
                            <div className="input-group">
                                <div className="input-group-prepend">
                                    <span className="input-group-text"> <i class="fa fa-shop"></i> </span>
                                </div>
                                <input 
                                    type="text" className="form-control add-nameInput rounded-right" onClick={handleClick}
                                    placeholder="Nom" onChange={handleNomInput} value={nom} required
                                />
                            </div> 
                        </div>
                        <div className="form-group">
                            <div className="input-group">
                            <div className="input-group-prepend">
                                <span className="input-group-text"> <i class="fa fa-city"></i></span>
                            </div>
                            <input 
                                type="text" className="form-control" placeholder="Ville" onClick={handleClick}
                                onChange={handleVilleInput} value={ville}  required
                            />
                            </div> 
                        </div>
                        <div className="form-group">
                            <div className="input-group">
                                <div className="input-group-prepend">
                                    <span className="input-group-text"> <i class="fa fa-map-location-dot"></i></span>
                                </div>
                                <input 
                                    type="text" className="form-control" placeholder="Adresse" onClick={handleClick}
                                    onChange={handleAdresseInput} value={adresse}  required
                                />
                            </div> 
                        </div>
                        <div className="form-group">
                            <button type="submit" className="btn btn-block add-btn"> Add </button>
                        </div>
                        </form>
                    </article>
                </div>
            </div>
            
        </div>
    )
}
