import React, { useState } from 'react'
import { Calendar, momentLocalizer } from 'react-big-calendar'
import withDragAndDrop from 'react-big-calendar/lib/addons/dragAndDrop'
import moment from 'moment'
import { Navbar } from '../ui/Navbar'
import 'react-big-calendar/lib/css/react-big-calendar.css'
import './CalendarScreen.css'
import { CalendarEvent } from './CalendarEvent'
import { CalendarModal } from './CalendarModal'


const localizer = momentLocalizer(moment)
const myEventsList = [
    {
        title: 'My birthday',
        start: moment().toDate(),
        end: moment().add(2,'hours').toDate(),
        bgcolor: '#fafa',
        notes: 'Comprar pastel',
        user: {
            _id: '123',
            name: 'Luis Ivan'
        },
    },
    {
        title: 'Uvas birthday',
        start: moment().add(1,'day').toDate(),
        end: moment().add(3,'hours').add(1,'day').toDate(),
        bgcolor: '#00AAAA',
        notes: 'Comprar pastel',
        user: {
            _id: '123',
            name: 'Luis Fernado'
        },
    }
]

const DragAndDropCalendar = withDragAndDrop(Calendar)

export const CalendarScreen = () => {

    const [lastView, setLastView] = useState(localStorage.getItem('lastView')  || 'month');
    console.log(lastView);
    const onDoubleClick = (e) =>{
        console.log('DOUBLE',e);
    }
    const onSelectEvent = (e) =>{
        console.log('SELECTED',e);
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

    return (
        <div className='calendar-screen'>
            <Navbar />
            <div className='mx-4 mb-4 calendar'>
                <DragAndDropCalendar
                    localizer={localizer}
                    events={myEventsList}
                    startAccessor="start"
                    endAccessor="end"
                    eventPropGetter={eventStyleGetter}
                    onDoubleClickEvent={onDoubleClick}
                    onSelectEvent={onSelectEvent}
                    onView={onViewChange}
                    view={lastView}
                    components={{
                        event:CalendarEvent
                    }}
                />
            </div>
            <CalendarModal />
        </div>
    )
}
