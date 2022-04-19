import React from 'react'
import { useSelector } from 'react-redux';

export const GroupsTable = ({ handleBack, majorName }) => {

    const { groupsData: data } = useSelector(state => state.majors)

    return (
        
        <div className='groups-table'>
            <div className='groups-table__header'>
                <div className='groups-table__header__button'>

                    <button className="btn btn__back" onClick={handleBack}>
                        <i className="fas fa-arrow-left"></i>
                    </button>
                </div>
                <h2 className='groups-table__header__title'>Avance de grupos</h2>
                <div className='groups-table__header__titleTable'>
                    <h2>{majorName}</h2>
                </div>
            </div>
            <div className='groups-table__table'>

                {
                    data.map(({ group_name, courses }, index) => (
                        <div key={index} className='groups-table__table__row'>
                            <div className="groups-table__table__row__header">
                                <div className='groups-table__table__row__header__item'>{group_name}</div>
                            </div>
                            <div className="groups-table__table__row__body scroll">
                                {courses.map(({ course_name, isTaken }, i) => (
                                    <div key={i} className={`groups-table__table__row__body__item ${isTaken ? 'active' : ''} `}>{course_name}</div>
                                ))}
                            </div>
                        </div>
                    ))
                }

            </div>
        </div>

    )
}
