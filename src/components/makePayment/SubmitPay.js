import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { payStartFertilizer, payStartMakePay } from '../../actions/pay'

export const SubmitPay = () => {

    const dispatch = useDispatch();
    const { amountToPay, idPayment, totalPayMoney } = useSelector(state => state.pay);
    const handleSubmitMakePay = () => {
        idPayment ? dispatch(payStartFertilizer()) : dispatch(payStartMakePay())
    }

    return (
        <div className={`make__submit `} >
            <button className={`make__submit-button btn-blue submitPay ${!totalPayMoney && 'ui__disabledEffect totalPay' }`} onClick={handleSubmitMakePay}>Pagar</button>
        </div>
    )
}
