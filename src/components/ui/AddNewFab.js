import React from 'react'
import { useDispatch } from 'react-redux'
import { uiOpenModal } from '../../actions/ui';
import './AddNewFab.css'
export const AddNewFab = () => {

    const dispatch = useDispatch();
    const handleNewEvent = () => {
        dispatch(uiOpenModal());
    }

    return (
        <button 
            className="plus-button"
            onClick={handleNewEvent}
        ></button>
    )
}
