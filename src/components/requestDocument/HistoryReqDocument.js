import React, { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { requestStartDeleteRequests, requestStartGetRequests } from '../../actions/requests';
import { useBuildDataWithFiltersRequest } from '../../hooks/useBuildDataWithFilters';
import { Filters } from '../ui/Filters';
import { Searchbar } from '../ui/Searchbar';
import { Table } from '../ui/Table';

const documentsName = [
    "Constancia de estudios",
    "Constancia de estudios con calificaciones",
    "Carta maestrante",
    "Credencial",
    "Certificado de maestría",
    "Certificado de licenciatura",
    "Titulo de maestri",
    "Titulo de licenciatura",
    "Acta de examen",
    "Constancia de titulo en progreso",
];

const headers = [{
    title: "Nombre del alumno",
    textAlign: 'left'
},
{
    title: "Matricula",
    textAlign: 'center'
},
{
    title: "Fecha de solicitud",
    textAlign: 'center'
},
{
    title: "Documento solicitado",
    textAlign: 'center'
},
{
    title: "",
    textAlign: 'center'
}];
export const HistoryReqDocument = ({
    setShowHistory,
    requests,
    loading,
}) => {
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(requestStartGetRequests());
    }, [])


    const handleCancelClick = (id) => {
        dispatch(requestStartDeleteRequests(id));
    }

    const [valueSearchFilter, setValueSearchFilter] = useState({ searchWord: '', dateSearch: {} });
    const [dataToShow, generateDataToShow] = useBuildDataWithFiltersRequest(requests, handleCancelClick, valueSearchFilter);
    useEffect(() => {
        generateDataToShow();
    }, [loading, valueSearchFilter, requests])

    return (
        <>
            <div className="req__container__header">
                <button className="btn btn__back" onClick={() => setShowHistory(false)}>
                    <i className="fas fa-arrow-left"></i>
                </button>
                <Searchbar setValueSearchFilter={setValueSearchFilter} valueSearchFilter={valueSearchFilter.searchWord} />
                <Filters setValueSearchFilter={setValueSearchFilter} />
            </div>
            <h4>Historial de solicitud de documentos</h4>

            <Table
                headers={headers}
                data={dataToShow}
                sizesColumns={[30, 15, 15, 30, 10]}
                loading={true}

            />
        </>
    )
}
