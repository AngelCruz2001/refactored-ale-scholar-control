import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { payStartGetFertilizerPay } from '../../actions/pay.js'
import { DataStudentItem } from './DataStudentItem.js'

export const DataStudentTableFer = () => {
    const { loading } = useSelector(state => state.ui)
    const dispatch = useDispatch()
    const {  fertilizers } = useSelector(state => state.pay)
    const { student } = useSelector(state => state)
    useEffect(() => {
        if (student.matricula) {
            dispatch(payStartGetFertilizerPay(student.matricula));
        }
    }, [student])
    return (
        <div className="fer__table__data__container ">
            {
                student.matricula ?
                    loading ?
                        <p>Cargandoooooooooooooooooooooooo</p>
                        :
                        fertilizers.length  ?
                            <>
                                {fertilizers.map((fertilizer, i) =>
                                    fertilizer.status_payment === 0 &&
                                    <DataStudentItem key={i} {...fertilizer} />
                                )}
                            </>
                            :
                            <>
                                <center>
                                    <p>Ups, parece que no hay abonos</p>
                                </center>
                            </>
                    :
                    <></>
            }
        </div>

    )
}
