import React, { useState } from 'react'
import { Calendar, momentLocalizer } from 'react-big-calendar'
import { useDispatch, useSelector } from 'react-redux'
// import withDragAndDrop from 'react-big-calendar/lib/addons/dragAndDrop'
import moment from 'moment'
import { Navbar } from '../ui/Navbar'
import 'react-big-calendar/lib/css/react-big-calendar.css'
import './CalendarScreen.css'
import { CalendarEvent } from './CalendarEvent'
import { CalendarModal } from './CalendarModal'
import { uiOpenModal } from '../../actions/ui'
import { eventClearActiveEvent, eventSetActive } from '../../actions/events'
import { AddNewFab } from '../ui/AddNewFab'
import { DeleteEventFab } from '../ui/DeleteEventFab'
import { EditEventFab } from '../ui/EditEventFab'

// TODO: implement drag and drop for this calendar
// const DragAndDropCalendar = withDragAndDrop(Calendar)

const localizer = momentLocalizer(moment)


export const CalendarScreen = () => {

    const dispatch = useDispatch();
    const { events, activeEvent } = useSelector(state => state.calendar)
    const [lastView, setLastView] = useState(localStorage.getItem('lastView')  || 'month');

    // Double click on event -> Open modal
    const onDoubleClick = (e) => {
        dispatch(uiOpenModal());
    }

    const onSelectEvent = (e) => {
        dispatch(eventSetActive(e));
    }

    const onViewChange = (e) => {
        console.log(e);
        setLastView(e)
        localStorage.setItem('lastView', e);
    }

    const eventStyleGetter = (event, start, end, isSelected) => {
        const style = {
            backgroundColor: event.bgcolor,
            borderRadius: '5px',
            opacity: 0.9,
            display: 'block',
        }
        return {
            style
        }
    }

    const onSelectSlot = (e) => {
        dispatch(eventClearActiveEvent());
    }

    return (
        <div className='calendar-screen'>
            <Navbar />
            <div className='mx-4 mb-4 calendar'>
                <Calendar
                    localizer={localizer}
                    events={events}
                    startAccessor="start"
                    endAccessor="end"
                    eventPropGetter={eventStyleGetter}
                    onDoubleClickEvent={onDoubleClick}
                    onSelectEvent={onSelectEvent}
                    onView={onViewChange}
                    onSelectSlot={onSelectSlot}
                    selectable={true}
                    view={lastView}
                    components={{
                        event:CalendarEvent
                    }}
                />
            </div>
            {
                (activeEvent && ( <>
                    <DeleteEventFab />
                    <EditEventFab />
                    </>
                )) 
            }
            <AddNewFab 
                disabled={activeEvent}
            />
            
            <CalendarModal />
        </div>
    )
}
