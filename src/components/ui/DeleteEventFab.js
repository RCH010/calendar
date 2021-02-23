import React from 'react'
import { useDispatch } from 'react-redux'
import { eventDelete } from '../../actions/events';
import './DeleteEventFab.css';

export const DeleteEventFab = () => {
    const dispatch = useDispatch();
    const handleDeleteEvent = () => {
        dispatch(eventDelete());
    }

    return (
        <button 
            className='fab-danger'
            onClick={handleDeleteEvent}
        >
            <i className='fas fa-trash fab-delete-icon'></i>
        </button>
    )
}
