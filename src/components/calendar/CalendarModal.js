import React, { useState } from 'react'
import Modal from 'react-modal';
import moment from 'moment'
import DateTimePicker from 'react-datetime-picker';
import Swal from 'sweetalert2'
import './CalendarModal.css'
import { useForm } from '../../hooks/useForm';

const customStyles = {
    content : {
        top: '50%',
        left: '50%',
        right: 'auto',
        bottom: 'auto',
        marginRight: '-50%',
        transform: 'translate(-50%, -50%)'
    }
};
Modal.setAppElement('#root')
const startDateDefault = moment().minutes(0).seconds(0).add(1,'hours');
const endDateDefault = startDateDefault.clone().add(1,'hours');

export const CalendarModal = () => {
    const [titleValid, setTitleValid] = useState(true);
    const [isOpen, setIsOpen] = useState(true)
    const [startDate, setStartDate] = useState(startDateDefault.toDate());
    const [endDate, setEndDate] = useState(endDateDefault.toDate());

    const handleStartDateChanged = (e) => {
        setStartDate(e);
        handleInputChange({
            ...formValues,
            target: {
                name:'start',
                value:e
            }
        })
    }
    const handleEndDateChanged = (e) => {
        setEndDate(e);
        handleInputChange({
            ...formValues,
            target: {
                name:'end',
                value:e
            }
        })
    }
    const [formValues, handleInputChange] = useForm({
        title: '',
        notes: '',
        start: startDateDefault.toDate(),
        end: endDateDefault.toDate(),
    })
    const {notes, title, start, end} = formValues;

    const handleSubmitForm = (e) => {
        e.preventDefault();
        
        const momentStart = moment(start);
        const momentEnd = moment(end);
        if(momentStart.isSameOrAfter(momentEnd)){
            return Swal.fire('Something seems wrong','End date must be greater than start date.','error');
        }
        if(title.trim().length < 1) {
            return setTitleValid(false);
        }else { setTitleValid(true); }

        // TODO: add in db
        closeModal();
    }
    
    const closeModal = () => {
        setIsOpen(false);
    }



    return (
        <Modal
            isOpen={isOpen}
            closeTimeoutMS={200}
            onRequestClose={closeModal}
            style={customStyles}
            className='modal'
            overlayClassName='modal-fondo'
        >
            <h1> New event </h1>
            <hr />
            <form 
                className="container"
                onSubmit={handleSubmitForm}
            >

                <div className="form-group">
                    <label>Start date</label>
                    <DateTimePicker
                        onChange={handleStartDateChanged}
                        aria-label='amPmAriaLabel'
                        value={startDate}
                        className='form-control'
                        format={"dd.MM.yyyy hh:mm a"}
                        disableClock={true}
                    />
                </div>

                <div className="form-group">
                    <label>End date</label>
                    <DateTimePicker
                        onChange={handleEndDateChanged}
                        value={endDate}
                        className='form-control'
                        format={"dd.MM.yyyy hh:mm a"}
                        disableClock={true}
                        minDate={startDate}
                    />
                </div>

                <div className="form-group">
                    <label>Title</label>
                    <input 
                        type="text" 
                        className={`form-control ${!titleValid && 'is-invalid'}`}
                        placeholder="Add event's title"
                        name="title"
                        autoComplete="off"
                        value={title}
                        onChange={handleInputChange}
                    />
                </div>

                <div className="form-group mb-4">
                    <textarea 
                        type="text" 
                        className="form-control"
                        placeholder="Details"
                        rows="5"
                        name="notes"
                        value={notes}
                        onChange={handleInputChange}
                    ></textarea>
                </div>

                <button
                    type="submit"
                    className="btn btn-outline-primary btn-block"
                >
                    <i className="far fa-save"></i>
                    <span className='ml-1'>Save</span>
                </button>

            </form>
        </Modal>
    )
}
