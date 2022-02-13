import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { paySetAmountToPay } from '../../actions/pay';
import { numberToText } from '../../helpers/numberToText';
import { useInputAmount } from '../../hooks/useInputAmount';

const pesosOrPeso = (quantity) => {
    if (quantity === '1') {
        return "(un peso)";
    }
    return `(${numberToText(quantity)} pesos)`;
}

export const ReceiveMoney = () => {
    const dispatch = useDispatch()
    const { totalPayMoney, amountToPay } = useSelector(state => state.pay)
    // console.log(totalPayMoney)
    const [showInput, setShowInput] = useState(`$${amountToPay} ${pesosOrPeso(amountToPay)}`);
    const [handleInputChange] = useInputAmount(setShowInput);
    // const [showInput, setShowInput] = useState(`$`);
    // const [inputNumbers, setInputNumbers] = useState(totalPayMoney);
    // useEffect(() => {
    //     dispatch(paySetAmountToPay(inputNumbers))
    // }, [inputNumbers])


    return (
        <form className={`make__formMoney ${!totalPayMoney && 'ui__disabledEffect inputsPay'}`}>
            <div className="make__containerInput ">
                <label className="make__titleSection" htmlFor="">CANTIDAD</label>
                <input className="make__money" type="text" value={showInput} onKeyDown={handleInputChange} onChange={() => { }} />
            </div>
            <div className="make__containerInput">
                <label className="make__titleSection" htmlFor="">RESTANTE A PAGAR</label>
                <input className="make__money" type="text" onChange={() => { }} value={totalPayMoney === 0 ? "" : `$${totalPayMoney - amountToPay} (${(totalPayMoney - amountToPay) === 1 ? "un peso" : `${numberToText(totalPayMoney - amountToPay)} pesos`})`} />
            </div>
        </form>
    )
}

//  value={totalPayMoney === 0 ? "" : `$${totalPayMoney - inputNumbers} (${(totalPayMoney - inputNumbers) === 1 ? "un peso" : `${numberToText(totalPayMoney - inputNumbers)} pesos`})`