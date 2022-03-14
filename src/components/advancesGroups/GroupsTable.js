import React from 'react'
import { Table } from '../ui/Table'
const headers = [
    {

        title: "name group"
    },
    {

        title: "name group2"
    },
    {

        title: "name group3"
    },
    {

        title: "name group4"
    }
]
export const GroupsTable = ({handleBack}) => {
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
            <Table
                headers={headers}/>


            </div>
        </div>
    )
}
