import React from 'react'
import { useDispatch } from 'react-redux'
import { uiOpenModal } from '../../actions/ui';
import './AddNewFab.css'
export const AddNewFab = ({disabled}) => {
    const dispatch = useDispatch();
    const handleNewEvent = () => {
        dispatch(uiOpenModal());
    }

    return (
        <button
            disabled={!!disabled}
            className="plus-button"
            onClick={handleNewEvent}
        ></button>
    )
}
