import React from 'react'
import { useDispatch } from 'react-redux';
import { uiOpenModal } from '../../actions/ui';
import './EditEventFab.css';

export const EditEventFab = () => {

    const dispatch = useDispatch();
    const handleEdit = () => {
        dispatch(uiOpenModal());
    }

    return (
        <button
            className='fab-edit'
            onClick={handleEdit}
        >
            <i className='fas fa-edit fab-edit-icon'></i>
        </button>
    )
}
