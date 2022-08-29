import React , {useRef , useState , useEffect } from 'react'
import { Navigate, useNavigate } from 'react-router-dom'
import { useDispatch } from 'react-redux/es/exports'
import { setCredentials , selectCurrentUser } from '../../features/auth/authSlice'
import { useLoginMutation } from '../../features/auth/authApiSlice'
import { useSelector } from "react-redux";
import Logo from '../logo/Logo'
import '@fortawesome/fontawesome-free/js/all.js';
import 'bootstrap/dist/css/bootstrap.min.css';
import './loginStyle.css'
import Spinner from '../spinner/Spinner'

const Login = () => {
    
    const userRef = useRef();
    const errRef = useRef();
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [isLogedIn, setIsLogedIn] = useState(false);
    const [errMsg, setErrMsg] = useState('');
    const navigate = useNavigate();

    const [login, { isLoading }] = useLoginMutation();
    const dispatch = useDispatch();

    useEffect(() => {
      if(localStorage.getItem("user")!=undefined){
        navigate('/home');
      }
    }, [])
    useEffect(() => {
        userRef.current.focus();
    }, [])
    useEffect(() => {
        setErrMsg('');
    }, [username, password])

    const handleSubmit = async (e) => {
        e.preventDefault();
        try{
            const userData= await login({ username , password }).unwrap();
            dispatch(setCredentials({...userData,username}));
            setUsername('');
            setPassword('');
            navigate('/home');
        }catch(err){
            if(!err?.status){
                setErrMsg('No Server Response');
            }else if(err.status === 400){
                setErrMsg('Missing Username or Password');
            }else if(err.status === 401){
                setErrMsg('Wrong Username or Password');
            }else{
                setErrMsg('Login Failed'); 
            }
            errRef.current.focus();
        }
    }
    
    const handleUserInput = (e) => setUsername(e.target.value.toLowerCase())
    const handlePwdInput = (e) => setPassword(e.target.value)

    const content = isLoading ? (
        <Spinner/>
    ):(
        <div className="card w-25 align-items-center Regular shadow #fff">
          <article className="card-body text-center">
            <Logo />  
            <hr/>
            <h4 className="card-title text-center mb-4 mt-1">Sign in</h4>
            <div className={errMsg ? "alert alert-danger p-0 ": "offscreen"}>
              <p ref={errRef} className={errMsg ? "text-danger text-center errmsg pt-3" : "offscreen"} aria-live="assertive"> {errMsg} </p>
            </div>
            
            <form onSubmit={handleSubmit}>
              <div className="form-group">
                <div className="input-group">
                  <div className="input-group-prepend">
                    <span className="input-group-text"> <i className="fa fa-user"></i> </span>
                  </div>
                  <input 
                    type="text" id="username" ref={userRef} value={username} 
                    onChange={handleUserInput} className="form-control" 
                    placeholder="Username" autoComplete='off' required
                  />
                </div> 
                </div>
                <div className="form-group">
                <div className="input-group">
                  <div className="input-group-prepend">
                    <span className="input-group-text"> <i className="fa fa-lock"></i> </span>
                  </div>
                  <input 
                    type="password" id="password" className="form-control" 
                    placeholder="******" onChange={handlePwdInput} 
                    value={password} required
                  />
                </div>
                </div>
                <div className="form-group">
                <button type="submit" className="btn btn-block login-btn"> Login  </button>
              </div>
              <p className="text-center"><a href="#" className="btn forgot-password">Forgot password?</a></p>
            </form>
          </article>
        </div>
    )

    return (
        <div className='login-page'>
          <div className="login-form  d-flex justify-content-center align-items-center">
              {content}
          </div>
        </div>
    )
}

export default Login