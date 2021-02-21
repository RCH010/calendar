import React from 'react'

export const CalendarEvent = ({event}) => {
    
    const {title, user} = event

    return (
        <div>
            <strong className='d-block' style={{fontSize:'.9em'}}>{title}</strong>
            <span style={{fontSize:'.7em'}}>- {user.name}</span>
        </div>
    )
}
