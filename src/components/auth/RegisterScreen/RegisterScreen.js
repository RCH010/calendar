import React from 'react';
import { Link } from 'react-router-dom';
import './RegisterScreen.css';

export const RegisterScreen = () => {
    return (
        <div className="container register-container">
            <div>
                <h1 className='h2 title'>My Calendar App</h1>
            </div>
            <div className="register-form">
                <h2 className='h3'>Sign in</h2>
                <form>
                    <div className="form-group">
                        <input
                            type="text"
                            className="form-control"
                            name='name'
                            placeholder="Name"
                        />
                    </div>
                    <div className="form-group">
                        <input
                            type="email"
                            className="form-control"
                            name='email'
                            placeholder="Email"
                        />
                    </div>
                    <div className="form-group">
                        <input
                            type="password"
                            className="form-control"
                            name='password'
                            placeholder="Password" 
                        />
                    </div>

                    <div className="form-group">
                        <input
                            type="password"
                            className="form-control"
                            name='password2'
                            placeholder="Confirm password" 
                        />
                    </div>
                    <div className='row'>
                        <div className="form-group col mt-2">
                            <input 
                                type="submit" 
                                className="btnSubmit mx-auto" 
                                value="Create account" />
                        </div>
                    </div>
                    <div className='col'>
                        <div className='row justify-content-end'>
                            <Link className='already-registered' to='/login'>Already registered? Click here</Link>
                        </div>
                    </div>
                </form>
            </div>
        </div>
    )
}
