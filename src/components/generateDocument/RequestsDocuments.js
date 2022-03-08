import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { useDispatch } from 'react-redux';
import { requestStartGetRequests } from '../../actions/requests';
import { buildDataRequestsDocuments } from '../../helpers/buildDataTables';
import { Table } from '../ui/Table';

const headers = [
    { title: 'Nombre del alumno', textAlign: 'left' },
    { title: 'Matricula', textAlign: 'center' },
    { title: 'Fecha', textAlign: 'center' },
    { title: 'Documento solicitado', textAlign: 'left' },
    { title: 'Ver', textAlign: 'center' },
]



export const RequestsDocuments = () => {
    const dispatch = useDispatch()

    const { data } = useSelector(state => state.requests)
    const [dataToShow, setdataToShow] = useState([])
    useEffect(() => {
        dispatch(requestStartGetRequests())
    }, [])
    // const generateData = (data) => {
    useEffect(() => {
        if (data) {
            buildData(data)
        }
    }, [data])

    const handleClick = (id) => {
        console.log(id)
    }

    const buildData = () => {
        const dataToShowBefore = data.map(request => buildDataRequestsDocuments(
            request.id_request,
            request.student_name,
            request.matricula,
            request.creation_date,
            request.document_name,
            handleClick
        ))

        setdataToShow(dataToShowBefore);
    }

    return (
        <>
            <div className="gen__body__request__title requests">
                <h4 className='general__title-h4'>Nuevas solicitudes</h4>
            </div>
            <div className="gen__body__request__content">
                <Table
                    headers={headers}
                    data={dataToShow}
                    sizesColumns={[30, 15, 15, 30, 10]}
                />
            </div>
        </>
    )
}
