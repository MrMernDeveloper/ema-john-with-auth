import React, { useContext, useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { AuthContext } from '../Contexts/UserContext';
import './Login.css'

const Login = () => {
    const [errorinfo, setError] = useState('')
    const { signIn } = useContext(AuthContext)
    const navigate = useNavigate();
    const location = useLocation();
    const from = location.state?.from?.pathname || '/'

    
    const handelSubmit = (event) => {
        event.preventDefault()
        const form = event.target;
        const email = form.email.value;
        const password = form.password.value

        signIn(email, password)
            .then(result => {
                const user = result.user;
                console.log(user)
                form.reset()
                navigate(from, {replace: true})
            })
            .catch(error => {
                console.error(error)
                setError('wrong password')
               
        })

    }
    return (
        <div className='form-container'>
            <h3 className='form-title'>Login</h3>
            <form onSubmit={handelSubmit}>
                <div className="form-control">
                    <label htmlFor="email">Email</label>
                    <input type="email" name="email" required />
                </div>
                <div className="form-control">
                    <label htmlFor="password">Password</label>
                    <input type="password" name="password" />
                </div>
                <input className='btn-submit' type="submit" value="Login" />
            </form>
            <p className=''>New to ema john <Link to='/signup'>Create a New Account</Link> </p>
            <p>{errorinfo}</p>
           
        </div>
    );
};

export default Login;