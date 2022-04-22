import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { requestStartCompleteRequestDocument } from '../../actions/requests'
import { uiSetModalCloseExpenses } from '../../actions/ui'
import { InformationModal } from '../expenseRecord/InformationModal'
import { ButtonTable } from './table/ButtonTable'

export const ModalRequest = () => {
    const dispatch = useDispatch();
    const { student: {
        matricula,
        student_name,
        name_group,
        campus_name,
        major_name }, requests: { data, active} } = useSelector(state => state)
    

    const {document_name, status_request} = data.find(request => request.id_request === active)
    const handleCloseModal = () => {
        // dispatch(expensesClearActive())
        dispatch(uiSetModalCloseExpenses());
    }

    const handleClickSubmit = (id) => {
        dispatch(requestStartCompleteRequestDocument(id))
        handleCloseModal()
    }

    return (
        <div className="modalExpense">
            <div className="modalExpense__content">
                <div className="modalExpense__content__title">
                    <button className="btn btn__back" onClick={handleCloseModal}>
                        <i className="fas fa-arrow-left"></i>
                    </button>
                </div>
                <div className="modalExpense__content__body">
                    <InformationModal title="Nombre del alumno" text={student_name} />
                    <InformationModal title="Matricula" text={matricula} />
                    <InformationModal title="Grupo" text={name_group} />
                    <InformationModal title="Carrera" text={major_name} />
                    <InformationModal title="Campus" text={campus_name} />
                    <InformationModal title="Documento solicitado" text={document_name} />
                    <InformationModal title="Estado" text={status_request} />
                </div>
                
                <div className="modalExpense__content__footer">
                    <ButtonTable type={12}  onClick={() => handleClickSubmit(active)} />
                </div>


            </div>
        </div>
    )
}
