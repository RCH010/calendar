import React, { useState, useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import Modal from 'react-modal';
import moment from 'moment'
import DateTimePicker from 'react-datetime-picker';
import Swal from 'sweetalert2'
import './CalendarModal.css'
import { useForm } from '../../hooks/useForm';
import { uiCloseModal } from '../../actions/ui';
import { eventAddNew, eventClearActiveEvent, eventUpdate } from '../../actions/events';

Modal.setAppElement('#root')
const startDateDefault = moment().minutes(0).seconds(0).add(1,'hours');
const endDateDefault = startDateDefault.clone().add(1,'hours');

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

const initFormValues = {
    title: '',
    notes: '',
    start: startDateDefault.toDate(),
    end: endDateDefault.toDate(),
}


export const CalendarModal = () => {
    const { modalOpen } = useSelector(state => state.ui);
    const { activeEvent } = useSelector(state => state.calendar)

    const dispatch = useDispatch();
    const [titleValid, setTitleValid] = useState(true);
    const [startDate, setStartDate] = useState(startDateDefault.toDate());
    const [endDate, setEndDate] = useState(endDateDefault.toDate());

    // Event's start date changed
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
    // Event's end date changed
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

    useEffect(() => {
        if(activeEvent) {
            reset(activeEvent);
            setStartDate(activeEvent.start);
            setEndDate(activeEvent.end);
        }else{
            setStartDate(startDateDefault.toDate());
            setEndDate(endDateDefault.toDate());
        }
    }, [activeEvent])

    // useForm hook for formValues
    const [formValues, handleInputChange, reset] = useForm(initFormValues)
    const {notes, title, start, end} = formValues;
    
    const saveEvent = () => {
        // update or create new event
        if(activeEvent) {
            dispatch(eventUpdate(formValues))
        }else {
            // TODO: user should be from db
            dispatch(eventAddNew({
                ...formValues,
                id: new Date().getTime(),
                user: {
                    _id: '123',
                    name: 'to be done'
                }
            }));
        }
    }

    // when a submit of modal form is done
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
        saveEvent();
        closeModal();
    }
    
    // dispatch action to close modal
    const closeModal = () => {
        dispatch(uiCloseModal());
        dispatch(eventClearActiveEvent());
        reset();
    }

    return (
        <Modal
            isOpen={modalOpen}
            closeTimeoutMS={200}
            onRequestClose={closeModal}
            style={customStyles}
            className='modal'
            overlayClassName='modal-fondo'
        >
            <h1>{(activeEvent)? 'Edit event' : 'New Event'}</h1>
            <hr />
            <form 
                className="container"
                onSubmit={handleSubmitForm}
            >

                <div className="form-group">
                    <label>Start date</label>
                    <DateTimePicker
                        onChange={handleStartDateChanged}
                        name='start'
                        value={startDate}
                        className='form-control'
                        format={"MM.dd.yyyy HH:mm"}
                        disableClock={true}
                    />
                </div>

                <div className="form-group">
                    <label>End date</label>
                    <DateTimePicker
                        onChange={handleEndDateChanged}
                        name='end'
                        value={endDate}
                        className='form-control'
                        format={"MM.dd.yyyy HH:mm"}
                        disableClock={true}
                        minDate={start}
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
