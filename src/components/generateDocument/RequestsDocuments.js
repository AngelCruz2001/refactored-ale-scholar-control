import React, { useEffect } from 'react'
import { useDispatch } from 'react-redux'
import { requestStartGetRequests } from '../../actions/requests'
import { Table } from '../ui/Table'
const headers = [
    { title: 'Nombre del alumno', textAlign: 'left' },
    { title: 'Matricula', textAlign: 'center' },
    { title: 'Fecha', textAlign: 'center' },
    { title: 'Documento solicitado', textAlign: 'left' },
    { title: 'Ver', textAlign: 'center' },
]


export const RequestsDocuments = () => {
    const dispatch = useDispatch()
    useEffect(() => {
        dispatch(requestStartGetRequests())
    }, [])
    // const generateData = (data) => {

    return (
        <>
            <div className="gen__body__request__title requests">
                <h4 className='general__title-h4'>Nuevas solicitudes</h4>
            </div>
            <div className="gen__body__request__content">
                <Table
                    headers={headers}
                    data={[]}
                    sizesColumns={[30, 15, 15, 30, 10]}
                />
            </div>
        </>
    )
}
