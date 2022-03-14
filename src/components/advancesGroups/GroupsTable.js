import React, { useState } from 'react'
import { buildDataStudents } from '../../helpers/buildDataTables'
import { Table } from '../ui/Table'

export const GroupsTable = ({ handleBack, data }) => {
    const [dataShow, setDataShow] = useState([])

    const headers = []
    const generateData = () => {
        const dataToShow = [];
      
        data.courses.forEach(({id_course,  course_name }) => {
            const dataBuilded = buildDataStudents(id_course, course_name)
            
                dataToShow.push(dataBuilded)
            
        });

        setDataShow(dataToShow)
    }

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
                    <div className="groupsTable__container__table__container__headers">
                        {
                            headers.map(({ title }, index) => (
                                <div key={index} className="groupsTable__container__table__container__headers__cell"  >{title}</div>
                            ))
                        }

                    </div>
                    <div className="groupsTable__container__table__container__body scroll">
                        {dataShow.map((item, index) => (
                            <div key={index}>
                                {item.length > 0 &&
                                    <div className="groupsTable__container__table__container__body__row" key={index}>
                                        {
                                            item.map((cell, andex) => (
                                                <div key={andex} className={`groupsTable__container__table__container__body__row__cell animation__fadeIn `}>
                                                    {cell.element}
                                                </div>
                                            ))
                                        }
                                    </div>}
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    )
}
