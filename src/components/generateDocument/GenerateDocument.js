import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { documentStartGenerateDocument } from '../../actions/document'
import { activeDisabled } from '../../helpers/activeDisabled'
import { Matricula } from '../ui/Matricula'
import { RadioButtonListDocument } from '../ui/RadioButtonListDocument'
import { StudentInformation } from '../ui/StudentInformation'


export const GenerateDocument = () => {
    const dispatch = useDispatch()
    const { current, loading, loadingDocument } = useSelector(state => state.ui)
    const student = useSelector(state => state.student)
    const [studentInfo, setStudentInfo] = useState({ headers: [], data: [] })
    useEffect(() => {
        setStudentInfo({
            headers: ["Alumno", "Grupo", "Campus", "Carrera"],
            data: [student.student_name, student.name_group, student.campus_name, student.major_name]
        })
    }, [student])

    const handleSubmitGenerateDocument = () => {
        dispatch(documentStartGenerateDocument());
    }

    return (
        <>
            <div className="req__body ">
                <div className="req__body__student">
                    <div className='req__body__student__matricula'>
                        <Matricula
                            activeClassName={activeDisabled(0, current)}
                        />

                    </div>
                    <StudentInformation
                        activeClassName={activeDisabled(1, current)}
                        loading={loading}
                        studentInformation={studentInfo}
                    />

                </div>
                <RadioButtonListDocument
                    activeClassName={activeDisabled(2, current)}
                    text="Documento a solicitar"
                    currentNumber={3}
                />

            </div>
            <div className="req__footer gen__footer">
                <button className={"btn btn-primary ".concat(activeDisabled(3, current))} onClick={handleSubmitGenerateDocument}>Generar</button>
            </div>
        </>
    )
}
