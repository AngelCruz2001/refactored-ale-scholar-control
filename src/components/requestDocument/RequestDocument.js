import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { documentClearData, documentSetDocument, documentStartGetDocuments } from '../../actions/document'
import { requestStartRequestDocument } from '../../actions/requests'
import { uiSetCurrent } from '../../actions/ui'
import { activeDisabled } from '../../helpers/activeDisabled'
import { typesDocuments } from '../../types/types'
import { Date } from '../ui/Date'
import { Matricula } from '../ui/Matricula'
import { RadioButtonList } from '../ui/RadioButtonList'
import { RadioButtonListDocument } from '../ui/RadioButtonListDocument'
import { StudentInformation } from '../ui/StudentInformation'
import { HistoryReqDocument } from './HistoryReqDocument'

import { useFormik } from 'formik'
import * as Yup from 'yup';
import { RadioButtonListUniversal } from '../ui/RadioButtonListUniversal'

export const RequestDocument = () => { //reception
    const dispatch = useDispatch()
    const [studentInfo, setStudentInfo] = useState({ headers: [], data: [] })
    const { ui, student, document, requests } = useSelector(state => state)
    const { documentsAvailable } = document;

    useEffect(() => {
        setStudentInfo({
            headers: ["Alumno", "Grupo", "Campus", "Carrera"],
            data: student.matricula !== "" && [student.student_name, student.name_group, student.campus_name, student.major_name]
        })
    }, [student])

    useEffect(() => {
        
        documentStartGetDocuments(student.Date)
    }, [student])

    const { handleSubmit, errors, touched, getFieldProps, resetForm, handleChange } = useFormik({

        initialValues: {
            matricula: student.matricula ? student.matricula : '',
            document_type: null,
        },
        enableReinitialize: true,
        onSubmit: (values) => {
            dispatch(requestStartRequestDocument(values))
            console.log(values)
            // resetForm()
        },
        validationSchema: Yup.object({
            matricula: Yup.string('Introduzca los datos correspondientes.').required('Introduzca los datos correspondientes.'),
            document_type: Yup.number().typeError('Introduzca los datos correspondientes.').required('Introduzca los datos correspondientes.'),
        })
    });



    const [showHistory, setShowHistory] = useState(false)

    const { current, loading } = ui;
    return (
        <form className="req__container" onSubmit={handleSubmit}>

            {showHistory ?

                <HistoryReqDocument
                    setShowHistory={setShowHistory}
                    requests={requests}
                    loading={loading}
                />
                :
                <>

                    <div className="req__header">
                        <Date />
                    </div>

                    <div className="req__body">
                        <div className="req__body__student">
                            <div className='req__body__student__matricula'>
                                <Matricula
                                    activeClassName={activeDisabled(0, current)}
                                    matricula={student.matricula}
                                />
                            </div>
                            {touched.matricula && errors.matricula && <span className='errorMessage'>{errors.matricula}</span>}


                            <StudentInformation
                                loading={loading}
                                studentInformation={studentInfo}
                            />

                        </div>

                        <RadioButtonListUniversal
                            touched={touched}
                            errors={errors}
                            items={documentsAvailable}
                            text="Documentos"
                            getFieldProps={getFieldProps}
                            handleChange={handleChange}
                        />
                    </div>
                    <div className="req__footer">
                        <button className="btn req__footer__checkHistory" onClick={() => setShowHistory(true)}><i className="fas fa-history"></i><span>Ver Historial</span></button>
                        <button className={`btn-primary`} type='submit' >Solicitar</button>
                    </div>

                </>
            }


        </form >
    )
}
