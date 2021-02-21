import React from 'react'
import './Navbar.css'
export const Navbar = () => {
    return (
        <div className='navbar navbar-dark bg-dark mb-2 navbar-section'>
            <span className='navbar-brand'>
                Human
            </span>
            <button className='btn btn-outline-danger'>
                <i className='fas fa-sign-out-alt mr-1'></i>
                <span>Sign out</span>
            </button>
        </div>
    )
}
