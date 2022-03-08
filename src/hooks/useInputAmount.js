import { useEffect, useState } from 'react';
import { numberToText } from '../helpers/numberToText';
/*
    Notas: escoger el nombre
    Opciones:
        - EL IMPOSIBLE
        - El 4 dias de estres y contando...
        - El 4 DEC(dias de estres y contando)...
*/
// export const inputNumberText = (e, setamountToPay, setShowInput, amountToPay, totalPayMoney) => {
export const useInputAmount = (startQuantity) => {
    const [amountToPay, setAmountToPay] = useState(startQuantity)
    const [showInput, setShowInput] = useState('$0.00')

    useEffect(() => {
        changeShowInput(startQuantity, setShowInput)
    }, [startQuantity])
    const handleInputChange = (e) => {
        if (parseInt(e.key) >= 0) {
            let newNumber = String(amountToPay).concat(e.key);
            setAmountToPay(newNumber);
            setShowInput(`$${newNumber}.00 (${newNumber === '1' ? 'un peso' : `${numberToText(newNumber)} pesos`})`)
        } else if (e.key === "Backspace" && amountToPay !== '') {
            const deleteNumber = String(amountToPay).slice(0, -1)
            setAmountToPay(deleteNumber);
            setShowInput(deleteNumber.length > 0 ? `$${deleteNumber}.00 ${numberToText(deleteNumber)}` : "$")
        }
    }
    return [amountToPay, showInput, handleInputChange];
}

const changeShowInput = (amountToPay, setShowInput) => {
    if (amountToPay === '') return setShowInput(`$0.00 (cero pesos)`)
    setShowInput(`$${amountToPay}.00 (${amountToPay === '1' ? 'un peso' : `${numberToText(amountToPay)} pesos`})`)
}
// if (parseInt(e.key) >= 0) {
//     let newNumber = amountToPay.concat(e.key);
//     newNumber = (parseInt(newNumber) > totalPayMoney) ? totalPayMoney.toString() : newNumber;
//     setamountToPay(newNumber)
//     console.log(newNumber)
//     setShowInput(`$${newNumber}.00 (${newNumber === '1' ? 'un peso' : `${numberToText(newNumber)} pesos`})`)
// } else if (e.key === "Backspace") {
//     const deleteNumber = amountToPay.slice(0, -1)
//     setamountToPay(deleteNumber)
//     setShowInput(deleteNumber.length > 0 ? `$${deleteNumber}.00 ${numberToText(deleteNumber)}` : "$")
// }