
import React, { useState, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { documentStartGetDocuments } from '../actions/document'
import { payStartGetCards, payStartMakePay } from '../actions/pay'

export const usePayments = (id) => {

    const { student, ui: { loading }, auth: { user }, pay: { cards, totalPayMoney, fertilizers } } = useSelector(state => state)

    const [studentInfo, setStudentInfo] = useState({ headers: [], data: [] })

    const [activeFertilizer, setActiveFertilizer] = useState(null)
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

    useEffect(() => {
        console.log(fertilizers, id)
        id != null && setActiveFertilizer(fertilizers.find(fertilizer => fertilizer.id_payment == id))
    }, [id])

    return {
        matricula: student.matricula,
        studentInfo,
        loading,
        id_user: user.id_user,
        cards,
        totalPayMoney,
        activeFertilizer
    }
}