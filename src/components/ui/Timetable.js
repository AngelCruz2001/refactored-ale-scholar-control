import React, { useEffect, useState } from 'react'

export const Timetable = () => {

    const initialValues = [
        {
            day: 1,
            start_hour: '13:00',
            end_hour: '14:00'
        },
    ]

    const days = ['Domingo', 'Lunes', 'Martes', 'Miercoles', 'Jueves', 'Viernes', 'Sabado'];
    const timesOriginal = ['9:00', '10:00', '11:00', '12:00', '13:00', '14:00', '15:00', '16:00', '17:00', '18:00', '19:00', '20:00'];
    const [daysSchedule, setDaysSchedule] = useState(initialValues);
    const [times, setTimes] = useState(timesOriginal)

    useEffect(() => {
        console.log(daysSchedule)
    }, [daysSchedule])

    const handleDayClicked = (index) => {

        const temporalDays = daysSchedule.map((day, i) => {
            if (i === index) {
                return null;
            } else {
                return {
                    day: index,
                    start_hour: '',
                    end_hour: ''
                }
            }
        }).filter(day => day !== null)

        setDaysSchedule()
    }

    const handleChangeValue = (e, index) => {
    }




    return (
        <div className="timetable">
            {
                days.map((day, index) => (
                    <div className="timetable__row">
                        <div className="timetable__row__day">
                            <p
                                className={`${daysSchedule[index] && daysSchedule[index].day === index ? 'active' : ''}`}
                                onClick={() => handleDayClicked(index)}
                            >
                                {day}
                            </p>
                        </div>


                        < div className='timetable__row__selects' >
                            <div className="timetable__row__selects__select">
                                <p>De:</p>
                                <select
                                    disabled={!daysSchedule[index]}
                                    onChange={(e) => handleChangeValue(e, index)}
                                    name='start_hour'
                                    value={daysSchedule[index] && daysSchedule[index].day === index ? daysSchedule[index].start_hour : ''}
                                >
                                    <option hidden defaultValue></option>
                                    {
                                        times.map((time, index) => (
                                            <option key={index} value={time}>{time}</option>
                                        ))
                                    }
                                </select>
                            </div>
                            <div className="timetable__row__selects__select" >
                                <p>A:</p>
                                <select
                                    disabled={!daysSchedule[index]}
                                    onChange={(e) => handleChangeValue(e, index)}
                                    name='finish_hour'
                                    value={daysSchedule[index] && daysSchedule[index].day === index ? daysSchedule[index].end_hour : ''}
                                >
                                    <option hidden defaultValue></option>

                                    {
                                        times.map((time, index) => (
                                            <option key={index} value={time}>{time}</option>
                                        ))
                                    }
                                </select>
                            </div>
                        </div >
                    </div >
                ))
            }
        </div >
    )
}
