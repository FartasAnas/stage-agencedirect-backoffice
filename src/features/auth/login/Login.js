import React , {useRef , useState , useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { useDispatch } from 'react-redux/es/exports'
import { setCredentials } from '../authSlice'
import { useLoginMutation } from '../authApiSlice'
import { Link } from 'react-router-dom'
import Logo from '../../../components/logo/Logo'
import 'font-awesome/css/font-awesome.min.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import './loginStyle.css'

const Login = () => {
    const userRef = useRef();
    const errRef = useRef();
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [errMsg, setErrMsg] = useState('');
    const navigate = useNavigate();

    const [login, { isLoading }] = useLoginMutation();
    const dispatch = useDispatch();

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
            let user=username;
            let token=userData.accessToken;
            console.log("user",username)
            dispatch(setCredentials({...userData,username}));
            setUsername('');
            setPassword('');
            navigate('/welcome');
        }catch(err){
            if(!err?.originalStatus){
                setErrMsg('No Server Response');
            }else if(err.originalStatus === 400){
                setErrMsg('Missing Username or Password');
            }else if(err.originalStatus === 401){
                setErrMsg('Unauthorized');
            }else{
                setErrMsg('Login Failed'); 
            }
            errRef.current.focus();
        }
    }
    
    const handleUserInput = (e) => setUsername(e.target.value)
    const handlePwdInput = (e) => setPassword(e.target.value)

    const content = isLoading ? (
        <div className="login-form d-flex justify-content-center">
            <div className="loading spinner-border text-primary" role="status"/>
        </div>
    ):(
        <div className="card d-felx row w-25 justify-content-center align-items-center Regular shadow #fff">
          <Logo />
          <article className="card-body">
            <hr/>
            <h4 className="card-title text-center mb-4 mt-1">Sign in</h4>
            <p ref={errRef} className={errMsg ? "text-danger text-center errmsg" : "offscreen"} aria-live="assertive">
              {errMsg}
            </p>
            <form onSubmit={handleSubmit}>
              <div className="form-group">
                <div className="input-group">
                  <div className="input-group-prepend">
                    <span className="input-group-text"> <i className="fa fa-user"></i> </span>
                  </div>
                  <input 
                    type="text" id="username" ref={userRef} value={username} 
                    onChange={handleUserInput} className="form-control" 
                    placeholder="Username" required
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
                <button type="submit" className="btn btn-primary btn-block"> Login  </button>
              </div>
              <p className="text-center"><a href="#" className="btn forgot-password">Forgot password?</a></p>
            </form>
          </article>
        </div>
    )

    return (
        <div className="login-form d-felx row justify-content-center align-items-center ">
            {content}
        </div>
    )
}

export default Login