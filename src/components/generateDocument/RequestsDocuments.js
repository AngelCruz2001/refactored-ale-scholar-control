import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { useDispatch } from 'react-redux';
import { requestSetActiveId, requestSetRequests, requestStartGetRequests } from '../../actions/requests';
import { studentStartGetStudentByMatricula } from '../../actions/student';
import { uiSetModalOpen, uiSetModalOpenExpenses } from '../../actions/ui';
import { buildDataRequestsDocuments } from '../../helpers/buildDataTables';
import { ModalRequest } from '../ui/ModalRequest';
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

    const { requests: { data }, ui: { isModalOpenExpenses } } = useSelector(state => state)
    const [dataToShow, setdataToShow] = useState([])

    useEffect(() => {
        dispatch(requestStartGetRequests())
    }, [])

    useEffect(() => {
        buildData()
    }, [data])

    const handleClick = (id, id2) => {
        dispatch(requestSetActiveId(id))
        dispatch(studentStartGetStudentByMatricula(id2))
        dispatch(uiSetModalOpenExpenses())
    }

    const buildData = () => {
        console.log('data', data)
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
            {
                isModalOpenExpenses &&
                <ModalRequest />
            }
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
