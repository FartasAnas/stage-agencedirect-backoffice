import React , {useRef , useState , useEffect } from 'react'
import { useDispatch } from 'react-redux/es/exports'
import { addAgent, getAllRoles } from '../../features/admins/adminSlice'
import '@fortawesome/fontawesome-free/js/all.js';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.min.js'
import './AddAgentStyle.css'
import Sidebar from '../sidebar/Sidebar'

const AddAgent = () => {
    const msgRef = useRef();
    const [nom, setNom] = useState('');
    const [prenom, setPrenom] = useState('');
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [passwordError, setPasswordErr] = useState("");
    const [confirmPasswordError, setConfirmPasswordError] = useState("");
    const [roles, setRoles] = useState([]);
    const [errMsg, setErrMsg] = useState('');
    const [sccMsg, setSccMsg] = useState('');
    const [rolesList, setRolesList] = useState([]);
    const [addBtn, setAddBtn] = useState(
        <div className="form-group">
            <button type="submit" className="btn btn-block btn-secondary" data-bs-toggle="modal" data-bs-target="#addModal" disabled> Add </button>
        </div>
    );
    const dispatch = useDispatch();

    /*useEffect(() => {
        userRef.current.focus();
    } , [])*/
    useEffect(() => {
        setErrMsg('');
    } , [nom, prenom, username, password , roles , confirmPassword])
    useEffect(()=>{
        async function fetchData() {
            const dataRole = await dispatch(getAllRoles()).unwrap();
            let dataRolefilter=dataRole.filter(role=>{
                return role.name !== "ROLE_CLIENT"
            })
            setRolesList(dataRolefilter.map(role=>{
                role.name=role.name.replace("ROLE_","")
                return role
            }))
        }
        fetchData();
    }, [])
    const handleValidation= (evnt)=>{
        console.log(evnt);
        const passwordInputValue = evnt.target.value.trim();
        const passwordInputFieldName = evnt.target.name;
            //for password 
        if(passwordInputFieldName==='password'){
            const uppercaseRegExp   = /(?=.*?[A-Z])/;
            const lowercaseRegExp   = /(?=.*?[a-z])/;
            const digitsRegExp      = /(?=.*?[0-9])/;
            const specialCharRegExp = /(?=.*?[#?!@$%^&*-])/;
            const minLengthRegExp   = /.{8,}/;
            const passwordLength =      passwordInputValue.length;
            const uppercasePassword =   uppercaseRegExp.test(passwordInputValue);
            const lowercasePassword =   lowercaseRegExp.test(passwordInputValue);
            const digitsPassword =      digitsRegExp.test(passwordInputValue);
            const specialCharPassword = specialCharRegExp.test(passwordInputValue);
            const minLengthPassword =   minLengthRegExp.test(passwordInputValue);
            let passworderrMsg ="";
            if(passwordLength===0){
                console.log("Password is empty")
                passworderrMsg="Password is empty";
            }else if(!uppercasePassword){
                passworderrMsg="At least one Uppercase";
            }else if(!lowercasePassword){
                passworderrMsg="At least one Lowercase";
            }else if(!digitsPassword){
                passworderrMsg="At least one digit";
            }else if(!specialCharPassword){
                passworderrMsg="At least one Special Characters";
            }else if(!minLengthPassword){
                passworderrMsg="At least minumum 8 characters";
            }else{
                passworderrMsg="";
            }
            setPasswordErr(passworderrMsg);
        }
        // for confirm password
        if(passwordInputFieldName=== "confirmPassword" || (passwordInputFieldName==="password" && confirmPassword.length>0) ){

            if(confirmPassword!==password){
                setConfirmPasswordError("Confirm password is not matched");
            }
            else {
                setConfirmPasswordError("");
                console.log('password correct')
                setAddBtn(
                    <div className="form-group">
                        <button type="submit" className="btn btn-block add-btn" data-bs-toggle="modal" data-bs-target="#addModal"> Add </button>
                    </div>
                )
            }
        }
    }
    
    const handleAddAgent = async (e) => {
        e.preventDefault();
        try{
            await dispatch(addAgent({ nom , prenom , username , password , roles })).unwrap();
            setNom('');
            setPrenom('');
            setRoles(([{"id":""}]))
            setUsername('');
            setPassword('');
            setConfirmPassword('')
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
    const handleSelectedRole=(e) => { setRoles([{ "id":e.target.value }])}
    const handleNomInput = (e) => setNom(e.target.value)
    const handlePrenomInput = (e) => setPrenom(e.target.value)
    const handleUsernameInput = (e) => setUsername(e.target.value)
    const handlePwdInput = (e) => setPassword(e.target.value)
    const handleConfirmPwdInput = (e) => setConfirmPassword(e.target.value)
    const handleClick = () => setSccMsg('')
    const handleSubmit = (e) => e.preventDefault()
    
    return (
        <div className='addAgent'>
            <Sidebar/>
            <div className="add-form d-flex justify-content-center">
                <div className="card d-flex row align-items-center Regular shadow #fff">
                    <div className="brand_logo_container">
                    <i className="fa fa-plus brand_logo"></i>
                    </div>
                    <article className="card-body spacing">
                    <hr className="hr-space"/>
                    <h4 className="card-title text-center mb-4 mt-1 add-title">Add Agent</h4>
                    <div className={errMsg ? "alert alert-danger p-0 ": "offscreen"}>
                        <p ref={msgRef} className={errMsg ? "text-danger text-center errmsg pt-3" : "offscreen"} aria-live="assertive"> {errMsg} </p>
                    </div>
                    <div className={sccMsg ? "alert alert-success p-0 ": "offscreen"}>
                        <p ref={msgRef} className={sccMsg ? "text-success text-center errmsg pt-3" : "offscreen"} aria-live="assertive"> {sccMsg} </p>
                    </div>
                    <form onSubmit={handleSubmit} >
                        <div className="form-group">
                            <div className="input-group">
                                <input 
                                    type="text" className="form-control add-nameInput rounded-right" onClick={handleClick}
                                    placeholder="Nom" onChange={handleNomInput} value={nom} required
                                />
                                <input 
                                    type="text" className="form-control rounded-left" placeholder="Prénom" onClick={handleClick}
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
                                    <span className="input-group-text"> <i className="fa fa-user-gear"></i> </span>
                                </div>
                                <select className="form-select add-nameInput rounded-right" onChange={handleSelectedRole} name="rolechosen" id="rolechosen" required>
                                    <option defaultValue value="" >Chose Role</option>
                                    {rolesList.map(role=>{
                                        return <option key={role.id} value={role.id}>{role.name}</option>
                                    })}
                                </select>
                            </div> 
                        </div>
                        <div className="form-group">
                            <div className="input-group">
                                <div className="input-group-prepend">
                                    <span className="input-group-text"> <i className="fa fa-lock"></i> </span>
                                </div>
                                <input 
                                    className="form-control" placeholder="Password" type="password" name="password"
                                    onKeyUp={handleValidation} onChange={handlePwdInput} value={password} onClick={handleClick} required 
                                />
                            </div>
                            <p className="text-danger">{passwordError}</p>
                        </div>
                        <div className="form-group">
                            <div className="input-group">
                                <div className="input-group-prepend">
                                    <span className="input-group-text"> <i className="fa fa-lock"></i> </span>
                                </div>
                                <input 
                                    className="form-control" placeholder="Confirm Password" type="password" name="confirmPassword"
                                    onClick={handleClick} onChange={handleConfirmPwdInput} onKeyUp={handleValidation} value={confirmPassword}  
                                />
                            </div>
                            <p className="text-danger">{confirmPasswordError}</p>
                        </div>
                        {addBtn}
                        </form>

                        <div className="modal fade" id="addModal" tabIndex="-1" aria-labelledby="AddModalLabel" aria-hidden="true">
                            <div className="modal-dialog">
                                <div className="modal-content">
                                    <div className="modal-header">
                                        <h5 className="modal-title" id="deleteModalLabel">Add this Agent</h5>
                                        <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                                    </div>
                                    <div className="modal-body">
                                        <div className="alert alert-primary">
                                            <span className="">
                                                <p className='d-flex justify-content-center fs-5 m-0'>Are you sure you want to add this Agent?</p>
                                            </span>
                                        </div>
                                    </div>
                                    <div className="modal-footer">
                                        <button type="button" className="btn btn-success" data-bs-dismiss="modal" onClick={handleAddAgent}>
                                            <i className="fa fa-square-check"></i>
                                            <svg className="bi me-2" width="0" height="0"></svg>
                                            Yes
                                        </button>
                                        <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">
                                            <i className="fa fa-square-xmark"></i>
                                            <svg className="bi me-2" width="0" height="0"></svg>
                                            No
                                        </button>
                                        
                                    </div>
                                </div>
                            </div>
                        </div>
                    </article>
                    
                </div>
            </div>

            
            
        </div>
    )
}
export default AddAgent;