import React, { useEffect, useState } from 'react'

const days = ['Domingo', 'Lunes', 'Martes', 'Miercoles', 'Jueves', 'Viernes', 'Sabado'];
const timesOriginal = ['09:00', '10:00', '11:00', '12:00', '13:00', '14:00', '15:00'
    , '16:00', '17:00', '18:00', '19:00', '20:00'];
const timeTable = Array(7).fill({}).map((_, i) => ({ day: i, selected: false, dayName: days[i] }));


export const Timetable = ({ field, form }) => {

    const [times, setTimes] = useState(timeTable);
    console.log(times)
    console.log(field)
    useEffect(() => {
        if (field.value) {
            const newTimes = [...times]
            field.value.forEach(time => {
                console.log(time.start_hour)
                newTimes[time.day].selected = true;
                newTimes[time.day].start_hour = time.start_hour;
                newTimes[time.day].finish_hour = time.finish_hour;
            })
            setTimes(newTimes)
        }
    }, []);

    const setDataToform = () => {
        form.setFieldValue(field.name, times.map(time => ({ day: time.day, start_hour: time.start_hour, finish_hour: time.finish_hour })).filter(time => time.selected === true))
    }
    const handleDayClicked = (index) => {
        setTimes(prev => {
            const newTimes = [...prev];
            newTimes[index].selected = !newTimes[index].selected;
            return newTimes;
        });
        setDataToform();
    }

    const handleChangeValue = (e, index) => {
        setTimes(prev => {
            const newTimes = [...prev];
            newTimes[index][e.target.name] = e.target.value;
            return newTimes;
        });
        setDataToform();
    }

    return (
        <div className="timetable">
            {
                days.map((day, index) => (
                    <div className="timetable__row" key={index}>
                        <div className="timetable__row__day">
                            <p
                                className={`${times[index].selected ? 'active' : ''}`}
                                onClick={() => handleDayClicked(index)}
                            >
                                {day}
                            </p>
                        </div>


                        < div className='timetable__row__selects' >
                            <div className="timetable__row__selects__select">
                                <p>De:</p>
                                <select
                                    disabled={!times[index].selected ? 'active' : ''}
                                    onChange={(e) => handleChangeValue(e, index)}
                                    name='start_hour'
                                    value={times[index].selected ? times[index].start_hour : ''}
                                >
                                    <option hidden defaultValue></option>
                                    {
                                        timesOriginal.map((time, index) => (
                                            <option key={index} value={time}>{time}</option>
                                        ))
                                    }
                                </select>
                            </div>
                            <div className="timetable__row__selects__select" >
                                <p>A:</p>
                                <select
                                    disabled={!times[index].selected ? 'active' : ''}
                                    onChange={(e) => handleChangeValue(e, index)}
                                    name='finish_hour'
                                    value={times[index].selected ? times[index].finish_hour : ''}

                                >
                                    <option hidden defaultValue></option>

                                    {
                                        timesOriginal.map((time, index) => (
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
