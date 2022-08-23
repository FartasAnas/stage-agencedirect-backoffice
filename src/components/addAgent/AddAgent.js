import React , {useRef , useState , useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { useDispatch } from 'react-redux/es/exports'
import { addAgent } from '../../features/admins/adminSlice'
import addAgentLogo from '../../images/addAgentLogo.png'
import Spinner from '../spinner/Spinner'

import '@fortawesome/fontawesome-free/js/all.js';
import 'bootstrap/dist/css/bootstrap.min.css';
import './AddAgentStyle.css'
import Sidebar from '../sidebar/Sidebar'

const AddAgent = () => {
    const userRef = useRef();
    const msgRef = useRef();
    const [nom, setNom] = useState('');
    const [prenom, setPrenom] = useState('');
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [errMsg, setErrMsg] = useState('');
    const [sccMsg, setSccMsg] = useState('');
    const navigate = useNavigate();
    const dispatch = useDispatch();

    /*useEffect(() => {
        userRef.current.focus();
    } , [])*/
    useEffect(() => {
        setErrMsg('');
    } , [nom, prenom, username, password])


    const handleSubmit = async (e) => {
        e.preventDefault();
        try{
            const agentData= dispatch(addAgent({ nom , prenom , username , password })).unwrap();
            console.table(agentData)
            setNom('');
            setPrenom('');
            setUsername('');
            setPassword('');
            setSccMsg('Agent Added');
            msgRef.current.focus();
            
        }catch(err){
            if(!err){
                setErrMsg('No Server Response');
            }else if(err.message.includes('400')){
                setErrMsg('Missing Nom or Prenom or Username or Password');
            }else if(err.message.includes('409')){
                setErrMsg('Username already exists');
            }else{
                setErrMsg('Add Agent Failed');
            }
            msgRef.current.focus();
        }
        
    }

    const handleNomInput = (e) => setNom(e.target.value)
    const handlePrenomInput = (e) => setPrenom(e.target.value)
    const handleUsernameInput = (e) => setUsername(e.target.value)
    const handlePwdInput = (e) => setPassword(e.target.value)
    const handleClick = () => setSccMsg('')

    return (
        <div >
            <Sidebar/>
            <div className="add-form d-flex justify-content-center">
                <div className="card d-flex row align-items-center Regular shadow #fff">
                    <div className="brand_logo_container">
                    <i class="fa fa-plus brand_logo"></i>
                    {/* <img src={addAgentLogo} alt="profile-img" className="brand_logo "/> */}
                    </div>
                    <article className="card-body spacing">
                    <hr className="hr-space"/>
                    <h4 className="card-title text-center mb-4 mt-1 add-title">Add Agent</h4>
                    <p ref={msgRef} className={errMsg ? "text-danger text-center errmsg" : "offscreen"} aria-live="assertive"> {errMsg} </p>
                    <p ref={msgRef} className={sccMsg ? "text-success text-center errmsg" : "offscreen"} aria-live="assertive"> {sccMsg} </p>
                    <form onSubmit={handleSubmit}>
                        <div className="form-group">
                            <div className="input-group">
                                <input 
                                    type="text" className="form-control add-nameInput" onClick={handleClick}
                                    placeholder="Nom" onChange={handleNomInput} value={nom} required
                                />
                                <input 
                                    type="text" className="form-control" placeholder="Prénom" onClick={handleClick}
                                    onChange={handlePrenomInput} value={prenom} required
                                />
                            </div> 
                        </div>
                        <div className="form-group">
                            <div className="input-group">
                            <div className="input-group-prepend">
                                <span className="input-group-text"> <i className="fa fa-user"></i> </span>
                            </div>
                            <input 
                                name="" className="form-control" placeholder="Username" type="text"
                                onChange={handleUsernameInput} value={username} onClick={handleClick} required
                            />
                            </div> 
                        </div>
                        <div className="form-group">
                            <div className="input-group">
                                <div className="input-group-prepend">
                                    <span className="input-group-text"> <i className="fa fa-lock"></i> </span>
                                </div>
                                <input 
                                    className="form-control" placeholder="Password" type="password"
                                    onChange={handlePwdInput} value={password} onClick={handleClick} required
                                />
                            </div>
                        </div>
                        <div className="form-group">
                            <div className="input-group">
                            <div className="input-group-prepend">
                                <span className="input-group-text"> <i className="fa fa-lock"></i> </span>
                            </div>
                            <input 
                                className="form-control" placeholder="Confirm Password" type="password"
                                onClick={handleClick}
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
export default AddAgent;