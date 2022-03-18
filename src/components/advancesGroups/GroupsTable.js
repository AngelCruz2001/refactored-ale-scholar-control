import React, { useState } from 'react'
import { buildDataStudents } from '../../helpers/buildDataTables'
import { Table } from '../ui/Table'

export const GroupsTable = ({ handleBack, data3 }) => {
    const [dataShow, setDataShow] = useState([])

    const data = [
        {
            id_campus: 2,
            campus_name: "Alejandria oficial",
            major_name: "Licenciatura en Maestria en dormir 2",
            id_group: 6,
            id_major: 16,
            entry_year: "2022-03-17",
            end_year: "2022-03-16",
            group_chief_id_student: null,
            group_name: "dsdsffds",
            courses: [
                {
                    id_course: 3,
                    id_major: 16,
                    course_name: "ASDF",
                    clave: "ASDF",
                    credits: 11,
                    taken: true
                },
                {
                    id_course: 3,
                    id_major: 16,
                    course_name: "ASDF",
                    clave: "ASDF",
                    credits: 11,
                    taken: true
                },
                {
                    id_course: 3,
                    id_major: 16,
                    course_name: "ASDF",
                    clave: "ASDF",
                    credits: 11,
                    taken: true
                },
                {
                    id_course: 4,
                    id_major: 16,
                    course_name: "Johan pro",
                    clave: "1212",
                    credits: 20,
                    taken: false
                }
            ]
        },
        {
            id_campus: 2,
            campus_name: "Alejandria oficial",
            major_name: "Licenciatura en Maestria en dormir 2",
            id_group: 6,
            id_major: 16,
            entry_year: "2022-03-17",
            end_year: "2022-03-16",
            group_chief_id_student: null,
            group_name: "dsdsffds",
            courses: [
                {
                    id_course: 3,
                    id_major: 16,
                    course_name: "ASDF",
                    clave: "ASDF",
                    credits: 11,
                    taken: true
                },
                {
                    id_course: 3,
                    id_major: 16,
                    course_name: "ASDF",
                    clave: "ASDF",
                    credits: 11,
                    taken: true
                },
                {
                    id_course: 3,
                    id_major: 16,
                    course_name: "ASDF",
                    clave: "ASDF",
                    credits: 11,
                    taken: true
                },
                {
                    id_course: 4,
                    id_major: 16,
                    course_name: "Johan pro",
                    clave: "1212",
                    credits: 20,
                    taken: false
                }
            ]
        },

    ]



    return (
        <div className='groups-table__container'>
            <div className='groups-table__container__header'>
                <div className='groups-table__container__header__button'>

                    <button className="btn btn__back" onClick={handleBack}>
                        <i className="fas fa-arrow-left"></i>
                    </button>
                </div>
                <h2 className='groups-table__container__header__title'>Nombre de la carrera</h2>
            </div>
            <div className='groups-table__container__table'>
                <div className='groups-table__container__table__title'>
                    <h2>Licenciatura en comunidad Social</h2>
                </div>
                {
                    data.map(({ group_name, courses }, index) => (

                        <div key={index} className='groups-table__container__table__row scroll'>
                            <div className="groups-table__container__table__row__header">
                                <div className='groups-table__container__table__row__header__item'>{group_name}</div>
                            </div>
                            <div className="groups-table__container__table__row__body">

                                {courses.map(({ course_name }, i) => (
                                    <div key={i} className={`groups-table__container__table__row__body__item `}>{course_name}</div>
                                ))}
                            </div>
                        </div>
                    ))
                }


            </div>
        </div>

    )
}
