import React, { useState } from 'react'
import { buildDataStudents } from '../../helpers/buildDataTables'
import { Table } from '../ui/Table'

export const GroupsTable = ({ handleBack, data }) => {
    const [dataShow, setDataShow] = useState([])




    return (
        <div className='groupsTable__container'>
            <div className='groupsTable__container__header'>
                <div className='groupsTable__container__header__button'>

                    <button className="btn btn__back" onClick={handleBack}>
                        <i className="fas fa-arrow-left"></i>
                    </button>
                </div>
                <h2 className='groupsTable__container__header__title'>Nombre de la carrera</h2>
            </div>
            <div className='groupsTable__container__table'>
                <div className='groupsTable__container__table__title'>
                    <h2>Licenciatura en comunidad Social</h2>
                </div>

                <div className='groupsTable__container__table__container'>

                    {
                        data.map(({ group_name, coursesNotTaken }, index) => (

                            <>
                                <div key={index} className="groupsTable__container__table__container__headers">

                                    <div className="groupsTable__container__table__container__headers__cell">{group_name}</div>
                                </div><div className="groupsTable__container__table__container__body scroll">

                                    

                                        {coursesNotTaken.map(({ course_name }, index) => (
                                            <div key={index} className={`groupsTable__container__table__container__body__row__cell animation__fadeIn `}>{course_name}</div>
                                        ))}

                                   
                                </div>
                            </>




                        ))
                    }

                </div>
            </div>
        </div>

    )
}
