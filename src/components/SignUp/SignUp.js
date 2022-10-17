import React, { useContext, useState } from 'react';
import { Link } from 'react-router-dom';
import { AuthContext } from '../Contexts/UserContext';
import './SignUp.css'

const SignUp = () => {
    const [error, setError] = useState(null);
    const { createUser } = useContext(AuthContext)
    console.log(createUser)

    const handelSubmit = (event) => {
        event.preventDefault()
        const form = event.target;
        const email = form.email.value;
        const password = form.password.value;
        const confirm = form.confirm.value;
        console.log(email, password, confirm)
        if (password.length < 6) {
            setError('Password should be 6 character or more')
            return;
        }
        if (password !== confirm) {
            setError('Your Password Did not match')
            return;
        }
        createUser(email, password)
            .then(result => {
                const user = result.user;
                console.log(user)
                form.reset()
            })
            .catch(error => {
            console.error(error)
        })
    }
    return (
        <div className='form-container'>
            <h3 className='form-title'>Sign Up</h3>
            <form onSubmit={handelSubmit}>
                
                <div className="form-control">
                    <label htmlFor="email">Email</label>
                    <input type="email" name="email" required />
                </div>
                <div className="form-control">
                    <label htmlFor="password">Password</label>
                    <input type="password" name="password" />
                </div>
                <div className="form-control">
                    <label htmlFor="confirm">Confirm Password</label>
                    <input type="password" name="confirm" />
                </div>
                <input className='btn-submit' type="submit" value="Sign Up" />
            </form>
            <p className=''>Already Have an Account? <Link to='/login'>Log In</Link> </p>
            <p className='text-error'>{error}</p>
        </div>
    );
};

export default SignUp;