import React from 'react';
import { Link } from 'react-router-dom';
import './LoginScreen.css';

export const LoginScreen = () => {
    return (
        <div className="container login-container">
            <div>
                <h1 className='h2 title'>My Calendar App</h1>
            </div>
            <div className="login-form">
                <h2 className='h3'>Login</h2>
                <form>
                <div className="form-group">
                    <input 
                        type="text"
                        className="form-control"
                        autoComplete='off'
                        name='email'
                        placeholder="Email"
                    />
                </div>
                <div className="form-group">
                    <input
                        type="password"
                        name='password'
                        className="form-control"
                        placeholder="Password"
                    />
                </div>

                <div className='row'>
                    <div className="form-group col mt-2">
                        <input 
                            type="submit" 
                            className="btnSubmit mx-auto" 
                            value="Login" />
                    </div>
                </div>
                <div className='col'>
                    <div className='row justify-content-end'>
                        <Link className='already-registered' to='/register'>Not registered? Click here</Link>
                    </div>
                </div>
                </form>
            </div>
        </div>
    )
}
