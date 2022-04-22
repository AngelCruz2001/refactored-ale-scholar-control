
import React, { useState, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { documentStartGetDocuments } from '../actions/document'
import { payStartGetCards } from '../actions/pay'

export const usePayments = () => {

    const { student, ui: { loading }, auth: { user }, pay: { cards, totalPayMoney } } = useSelector(state => state)
    const [studentInfo, setStudentInfo] = useState({ headers: [], data: [] })
    const dispatch = useDispatch()
    useEffect(() => {
        dispatch(payStartGetCards())
    }, [])
    useEffect(() => {
        setStudentInfo({
            headers: ["Alumno", "Grupo", "Campus", "Carrera"],
            data: [student.student_name, student.name_group, student.campus_name, student.major_name]
        })
        if (student.matricula) {
            dispatch(documentStartGetDocuments(student.matricula))
        }
    }, [student])


    return {
        matricula: student.matricula,
        studentInfo,
        loading,
        id_user: user.id_user,
        cards, 
        totalPayMoney
    }
}